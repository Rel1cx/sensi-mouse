import { createStitches, defaultThemeMap } from '@stitches/react'

const { createTheme, styled } = createStitches({
    themeMap: {
        ...defaultThemeMap
    },
    theme: {
        colors: {
            hover: '#ececec',
            overlay: 'rgba(0, 0, 0, 0.15)',
            selected: 'rgba(66, 133, 244, 1.000)',
            text: '#333333',
            warn: 'rgba(255, 100, 100, 1)'
        }
    }
})

export const dark = createTheme({})

export { styled }
