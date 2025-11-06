import { defineClientConfig } from '@vuepress/client'
import ReadAloud from './components/ReadAloud.vue'

export default defineClientConfig({
  enhance({ app }) {
    app.component('ReadAloud', ReadAloud)
  }
})