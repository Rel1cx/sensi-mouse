import { type MantineThemeOverride } from '@mantine/core'

export const colors = {
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
    lightgray: [
        '#959595',
        '#8c8c8c',
        '#838383',
        '#7a7a7a',
        '#717171',
        '#686868',
        '#5f5f5f',
        '#565656',
        '#4d4d4d',
        '#444444'
    ]
} satisfies MantineThemeOverride['colors']
