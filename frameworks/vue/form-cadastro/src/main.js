import { createApp } from 'vue'
import App from './App.vue'
import VueMask from 'v-mask'

const app = createApp(App)
app.use(VueMask)
app.mount('#app')