import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './routes'
import BeNotification from 'be-vue3-notification'
// you'll need import the CSS!
import 'be-vue3-notification/dist/style.css'

createApp(App).use(router).use(BeNotification).mount('#app')
