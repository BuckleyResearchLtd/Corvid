import './assets/main.css';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { io } from 'socket.io-client';
import store from './store'

const app = createApp(App)

app.use(router)

const socket = io('http://localhost:8000',
  {
    transports: ['websocket'],
  }
);
socket.on('connect_error', (error) => {
  console.error('Connection Error:', error);
});
app.config.globalProperties.$socket = socket;
app.use(store);

app.mount('#app')