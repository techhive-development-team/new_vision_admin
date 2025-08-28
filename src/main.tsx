import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ThemeProvider } from "@mui/material";
import { theme } from "./styles/theme.ts";
import NewVisionRoutes from "./routes/NewVisionRoutes.tsx";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider theme={theme}>
    <StrictMode>
      <NewVisionRoutes />
    </StrictMode>
  </ThemeProvider>
);
