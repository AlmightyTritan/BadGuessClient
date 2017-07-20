// Imports
import Vue from 'vue';
import VueRouter from 'vue-router';
import VueCookie from 'vue-cookie'
import Game from 'vue/Game.vue';
import MainView from 'vue/views/MainView.vue';
import GameView from 'vue/views/GameView.vue';
import LobbyView from 'vue/views/LobbyView.vue';

// Init plugins
Vue.use(VueRouter);
Vue.use(VueCookie);

// Init router
let routes = [
    { path: '/:roomCode?', component: MainView },
    { path: '/game/:roomCode', component: GameView },
    { path: '/lobby/:roomCode', component: LobbyView }
];
let router = new VueRouter({ routes });

// Init new app
let app = new Vue({
    el: '#app',
    router: router,
    render: h => h(Game)
});

// Export
export { app };
