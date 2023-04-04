import { type MantineThemeOverride } from '@mantine/core'

import { colors } from './theme'

export const mantineThemetheme: MantineThemeOverride = {
    colorScheme: 'light',
    fontFamily: `var(--base-font-family)`,
    headings: {
        fontFamily: `var(--base-font-family)`
    },
    colors,
    primaryColor: 'blue',
    primaryShade: 0
}
