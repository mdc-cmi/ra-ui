import _ from "lodash"
import englishMessages        from "ra-language-english"
import portuguesMessages      from "i18n/ra-language-portugues"
import domainMessagesEn       from "i18n/en"
import domainMessagesPtBr     from "i18n/pt-BR"
import {resolveBrowserLocale} from "ra-core"

const messages = {
    en: _.merge(englishMessages, domainMessagesEn),
    "pt-BR": _.merge(portuguesMessages, domainMessagesPtBr),
}
export function pickLocale() {
    let locale = localStorage.getItem("locale")
    locale = locale || resolveBrowserLocale()
    if (!(locale in messages)) {
      if (locale === "uk") return "en"
      return "pt-BR"
    }
    return locale
}

export default locale => messages[locale]
