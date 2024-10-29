import { createApp } from 'vue'
import App from './App.vue'

import GoBoard from './components/GoBoard.vue'
import StatsBlock from './components/StatsBlock.vue'

const app = createApp(App)
app.component('go-board', GoBoard)
app.component('stats-block', StatsBlock)
app.mount('#app')
