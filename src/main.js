/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

// ルーティングのために追加
// import VueRouter from 'vue-router'
import router from './router'

const app = createApp(App).use(router)

registerPlugins(app)

app.mount('#app')
