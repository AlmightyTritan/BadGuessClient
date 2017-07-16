<template lang="html">
    <form @submit.prevent="sendDrawing">
        <canvas
            @mousedown.prevent="penStart"
            @touchstart.prevent="penStart"
            @mousemove.prevent="penMove"
            @touchmove.prevent="penMove"
            @mouseup.prevent="penStop"
            @mouseleave.prevent="penStop"
            ref="drawingCanvas"
            width="300"
            height="300"></canvas>
        <input type="submit" />
    </form>
</template>

<script>
// Imports
import { Component, Vue } from 'vue-property-decorator';

/**
 * @name DrawingCanvas
 * @desc This class handles the submission and drawing of images for the round
 * @since Jul 16 2017
 */
@Component
export default class DrawingCanvas extends Vue {
    // Class data
    canvas = null;
    canvasContext = null;
    penSize = 4;
    fillColor = '#000000';
    penDown = false;
    penPosition = { x: 0, y: 0 };
    penLastPosition = { x: 0, y: 0 };

    // Mounted
    mounted() {
        // Get the canvas context
        this.canvas = this.$refs.drawingCanvas;
        this.canvasContext = this.canvas.getContext('2d');

        // Set canvas style
        this.canvasContext.fillStyle = this.fillColor;
        this.canvasContext.lineWidth = (this.penSize * 2);
        this.canvasContext.lineCap = 'round';
    }

    /**
     * @desc This method will capture the current drawing of the canvas
     *      and will submit it to the server as a hint
     * @since Jul 16 2017
     */
    sendDrawing() {
        // Capture the drawing
        let encodedDrawing = this.canvas.toDataURL();
    }

    /**
     * @desc This method will render a line on the canvas at the provided coords
     * @since Jul 16 2017
     * @param {int} x
     * @param {int} y
     */
    renderLine(x, y) {
        // Render the line on the canvas
        this.canvasContext.beginPath();
        this.canvasContext.moveTo(this.penLastPosition.x, this.penLastPosition.y);
        this.canvasContext.lineTo(x, y);
        this.canvasContext.closePath();
        this.canvasContext.stroke();
    }

    /**
     * @desc This method will render a dot on the canvas at the provided coords
     * @since Jul 16 2017
     * @param {int} x
     * @param {int} y
     */
    renderDot(x, y) {
        // Render the dot on the canvas
        this.canvasContext.beginPath();
        this.canvasContext.arc(x, y, this.penSize, 0, Math.PI * 2, true);
        this.canvasContext.closePath();
        this.canvasContext.fill();
    }

    /**
     * @desc This method will get the target x and y values for the mouse
     * @since Jul 16 2017
     * @param {event} e
     * @returns {object}
     */
    mousePosition(e) {
        // Get canvas bounding rect
        let canvasRect = this.canvas.getBoundingClientRect();

        // Return the x and y position
        return {
            x: e.clientX - canvasRect.left,
            y: e.clientY - canvasRect.top,
        };
    }

    /**
     * @desc This method will get the target x and y values for the touch
     * @since Jul 16 2017
     * @param {event} e
     * @returns {object}
     */
    touchPosition(e) {
        // If there are touches made
        if (e.touches && e.touches.length > 1) {
            // return the x and the y position for the touch
            return {
                x: e.touches[0].pageX - e.touches[0].target.offsetLeft,
                y: e.touches[0].pageY - e.touches[0].target.offsetTop,
            }
        }

        // default to the mouse values
        return this.mousePosition(e);
    }

    /**
     * @desc This method will start the pen down action
     * @since Jul 16 2017
     * @param {event} e
     */
    penStart(e) {
        // Set pen down state
        this.penDown = true;

        // If the target is mouse position
        if (e.type == 'mousedown') {
            this.penLastPosition = this.mousePosition(e);
        }

        // Else get the touch position
        else {
            this.penLastPosition = this.touchPosition(e);
        }

        // Render the dot of the initial pen press
        this.renderDot(this.penLastPosition.x, this.penLastPosition.y);
    }

    /**
     * @desc This method will put the pen up on mouse up event
     * @since Jul 16 2017
     */
    penStop() {
        this.penDown = false;
    }

    /**
     * @desc This method will render dots while the mouse move event it firing
     * @since Jul 16 2017
     * @param {event} e
     */
    penMove(e) {
        // If the target is mouse position
        if (e.type == 'mousedown') {
            this.penPosition = this.mousePosition(e);
        }

        // Else get the touch position
        else {
            this.penPosition = this.touchPosition(e);
        }

        // If the pen is down render dots
        if (this.penDown) {
            this.renderLine(this.penPosition.x, this.penPosition.y);
            this.penLastPosition = this.penPosition;
        }
    }
}
</script>

<style lang="scss">
</style>
