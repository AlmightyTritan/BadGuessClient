<template lang="html">
    <form @submit.prevent="joinRoom">
        <input type="text" v-model.trim="username" :invalid="!isUsernameValid">
        <input type="text" v-model.trim="roomCode" :invalid="!isRoomCodeValid">
        <input type="submit">
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
    username = '';
    roomCode = '';
    isUsernameValid = '';
    isRoomCodeValid = '';

    /**
     * @desc This method will let the player join the requested room
     * @since Jul 15 2017
     */
    joinRoom() {
        // If the form is invalid
        if (!this.isUsernameValid || !this.isRoomCodeValid) {
            return;
        }

        // Make an attempt to join the room
    }

    /**
     * @desc This method will watch for changes of the username
     * @since Jul 15 2017
     */
    @Watch('username')
    onUsernameChange() {
        // If the username length is longer than 0 validate it
        if (this.username.length <= 0) {
            this.isUsernameValid = false;
        }

        // Else it's valid
        else {
            this.isUsernameValid = true;
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
        if (this.roomCode.length <= 0) {
            this.isRoomCodeValid = false;
        }

        // Else it's valid
        else {
            this.isRoomCodeValid = true;
        }
    }
}
</script>

<style lang="css">
</style>
