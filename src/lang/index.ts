import { createI18n } from 'vue-i18n' // 与vue2的VueI18n使用方式不同
import zn from './zn'
import en from './en'

const i18n = createI18n({
    locale: 'zn',
    messages: {
        zn: zn,
        en: en,
    },
    globalInjection: true, // 全局生效$t
    legacy: false, // composition API
})

export default i18n
