import { createApp } from 'vue';

import App from './App.vue';
import router from './router';

import 'nes.css/css/nes.min.css';
import './assets/main.css';

createApp(App).use(router).mount('#app');
