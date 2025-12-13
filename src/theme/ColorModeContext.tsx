import React, { createContext, useState, useMemo, useContext } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { getTheme } from "./theme";

interface ColorModeContextType {
  toggleMode: () => void;
  mode: "light" | "dark";
}

const ColorModeContext = createContext<ColorModeContextType | undefined>(undefined);

export function ColorModeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<"light" | "dark">("light");

  const toggleMode = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  const theme = useMemo(() => getTheme(mode), [mode]);

  return (
    <ColorModeContext.Provider value={{ toggleMode, mode }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export const useColorMode = () => {
  const ctx = useContext(ColorModeContext);
  if (!ctx) throw new Error("useColorMode must be inside provider");
  return ctx;
};
