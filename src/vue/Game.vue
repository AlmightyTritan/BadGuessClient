<template lang="html">
    <div class="game">
        <loader></loader>
        <router-view></router-view>
    </div>
</template>

<script>
// Imports
import { Component, Vue, Watch } from 'vue-property-decorator';
import request from 'superagent/superagent';
import Throttle from 'superagent-throttle';
import config from 'config/config.js';
import Loader from 'vue/components/Loader.vue';

/**
 * @name Game
 * @desc This class manages the game loop
 * @since Jul 15 2017
 */
@Component({
    components: {
        Loader,
    }
})
export default class Game extends Vue {
    // Class data
    lastRender = 0;
    room = null;
    roomStarted = 0;
    concurrentThrottle = null;
    playersCSV = null;
    players = [];

    // Created
    created() {
        // Init the throttle
        this.concurrentThrottle = new Throttle({
            rate: 1,
            ratePer: 500,
            concurrent: 1
        });

        // Prime loop
        window.requestAnimationFrame(this.gameLoop);

        // Add event listeners
        this.$root.$on('initialRoomFound', this.setInitialRoom);
    }

    // GameUpdated
    gameUpdated(deltaTime) {
        // Fetch updated room data
        this.updateRoom(deltaTime);
    }

    // GameLoop
    gameLoop(timestamp) {
        // Get the delta time
        let deltaTime = timestamp;

        // Update
        this.gameUpdated(deltaTime);

        // Change the last render and restart loop
        this.lastRender = timestamp;
        window.requestAnimationFrame(this.gameLoop);
    }

    /**
     * @desc This method will set the room to the initial data found
     * @since Jul 20 2017
     * @param {object} room
     */
    setInitialRoom(room) {
        this.room = room;
    }

    /**
     * @desc This method will contact the server and get the current state
     *      of the room at the current time.
     * @since Jul 20 2017
     * @param {number} deltaTime
     */
    updateRoom(deltaTime) {
        // If the initial room was not set return
        if (this.room == null || !deltaTime) {
            return;
        }

        // Poll the server within margin of error
        if (deltaTime % config.roomPollRate <= 10) {
            // Make a room check request
            let roomReq = request('POST', config.serverURL + 'Room/CheckRoom.php')
                .set({
                    'Accept': 'application/json',
                })
                .withCredentials()
                //.use(this.concurrentThrottle.plugin())
                .type('form')
                .send({ Id: this.room.Id });

            // On room checked
            roomReq.then((res) => {
                // If there was an issue fetching the room
                if (res.body.Status == 400) {
                    throw res.body.Message;
                }

                // Update the room and player csv
                this.room = res.body.Room;
                this.roomStarted = !!parseInt(this.room.Started);
                this.playersCSV = this.room.Players;
            })

            // On exception caught
            .catch((ex) => {
                // Stop the room updates
                this.room == null;

                // Print the error to the console, it's a game jam game anyway
                console.error(ex);
            });
        }
    }

    /**
     * @desc This method will fetch the users full data from the server
     * @since Jul 20 2017
     */
    @Watch('playersCSV')
    onPlayersCSVChange() {
        // Split to an array
        let playerIds = this.playersCSV.split(',');

        // Loop through the players ids
        for (let playerId of playerIds) {
            // If the players id is the host's then skip
            if (playerId == this.room.Host) {
                continue;
            }

            // Make a request to fetch the players details
            let playerReq = request('POST', config.serverURL + 'Utils/GetUser.php')
                .set({
                    'Accept': 'application/json',
                })
                .withCredentials()
                .type('form')
                .send({ Id: playerId });

            // On request complete
            playerReq.then((res) => {
                // If there was an issue fetching the room
                if (res.body.Status == 400) {
                    throw res.body.Message;
                }

                // Create a new player entry
                this.players.push({
                    username: res.body.User.Name,
                    id: res.body.User.Id,
                    score: 0,
                })
            })

            // On exception caught
            .catch((ex) => {
                // Print the error to the console, it's a game jam game anyway
                console.error(ex);
            });
        }
    }

    /**
     * @desc This message will emit an event for when the players are updated
     * @since Jul 20 2017
     */
    @Watch('players', { immediate: true, deep: true })
    onPlayersChange() {
        // Loop through players to get sessioned player's number
        for (var i = 0; i < this.players.length; i++) {
            if (this.$cookie.get('sessionId') == this.players[i].id) {
                this.$cookie.set('sessionPlayerIndex', i, config.cookieDuration);
            }
        }

        // Emit the players changed event
        this.$root.$emit('playersChanged', this.players);
    }

    /**
     * @desc This method will move players to the game view once the game has
     *      been set to the started state
     * @since Jul 24 2017
     */
    @Watch('roomStarted')
    onRoomStarted() {
        // If the room is started
        if (this.roomStarted) {
            // Push players to the game view
            this.$router.push({ path: '/game/' + this.room.Id });
        }
    }
}
</script>

<style lang="scss">
@import '~scss/main';
</style>
