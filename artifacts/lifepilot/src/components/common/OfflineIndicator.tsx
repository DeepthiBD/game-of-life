import { motion, AnimatePresence } from "framer-motion";
import { WifiOff } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useOfflineStatus } from "../../hooks/useOfflineStatus";

export default function OfflineIndicator() {
  const { isOffline } = useOfflineStatus();
  const { t } = useTranslation();

  return (
    <AnimatePresence>
      {isOffline && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="bg-accent text-accent-foreground py-2 px-4 flex items-center justify-center gap-2 text-sm font-medium sticky top-0 z-50 overflow-hidden"
        >
          <WifiOff className="w-4 h-4" />
          <span>{t("app.offline")} — {t("errors.offline")}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
