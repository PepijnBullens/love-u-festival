"use client";

import React, { useEffect, useState } from "react";
import { translation } from "@/app/i18n";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
};

export default function InstallPage({
  params,
}: {
  params: Promise<{ lng: string }>;
}) {
  const [t, setT] = useState<(key: string) => string>(
    () => (key: string) => key
  );

  useEffect(() => {
    async function fetchLngAndTranslation() {
      const { lng } = await params;
      const { t } = await translation(lng, "installation");
      setT(() => t);
    }
    fetchLngAndTranslation();
  }, [params]);

  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallButton, setShowInstallButton] = useState(false);

  useEffect(() => {
    if (typeof navigator !== "undefined") {
      setIsIOS(/iPad|iPhone|iPod/.test(navigator.userAgent));
    }

    if (typeof window !== "undefined") {
      setIsStandalone(window.matchMedia("(display-mode: standalone)").matches);

      const handler = (e: Event) => {
        const event = e as BeforeInstallPromptEvent;

        event.preventDefault();
        setDeferredPrompt(event);
        setShowInstallButton(true);
      };

      window.addEventListener("beforeinstallprompt", handler);

      return () => {
        window.removeEventListener("beforeinstallprompt", handler);
      };
    }
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt && "prompt" in deferredPrompt) {
      deferredPrompt.prompt();

      await deferredPrompt.userChoice;

      setDeferredPrompt(null);
      setShowInstallButton(false);
    }
  };

  if (isStandalone) return null;

  return (
    <div className="p-8  flex grow items-center justify-center flex-col">
      <h1 className="text-center sansation-bold text-5xl mb-4">{t("title")}</h1>
      {showInstallButton && (
        <button
          onClick={handleInstallClick}
          className="bg-[#000000] dark:bg-[#FFFFFF] max-w-[350px] active:scale-[98%] transition-transform text-[#FFFFFF] dark:text-[#000000] rounded-lg w-full flex justify-center p-4"
        >
          {t("add")}
        </button>
      )}
      {isIOS && (
        <p className="text-center">
          {t("first")}
          <span role="img" aria-label="share icon">
            {" "}
            ⎋{" "}
          </span>
          {t("second")}
          <span role="img" aria-label="plus icon">
            {" "}
            +{" "}
          </span>
        </p>
      )}
    </div>
  );
}
