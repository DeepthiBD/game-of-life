import { Globe, Check } from "lucide-react";
import { useLocale } from "../../hooks/useLocale";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { cn } from "../../utils";
import type { SupportedLanguage } from "../../types";

export default function LanguageSwitcher() {
  const { currentLanguage, changeLanguage, languageOptions } = useLocale();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          data-testid="button-language-switcher"
          className="rounded-full"
        >
          <Globe className="w-5 h-5" />
          <span className="sr-only">Switch language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 max-h-[70vh] overflow-y-auto">
        {languageOptions.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => changeLanguage(lang.code as SupportedLanguage)}
            className={cn(
              "flex flex-col items-start gap-0.5 py-2",
              currentLanguage === lang.code && "bg-muted"
            )}
          >
            <div className="flex items-center justify-between w-full">
              <span className="font-medium">{lang.nativeName}</span>
              {currentLanguage === lang.code && <Check className="w-4 h-4 text-primary" />}
            </div>
            <span className="text-xs text-muted-foreground">{lang.englishName}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
