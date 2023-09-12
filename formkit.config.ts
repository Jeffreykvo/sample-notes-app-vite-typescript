// formkit.config.js
import { generateClasses } from '@formkit/themes'
import { genesisIcons } from '@formkit/icons'
import myTailwindTheme from './tailwind-theme'
import type { DefaultConfigOptions } from '@formkit/vue'

import { nl } from '@formkit/i18n'

const config: DefaultConfigOptions = {

  locales: { nl },
  locale: 'nl',

  icons: {
    ...genesisIcons,
  },
  config: {
    classes: generateClasses(myTailwindTheme),
  },
}

export default config