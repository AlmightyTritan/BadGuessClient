<template lang="html">
    <main :class="getLobbyType">
        <!-- Spectator Part -->
        <template v-if="clientType == 'spectator'">
            <room-details :roomCode="roomCode"></room-details>
            <player-roster></player-roster>
        </template>

        <!-- Player Part -->
        <template v-else>
            <player-details></player-details>
            <tutorial></tutorial>
            <a v-if="!roomStarted" @click="startGame" class="button" title="Start the game">Start Game</a>
        </template>
    </main>
</template>

<script>
// Imports
import { Component, Vue } from 'vue-property-decorator';
import request from 'superagent/superagent';
import config from 'config/config.js';
import PlayerRoster from 'vue/components/PlayerRoster.vue';
import PlayerDetails from 'vue/components/PlayerDetails.vue';
import RoomDetails from 'vue/components/RoomDetails.vue';
import Tutorial from 'vue/components/Tutorial.vue';

/**
 * @name LobbyView
 * @desc This class manages the lobby view where players can join the room
 * @since Jul 17 2017
 */
@Component({
    components: {
        PlayerRoster,
        PlayerDetails,
        RoomDetails,
        Tutorial,
    }
})
export default class LobbyView extends Vue {
    // Class data
    roomCode = '';
    roomStarted = false;
    clientType = 'spectator';

    // Mounted
    mounted() {
        // Set the room code
        this.roomCode = this.$route.params.roomCode

        // Get the current client type
        this.clientType = this.$cookie.get('sessionRole');

        // Check if the game has the initial room
        if (this.$root.$data.room == null) {
            // Make a room check request
            let roomReq = request('POST', config.serverURL + 'Room/CheckRoom.php')
                .set({
                    'Accept': 'application/json',
                })
                .withCredentials()
                .type('form')
                .send({ Id: this.roomCode });

            // On room checked
            roomReq.then((res) => {
                // If there was an issue creating the room
                if (res.body.Status == 400) {
                    throw res.body.Message;
                }

                // Set the room
                this.$root.$emit('initialRoomFound', res.body.Room);
            })

            // On exception caught
            .catch((ex) => {
                // Redirect to the main page
                this.$router.push({ path: '/' });

                // Print the error to the console, it's a game jam game anyway
                console.error(ex);
            });
        }
    }

    /**
     * @desc This method will tell the server to start the game
     * @since Jul 24 2017
     */
    startGame() {
        // Make a request to start the room
        let startReq = request('POST', config.serverURL + 'Room/StartRoom.php')
            .set({ 'Accept': 'application/json' })
            .withCredentials()
            .type('form')
            .send({ Id: this.roomCode.toLowerCase() });


        // On room started
        startReq.then((res) => {
            // If there was an issue starting the room
            if (res.body.Status == 400) {
                throw res.body.Message;
            }

            // Hide the start room button
            this.roomStarted == false;
        })

        // On exception caught
        .catch((ex) => {
            // Print the error to the console, it's a game jam game anyway
            console.error(ex);
        });
    }

    /**
     * @desc This method will return if the current player is player one
     * @since Jul 24 2017
     * @returns {bool}
     */
    get getIsPlayerOne() {
        // If the room is already started
        if (this.roomStarted) {
            return false;
        }

        // If player one
        let playerIndex = this.$cookie.get('sessionPlayerIndex');
        if (playerIndex == 0) {
            return true;
        }

        // The player is not player one so return false
        return false;
    }

    /**
     * @desc This method will return the proper class for the lobby view based
     *      on the client type
     * @since Jul 24 2017
     */
    get getLobbyType() {
        return this.clientType == 'spectator' ? 'view--spectator-lobby' : 'view--player-lobby';
    }
}
</script>

<style lang="scss">
@import '~scss/util/util';
@import '~scss/partial/components/view';

// view--spectator-lobby
.view--spectator-lobby {
    @extend .view;
    display: flex;
    flex-direction: row;
    align-items: baseline;
    justify-content: center;
}

// view--player-lobby
.view--player-lobby {
    @extend .view;
    display: flex;
    padding-top: 64px;
    flex-direction: column;
    align-items: center;
}
</style>
