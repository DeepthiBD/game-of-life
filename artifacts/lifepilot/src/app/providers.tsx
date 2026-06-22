import { type ReactNode, useEffect } from "react";
import { I18nextProvider } from "react-i18next";
import i18n from "../localization/i18n";
import { useTheme } from "../hooks/useTheme";
import { useLocale } from "../hooks/useLocale";

interface ThemeProviderProps {
  children: ReactNode;
}

function ThemeInitializer({ children }: ThemeProviderProps): ReactNode {
  const { theme } = useTheme();

  useEffect(() => {
    const root = document.documentElement;
    const resolved =
      theme === "system"
        ? window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light"
        : theme;
    root.classList.remove("light", "dark");
    root.classList.add(resolved);
  }, [theme]);

  return <>{children}</>;
}

function LocaleInitializer({ children }: { children: ReactNode }): ReactNode {
  const { currentLanguage } = useLocale();

  useEffect(() => {
    document.documentElement.setAttribute("lang", currentLanguage);
  }, [currentLanguage]);

  return <>{children}</>;
}

interface AppProvidersProps {
  children: ReactNode;
}

export function AppProviders({ children }: AppProvidersProps): ReactNode {
  return (
    <I18nextProvider i18n={i18n}>
      <LocaleInitializer>
        <ThemeInitializer>{children}</ThemeInitializer>
      </LocaleInitializer>
    </I18nextProvider>
  );
}
