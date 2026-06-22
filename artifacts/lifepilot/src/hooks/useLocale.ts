import { useTranslation } from "react-i18next";
import type { SupportedLanguage } from "../types";
import { SUPPORTED_LANGUAGES } from "../localization/i18n";

export function useLocale() {
  const { i18n, t } = useTranslation();

  const currentLanguage = i18n.language as SupportedLanguage;

  async function changeLanguage(lang: SupportedLanguage): Promise<void> {
    await i18n.changeLanguage(lang);
    try {
      localStorage.setItem("lifepilot-language", lang);
    } catch {
      // ignore
    }
    // Update document lang attribute for accessibility
    document.documentElement.setAttribute("lang", lang);
  }

  const languageOptions = Object.entries(SUPPORTED_LANGUAGES).map(
    ([code, info]) => ({
      code: code as SupportedLanguage,
      nativeName: info.nativeName,
      englishName: info.englishName,
      rtl: info.rtl,
    })
  );

  return {
    t,
    i18n,
    currentLanguage,
    changeLanguage,
    languageOptions,
    supportedLanguages: SUPPORTED_LANGUAGES,
  };
}
