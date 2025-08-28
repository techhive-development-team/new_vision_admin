import { createTheme } from "@mui/material";

export const theme = createTheme({
  shape: { borderRadius: 14 },
  typography: {
    fontFamily: `Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Noto Sans, Ubuntu, Cantarell, Helvetica Neue, Arial, "Apple Color Emoji", "Segoe UI Emoji"`,
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: "none",
          borderBottom: "1px solid",
          borderColor: "divider",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: { boxShadow: "none" },
      },
    },
  },
});
