import { style } from "@vanilla-extract/css";

export const title = style({
  margin: "0",
  padding: "0",
  color: "rgb(18, 18, 18)",
  fontWeight: "500",
  fontSize: "15px",

  "@media": {
    "(prefers-color-scheme: dark)": {
      color: "rgb(240, 240, 240)",
    },
  },
});
