<template lang="html">
    <main class="view--lobby">
        <!-- Spectator Part -->
        <template v-if="clientType == 'spectator'">
            <room-details :roomCode="roomCode"></room-details>
            <player-roster></player-roster>
        </template>

        <!-- Player Part -->
        <template v-else>
        </template>
    </main>
</template>

<script>
// Imports
import { Component, Vue } from 'vue-property-decorator';
import request from 'superagent/superagent';
import config from 'config/config.js';
import PlayerRoster from 'vue/components/PlayerRoster.vue';
import RoomDetails from 'vue/components/RoomDetails.vue';

/**
 * @name LobbyView
 * @desc This class manages the lobby view where players can join the room
 * @since Jul 17 2017
 */
@Component({
    components: {
        PlayerRoster,
        RoomDetails
    }
})
export default class LobbyView extends Vue {
    // Class data
    roomCode = '';
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
}
</script>

<style lang="scss">
@import '~scss/util/util';
@import '~scss/partial/components/view';

// view--lobby
.view--lobby {
    @extend .view;
    display: flex;
    flex-direction: row;
}
</style>
