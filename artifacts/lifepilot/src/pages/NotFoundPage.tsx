import { useTranslation } from "react-i18next";
import { Link } from "wouter";

export default function NotFoundPage() {
  const { t } = useTranslation();

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-background"
      data-testid="page-not-found"
    >
      <div className="text-6xl mb-4" aria-hidden="true">🌫️</div>
      <h1 className="text-2xl font-bold text-foreground mb-2">
        {t("errors.notFound")}
      </h1>
      <p className="text-muted-foreground mb-6">
        {t("errors.notFoundDescription")}
      </p>
      <Link
        href="/"
        className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium"
        data-testid="link-go-home"
      >
        {t("errors.goHome")}
      </Link>
    </div>
  );
}
