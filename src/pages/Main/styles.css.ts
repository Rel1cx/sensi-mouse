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
    fontSize: "15px",
    fontWeight: "500",
})

export const content = style({
    padding: "0.5rem 0",
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
})

export const xSlider = style({
    marginBottom: "12px",
})

export const xSwitch = style({
    marginTop: "4px",
    cursor: "pointer",
})

export const footer = style({
    display: "flex",
    flexFlow: "row nowrap",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: "0.5rem",
    fontSize: "12px",
    opacity: "0.95",
})
