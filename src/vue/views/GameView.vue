<template lang="html">
    <main class="view">
        <drawing-canvas></drawing-canvas>
    </main>
</template>

<script>
// Imports
import { Component, Vue } from 'vue-property-decorator';
import DrawingCanvas from 'vue/components/DrawingCanvas.vue';

/**
 * @name GameView
 * @desc This class handles the view that all game inputs and details will
 *      appear on
 * @since Jul 16 2016
 */
@Component({
    components: {
        DrawingCanvas
    }
})
export default class GameView extends Vue {

}
</script>

<style lang="css">
</style>
