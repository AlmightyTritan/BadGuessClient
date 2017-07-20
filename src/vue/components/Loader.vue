<template lang="html">
    <div class="loader" v-show="loadingStatus">
        <div class="loader__fill"></div>
    </div>
</template>

<script>
// Imports
import { Component, Vue } from 'vue-property-decorator';

/**
 * @name Loader
 * @desc This component will display the loader if something is loading
 * @since Jul 20 2017
 */
@Component
export default class Loader extends Vue {
    // Class data
    loadingStatus = false;

    // Created
    created() {
        // Set event listeners
        this.$root.$on('loading', this.setLoadingStatus)
    }

    /**
     * @desc This method will set the current state of the loading spinner
     * @since Jul 20 2017
     * @param {bool} loadingStatus
     */
    setLoadingStatus(loadingStatus) {
        if (typeof loadingStatus === 'boolean') {
            this.loadingStatus == loadingStatus;
        }
    }
}
</script>

<style lang="scss">
@import '~scss/util/util';

// loader
.loader {
    position: fixed;
    bottom: 16px;
    left: 16px;
    display: flex;
    height: 32px;
    width: 32px;
    border: 4px solid $color-text-primary;
    border-radius: 50%;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    animation: loader 2s infinite ease;

    // loader__fill
    @include element('fill') {
        display: block;
        height: 24px;
        width: 24px;
        border-radius: 50%;
        background: $color-text-primary;
        animation: loader__fill 2s infinite ease;
    }
}

// Animation loader
@keyframes loader {
    0% {
        transform: rotate(0deg);
    }

    25% {
        transform: rotate(180deg);
    }

    50% {
        transform: rotate(180deg);
    }

    75% {
        transform: rotate(360deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

@keyframes loader__fill {
    0% {
        height: 12px;
        width: 12px;
        transform: translateY(-200%);
    }

    25% {
        height: 12px;
        width: 12px;
        background: $color-accent;
    }

    50% {
        height: 24px;
        width: 24px;
        transform: translateY(0);
        background: $color-complement;
    }

    75% {
        height: 24px;
        width: 24px;
        transform: translateY(0);
        background: $color-complement;
    }

    100% {
        height: 12px;
        width: 12px;
        transform: translateY(-200%);
        background: $color-complement;
    }
}
</style>
