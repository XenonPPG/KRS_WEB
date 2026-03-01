import {createApp} from 'vue'
import {createPinia} from 'pinia'

import App from './App.vue'
import router from './router.ts'
import {MotionPlugin} from "@vueuse/motion";

import './style.css'
import {ClickOutside} from "@/scripts/ClickOutside.directive.ts";

const app = createApp(App)

app.directive('click-outside', ClickOutside)

app.use(createPinia())
app.use(router)
app.use(MotionPlugin)

app.mount('#app')
