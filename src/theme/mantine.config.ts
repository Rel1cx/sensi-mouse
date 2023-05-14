import { type ColorScheme, type MantineThemeOverride } from "@mantine/core"

import { colors } from "./theme"

export const mantineThemetheme: (colorScheme: ColorScheme) => MantineThemeOverride = (colorScheme = "light") => ({
    colorScheme,
    fontFamily: "var(--base-font-family)",
    headings: {
        fontFamily: "var(--base-font-family)",
    },
    colors,
    primaryColor: "blue",
    primaryShade: 0,
})
