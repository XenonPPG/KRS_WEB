import {createApp} from 'vue'
import {createPinia} from 'pinia'

import App from './App.vue'
import router from './router.ts'
import {MotionPlugin} from "@vueuse/motion";

import './style.css'
import {ClickOutside} from "@/scripts/ClickOutside.directive.ts";

const app = createApp(App)
const pinia = createPinia()

app.directive('click-outside', ClickOutside)

app.use(pinia)
app.use(router)
app.use(MotionPlugin)

export {pinia}
app.mount('#app')
