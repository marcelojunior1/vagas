import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://127.0.0.1:8000/';

createApp(App).use(router).mount('#app')
