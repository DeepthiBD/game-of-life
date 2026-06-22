import { describe, it, expect } from "vitest";
import i18n, { SUPPORTED_LANGUAGES } from "../localization/i18n";

describe("i18n configuration", () => {
  it("should initialize with English as default", () => {
    expect(i18n.language).toBe("en");
  });

  it("should have all 10 Indian languages registered", () => {
    const expected = ["en", "hi", "ta", "te", "kn", "ml", "mr", "bn", "gu", "pa"];
    expected.forEach((lang) => {
      expect(SUPPORTED_LANGUAGES).toHaveProperty(lang);
    });
  });

  it("should translate app name", () => {
    const appName = i18n.t("app.name");
    expect(appName).toBe("LifePilot");
  });

  it("should translate all 8 module names in English", () => {
    const modules = [
      "cockpit", "pilot", "flightPlan", "flightLog",
      "moneyQuest", "lifeChoices", "careerExplorer", "futureMe",
    ];
    modules.forEach((mod) => {
      const name = i18n.t(`modules.${mod}.name`);
      expect(name).not.toBe(`modules.${mod}.name`);
      expect(name.length).toBeGreaterThan(0);
    });
  });

  it("should have native names for all languages", () => {
    Object.values(SUPPORTED_LANGUAGES).forEach(({ nativeName }) => {
      expect(nativeName.length).toBeGreaterThan(0);
    });
  });
});
