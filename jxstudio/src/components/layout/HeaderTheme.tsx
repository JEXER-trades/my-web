import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

/**
 * Pages declare whether their hero is dark or light so the transparent
 * navigation can use the right foreground colour before the user scrolls.
 */
type Theme = "dark" | "light";
const Ctx = createContext<{ theme: Theme; setTheme: (t: Theme) => void }>({ theme: "light", setTheme: () => {} });

export function HeaderThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");
  return <Ctx.Provider value={{ theme, setTheme }}>{children}</Ctx.Provider>;
}

export const useHeaderThemeValue = () => useContext(Ctx).theme;

export function useHeaderTheme(theme: Theme) {
  const { setTheme } = useContext(Ctx);
  useEffect(() => setTheme(theme), [theme, setTheme]);
}
