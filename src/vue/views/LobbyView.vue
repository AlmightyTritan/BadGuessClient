<template lang="html">
    <main class="view--lobby">
        <player-roster></player-roster>
    </main>
</template>

<script>
// Imports
import { Component, Vue } from 'vue-property-decorator';
import PlayerRoster from 'vue/components/PlayerRoster.vue';

/**
 * @name LobbyView
 * @desc This class manages the lobby view where players can join the room
 * @since Jul 17 2017
 */
@Component({
    components: {
        PlayerRoster
    }
})
export default class LobbyView extends Vue {

}
</script>

<style lang="scss">
@import '~scss/util/util';
@import '~scss/partial/components/view';

// view--lobby
.view--lobby {
    @extend .view;
    display: flex;
    flex-direction: row-reverse;
}
</style>
