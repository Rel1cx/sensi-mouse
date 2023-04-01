import { type MantineThemeOverride } from '@mantine/core'

export const mantineThemetheme: MantineThemeOverride = {
    colorScheme: 'light',
    fontFamily: `var(--base-font-family)`,
    headings: {
        fontFamily: `var(--base-font-family)`
    },
    colors: {
        // each color is an array of 10 shades
        pink: [
            '#FF7DB4',
            '#FF6CA3',
            '#FF5B92',
            '#FF4A81',
            '#FF3970',
            '#FF285F',
            '#FF174E',
            '#FF063D',
            '#FF002C',
            '#FF001B'
        ],
        blue: [
            '#00B8FF',
            '#00A7FF',
            '#0096FF',
            '#0085FF',
            '#0074FF',
            '#0063FF',
            '#0052FF',
            '#0041FF',
            '#0030FF',
            '#001FFF'
        ],
        purple: [
            '#654ea3',
            '#5f47a1',
            '#59409f',
            '#53389d',
            '#4d308b',
            '#47287a',
            '#412069',
            '#3b1857',
            '#350f46',
            '#2f0634'
        ],
        lightGray: [
            '#b8b8b8',
            '#a8a8a8',
            '#989898',
            '#888888',
            '#787878',
            '#686868',
            '#585858',
            '#484848',
            '#383838',
            '#282828'
        ]
    },
    primaryColor: 'blue',
    primaryShade: 0
}
