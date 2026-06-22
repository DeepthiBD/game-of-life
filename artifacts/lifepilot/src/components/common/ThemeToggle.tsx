import { Sun, Moon, Monitor } from "lucide-react";
import { useTheme } from "../../hooks/useTheme";
import { Button } from "../ui/button";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const cycleTheme = () => {
    if (theme === "light") setTheme("dark");
    else if (theme === "dark") setTheme("system");
    else setTheme("light");
  };

  const Icon = theme === "light" ? Sun : theme === "dark" ? Moon : Monitor;

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={cycleTheme}
      data-testid="button-theme-toggle"
      className="rounded-full"
    >
      <Icon className="w-5 h-5" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
