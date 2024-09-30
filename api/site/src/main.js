import 'bootstrap/dist/css/bootstrap.css';
import 'vuetify/dist/vuetify.min.css'

import axios from 'axios';
import Vuetify from 'vuetify'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'


axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://127.0.0.1:8000/';

const app = createApp(App)
app.use(router, Vuetify).mount('#app')
