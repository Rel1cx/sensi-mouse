import { style } from "@vanilla-extract/css"

export const container = style({
    padding: "16px",
    height: "100%",
    display: "flex",
    flexFlow: "column",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "0.5rem",
})

export const link = style({
    cursor: "pointer",
    textDecoration: "underline",
})
