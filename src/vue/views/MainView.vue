<template lang="html">
    <main class="view--main">
        <game-title></game-title>
        <player-form></player-form>
        <host-form></host-form>
        <credits></credits>
    </main>
</template>

<script>
// Imports
import { Component, Vue } from 'vue-property-decorator';
import PlayerForm from 'vue/components/PlayerForm.vue';
import HostForm from 'vue/components/HostForm.vue';
import Credits from 'vue/components/Credits.vue';
import GameTitle from 'vue/components/GameTitle.vue';

/**
 * @name MainView
 * @desc This class is the main view players see when they open the game
 * @since Jul 15 2017
 */
@Component({
    components: {
        PlayerForm,
        HostForm,
        Credits,
        GameTitle
    }
})
export default class MainView extends Vue {
    // Class data
}
</script>

<style lang="scss">
@import '~scss/util/util';
@import '~scss/partial/components/view';

// view--main
.view--main {
    @extend .view;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
}
</style>
