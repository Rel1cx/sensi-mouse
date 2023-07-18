import { style } from "@vanilla-extract/css"

export const container = style({
    display: "flex",
    flexFlow: "column nowrap",
    justifyContent: "space-between",
    padding: "0.5rem 16px 6px 16px",
    width: "100%",
    height: "100%",
})

export const title = style({
    margin: "0",
    padding: "0",
    color: "rgb(18, 18, 18)",
    fontWeight: "500",
    fontSize: "15px",
})

export const content = style({
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    padding: "0.5rem 0",
})

export const xSlider = style({
    marginBottom: "12px",
})

export const xSwitch = style({
    cursor: "pointer",
    marginTop: "4px",
})

export const footer = style({
    display: "flex",
    flexFlow: "row nowrap",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: "0.5rem",
    opacity: "0.95",
    fontSize: "12px",
})
