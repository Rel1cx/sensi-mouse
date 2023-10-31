import { style } from "@vanilla-extract/css";

export const container = style({
  display: "flex",
  flexFlow: "column",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "0.5rem",
  padding: "16px",
  height: "100%",
});

export const link = style({
  cursor: "pointer",
  textDecoration: "underline",
});
