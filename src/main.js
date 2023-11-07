import { createApp } from 'vue';
import './assets/scss/style.scss';

// Importa il router
import { router } from './router';

import * as bootstrap from 'bootstrap';
import App from './App.vue';

const app = createApp(App);

// Installa il router
app.use(router);

app.mount('#app');
