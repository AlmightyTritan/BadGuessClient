<template lang="html">
    <form @submit.prevent="sendDrawing" class="drawing-canvas" :style="'width:' + (canvasSize + 32) + 'px'">
        <canvas
            v-if="!encodedDrawing"
            @mousedown.prevent="penStart"
            @touchstart.prevent="penStart"
            @mousemove.prevent="penMove"
            @touchmove.prevent="penMove"
            @mouseup.prevent="penStop"
            @mouseleave.prevent="penStop"
            class="drawing-canvas__canvas"
            ref="drawingCanvas"
            :width="canvasSize"
            :height="canvasSize"></canvas>
        <div class="drawing-canvas__submitted-canvas-container">
            <div v-if="encodedDrawing" class="drawing-canvas__submitted-canvas" :style="{ height: canvasSize + 'px', width: canvasSize + 'px' }">
                <img class="drawing-canvas__submission" :src="encodedDrawing">
                <div v-if="harmfulSubmission" class="drawing-canvas__submission--back drawing-canvas__submission--harm">Harmed</div>
                <div v-else class="drawing-canvas__submission--back">Helped</div>
            </div>
        </div>
        <div class="drawing-canvas__hint">
            <h4>CORRECT</h4>
            <p>{{ hint }}</p>
        </div>
        <div class="drawing-canvas__actions">
            <button @click.prevent="sendDrawing(true)" class="button--round drawing-canvas__button--harm">
                <i class="material-icons">mood_bad</i>
            </button>
            <button @click.prevent="sendDrawing()" class="button--round drawing-canvas__button">
                <i class="material-icons">mood</i>
            </button>
        </div>

    </form>
</template>

<script>
// Imports
import { Component, Vue } from 'vue-property-decorator';
import debounce from 'lodash.debounce';
import config from 'config/config.js';

/**
 * @name DrawingCanvas
 * @desc This class handles the submission and drawing of images for the round
 * @since Jul 16 2017
 */
@Component({
    props: ['hint']
})
export default class DrawingCanvas extends Vue {
    // Class data
    canvas = null;
    canvasContext = null;
    canvasSize = 600;
    penSize = 4;
    fillColor = '#000000';
    penDown = false;
    penPosition = { x: 0, y: 0 };
    penLastPosition = { x: 0, y: 0 };
    encodedDrawing = null;
    harmfulSubmission = false;

    // Mounted
    mounted() {
        // Get the initial canvas size
        this.resizeCanvas();

        // Get the canvas context
        this.canvas = this.$refs.drawingCanvas;
        this.canvasContext = this.canvas.getContext('2d');

        // Set canvas style
        this.canvasContext.fillStyle = this.fillColor;
        this.canvasContext.lineCap = 'round';

        // Resize canvas based on current screen size
        window.addEventListener('resize', debounce(this.resizeCanvas, 500));
    }

    /**
     * @desc This method will capture the current drawing of the canvas
     *      and will submit it to the server as a hint
     * @since Jul 16 2017
     * @param {bool} harm
     */
    sendDrawing(harm=false) {
        // Capture the submissionType
        this.harmfulSubmission = harm;

        // Capture the drawing
        this.encodedDrawing = this.canvas.toDataURL();
    }

    /**
     * @desc This method will render a line on the canvas at the provided coords
     * @since Jul 16 2017
     * @param {int} x
     * @param {int} y
     */
    renderLine(x, y) {
        // Set line size
        this.canvasContext.lineWidth = (this.penSize * 2);

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
        if (e.touches && e.touches.length >= 1) {
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

    /**
     * @desc This method will hide and resize the canvas based
     *      on the current screen size
     * @since Jul 16 2017
     */
    resizeCanvas() {
        // If the window is smaller than 432
        if (window.innerWidth < 432) {
            this.canvasSize = 300;
        }

        // Else the window is smaller than 640
        else if (window.innerWidth < 640 && window.innerWidth >= 432) {
            this.canvasSize = 400;
        }

        // Else if the window is back to our max
        else {
            this.canvasSize = 600;
        }
    }

    /**
     * @desc This will return a random advice message
     * @since Jul 2017
     * @returns {string}
     */
    get getAdvice() {
        return config.adviceMessages[Math.floor(Math.random() * config.adviceMessages.length)]
    }
}
</script>

<style lang="scss">
@import '~scss/util/util';

// drawing-canvas
.drawing-canvas {
    display: flex;
    padding: 16px;
    box-sizing: border-box;
    align-items: center;
    flex-direction: column;

    // drawing-canvas__canvas
    @include element('canvas') {
        margin-bottom: 16px;
        background: white;
        cursor: crosshair;
        border-radius: 2%;
        @include box-shadow(2);
    }

    // drawing-canvas__submitted-canvas
    @include element('submitted-canvas') {
        margin-bottom: 16px;
        border-radius: 2%;
        transform-style: preserve-3d;
        animation: flip 0.375s normal ease;
        animation-fill-mode: forwards;
    }

    // drawing-canvas__submitted-canvas-container
    @include element('submitted-canvas-container') {
        perspective: 1000px;
    }

    // drawing-canvas__submission
    @include element('submission') {
        position: absolute;
        display: flex;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        cursor: crosshair;
        background: #FFFFFF;
        backface-visibility: hidden;
        border-radius: 2%;
        justify-content: center;
        align-items: center;
        font-size: 64px;
        @include box-shadow(2);

        // drawing-canvas__submission--back
        @include modifier('back') {
            transform: rotateY(180deg);
            cursor: default;
            background: #FFFFFF;
            border: 6px solid $color-valid;
            color: $color-valid;
            box-sizing: border-box;
            font-family: 'Permanent Marker', cursive;
        }

        // drawing-canvas__submission--harm
        @include modifier('harm') {
            border: 6px solid $color-invalid;
            color: $color-invalid;
        }
    }

    // drawing-canvas__hint
    @include element('hint') {
        width: 100%;
        padding: 16px;
        margin-bottom: 16px;
        background: $color-accent;
        box-sizing: border-box;
        border-radius: 4px;

        // Advice
        h4 {
            margin: 0;
            font-size: 18px;
            font-weight: 400;
            color: $color-text-secondary;
            text-transform: uppercase;
            text-align: center;
        }

        // Hint
        p {
            margin: 0;
            font-size: 48px;
            font-weight: 800;
            text-align: center;
        }
    }

    // drawing-canvas__actions
    @include element('actions') {
        position: fixed;
        display: flex;
        bottom: 0;
        left: 0;
        width: 100%;
        justify-content: space-between;
    }

    // drawing-canvas__button
    @include element('button') {
        margin: 16px;
        background: $color-valid;

        // Focus
        &:focus {
            background: darken($color-valid, 2);
        }

        // Active
        &:active {
            background: darken($color-valid, 4);
        }

        @include modifier('harm') {
            background: $color-invalid;

            // Focus
            &:focus {
                background: darken($color-invalid, 2);
            }

            // Active
            &:active {
                background: darken($color-invalid, 4);
            }
        }
    }
}

// Animation flip
@keyframes flip {
    0% {
        transform: rotateY(0deg);
    }

    100% {
        transform: rotateY(180deg);
    }
}
</style>
