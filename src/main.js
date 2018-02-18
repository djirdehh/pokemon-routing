import Vue from 'vue';
import App from './app/app.js';

// If using vue-router, router object must be imported and introduced to the Vue instance
// import { router } from './app/app-vue-router.js';

new Vue({
  el: '#app',
  render: h => h(App)
});
