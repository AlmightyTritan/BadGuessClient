<template lang="html">
    <form @submit.prevent="joinRoom" class="player-form">
        <h3 class="player-form__header">Join Game</h3>
        <section class="player-form__inputs">
            <input type="text" v-model.trim="username" :invalid="usernameInvalid" placeholder="Username">
            <input type="text" v-model.trim="roomCode" :invalid="roomCodeInvalid" placeholder="Room code">
        </section>
        <button @click.prevent="joinRoom" class="button--round player-form__button"><i class="material-icons">play_arrow</i></button>
    </form>
</template>

<script>
// Imports
import { Component, Vue, Watch } from 'vue-property-decorator';
import config from 'config/config.js';

/**
 * @name PlayerForm
 * @desc This class will handle the creation/registration of a new player to
 *      a games room
 * @since Jul 15 2017
 */
@Component
export default class PlayerForm extends Vue {
    // Class data
    username = null;
    roomCode = null;
    usernameInvalid = null;
    roomCodeInvalid = null;

    /**
     * @desc This method will let the player join the requested room
     * @since Jul 15 2017
     */
    joinRoom() {
        // If either of the fields were null at the time set invalid
        this.usernameInvalid = this.username === null ? true : false;
        this.roomCodeInvalid = this.roomCode === null ? true : false;

        // If the form is invalid
        if (this.usernameInvalid || this.roomCodeInvalid) {
            return;
        }

        // Make an attempt to join the room
        this.$router.push({ path: 'game/' + this.roomCode });
    }

    /**
     * @desc This method will watch for changes of the username
     * @since Jul 15 2017
     */
    @Watch('username')
    onUsernameChange() {
        // If the username length is longer than 0 validate it
        if (this.username.length == '' && this.username !== null) {
            this.usernameInvalid = true;
        }

        // Else it's valid
        else {
            this.usernameInvalid = false;
        }

        // If the username is longer than 12 chars clamp it
        if (this.username.length > config.usernameLimit) {
            this.username = this.username.substring(0, config.usernameLimit);
        }
    }

    /**
     * @desc This method will watch for changes of the roomCode
     * @since Jul 15 2017
     */
    @Watch('roomCode')
    onRoomCodeChange() {
        // If the username length is longer than 0 validate it
        if (this.roomCode.length == '' && this.roomCode !== null) {
            this.roomCodeInvalid = true;
        }

        // Else it's valid
        else {
            this.roomCodeInvalid = false;
        }
    }
}
</script>

<style lang="scss">
@import '~scss/util/util';

// player-form
.player-form {
    position: relative;
    display: flex;
    max-width: 400px;
    width: 100%;
    padding-bottom: 32px;
    margin: 32px 16px;
    flex-direction: column;
    align-self: flex-start;
    box-sizing: border-box;
    border-radius: 4px;
    background-color: lighten($color-background, 2);
    @include box-shadow(4);

    // player-form__header
    @include element('header') {
        padding: 32px 16px 16px 16px;
        margin: 0;
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
        background: $color-accent;
    }

    // player-form__inputs
    @include element('inputs') {
        padding: 16px;
        box-sizing: border-box;

        // Input
        input {
            width: 100%;
        }
    }

    // player-form__button
    @include element('button') {
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translate(-50%, 50%);
        @include box-shadow(4);
    }
}
</style>
