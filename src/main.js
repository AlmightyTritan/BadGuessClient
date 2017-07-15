// Imports
import Vue from 'vue';
import VueRouter from 'vue-router';
import App from 'vue/App.vue';
import MainView from 'vue/views/MainView.vue';

// Init plugins
Vue.use(VueRouter);

// Init router
let routes = [
    { path: '/', component: MainView }
];
let router = new VueRouter({ routes });

// Init new app
let app = new Vue({
    el: '#app',
    router: router,
    render: h => h(App)
});

// Export
export { app };
