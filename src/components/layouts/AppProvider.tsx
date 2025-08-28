// components/layouts/AppProvider.tsx
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme();

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default AppProvider;
