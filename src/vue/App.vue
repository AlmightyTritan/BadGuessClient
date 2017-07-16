<template lang="html">
    <router-view></router-view>
</template>

<script>
// Imports
import { Component, Vue } from 'vue-property-decorator';

/**
 * @name App
 * @desc This class manages the top most component for the app
 * @since Jul 15 2017
 */
@Component
export default class App extends Vue {

}
</script>

<style lang="scss">
@import '~scss/main';
</style>
