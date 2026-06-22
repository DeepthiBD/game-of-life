import { useTranslation } from "react-i18next";
import { useLocale } from "../hooks/useLocale";
import { useTheme } from "../hooks/useTheme";
import type { ThemeMode, SupportedLanguage } from "../types";

export default function SettingsPage(): React.ReactNode {
  const { t } = useTranslation();
  const { currentLanguage, changeLanguage, languageOptions } = useLocale();
  const { theme, setTheme } = useTheme();

  const themes: { value: ThemeMode; labelKey: string }[] = [
    { value: "light", labelKey: "settings.themeLight" },
    { value: "dark", labelKey: "settings.themeDark" },
    { value: "system", labelKey: "settings.themeSystem" },
  ];

  return (
    <div className="flex-1 p-6 max-w-2xl mx-auto w-full" data-testid="page-settings">
      <h1 className="text-2xl font-bold text-foreground mb-6">
        {t("settings.title")}
      </h1>

      <div className="space-y-6">
        <section aria-labelledby="language-heading">
          <h2
            id="language-heading"
            className="text-base font-semibold text-foreground mb-1"
          >
            {t("settings.language")}
          </h2>
          <p className="text-sm text-muted-foreground mb-3">
            {t("settings.languageDescription")}
          </p>
          <div className="grid grid-cols-2 gap-2">
            {languageOptions.map((lang) => (
              <button
                key={lang.code}
                onClick={() => changeLanguage(lang.code as SupportedLanguage)}
                className={`px-4 py-3 rounded-xl border text-sm font-medium text-left transition-colors ${
                  currentLanguage === lang.code
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card text-card-foreground border-border hover:bg-muted"
                }`}
                aria-pressed={currentLanguage === lang.code}
                data-testid={`button-language-${lang.code}`}
              >
                <span className="block font-semibold">{lang.nativeName}</span>
                <span className="block text-xs opacity-70">{lang.englishName}</span>
              </button>
            ))}
          </div>
        </section>

        <section aria-labelledby="theme-heading">
          <h2
            id="theme-heading"
            className="text-base font-semibold text-foreground mb-3"
          >
            {t("settings.theme")}
          </h2>
          <div className="flex gap-2">
            {themes.map(({ value, labelKey }) => (
              <button
                key={value}
                onClick={() => setTheme(value)}
                className={`flex-1 px-4 py-3 rounded-xl border text-sm font-medium transition-colors ${
                  theme === value
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card text-card-foreground border-border hover:bg-muted"
                }`}
                aria-pressed={theme === value}
                data-testid={`button-theme-${value}`}
              >
                {t(labelKey)}
              </button>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
