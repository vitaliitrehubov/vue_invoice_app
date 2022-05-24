import { createI18n } from 'vue-i18n'
import { translations } from '@/constants'

export const i18n = createI18n({
  locale: 'en',
  messages: translations
})
