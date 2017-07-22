<template lang="html">
    <ul class="player-roster">
        <player-avatar v-for="(player, index) in players" :username="player.username" :index="index"></player-avatar>
    </ul>
</template>

<script>
// Imports
import { Component, Vue } from 'vue-property-decorator';
import PlayerAvatar from 'vue/components/PlayerAvatar.vue';

/**
 * @name PlayerRoster
 * @desc this component will show a list of each player's avatar and their name
 * @since Jul 17 2017
 */
@Component({
    components: {
        PlayerAvatar,
    }
})
export default class PlayerRoster extends Vue {
    // Class data
    players = [];

    // Created
    created() {
        // Add event listeners
        this.$root.$on('playersChanged', this.setPlayers);
    }

    /**
     * @desc This method will update the local copy of the players
     * @since Jul 20 2017
     * @param {array} players
     */
    setPlayers(players) {
        this.players = players;
    }

}
</script>

<style lang="scss">
@import '~scss/util/util';

// player-roster
.player-roster {
    position: relative;
    flex: 0 0 50%;
    margin: 0;
    padding: 64px;
    list-style: none;
    box-sizing: border-box;
}
</style>
