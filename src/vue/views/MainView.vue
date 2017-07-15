<template lang="html">
    <main class="view">
        <player-form></player-form>
    </main>
</template>

<script>
// Imports
import { Component, Vue } from 'vue-property-decorator';
import PlayerForm from 'vue/components/PlayerForm.vue';

/**
 * @name MainView
 * @desc This class is the main view players see when they open the game
 * @since Jul 15 2017
 */
@Component({
    components: {
        PlayerForm
    }
})
export default class MainView extends Vue {
    // Class data
}
</script>

<style lang="css">
</style>
