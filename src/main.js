import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import store from './store'
import { i18n } from '@/plugins/i18n'
import { Quasar } from 'quasar'
import quasarUserOptions from './quasar-user-options'

const app = createApp(App)

app.use(store)
app.use(router)
app.use(Quasar, quasarUserOptions)
app.use(i18n)

app.mount('#app')

