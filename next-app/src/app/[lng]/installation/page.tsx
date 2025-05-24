"use client";

import React, { useEffect, useState } from "react";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
};

export default function InstallPage() {
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallButton, setShowInstallButton] = useState(false);

  useEffect(() => {
    setIsIOS(/iPad|iPhone|iPod/.test(navigator.userAgent));

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
      <h1 className="text-center text-5xl mb-4">Install App</h1>
      {showInstallButton && (
        <button
          onClick={handleInstallClick}
          className="bg-red max-w-[350px] active:scale-[98%] transition-transform text-white rounded-lg w-full flex justify-center p-4"
        >
          Add to Home Screen
        </button>
      )}
      {isIOS && (
        <p>
          To install this app on your iOS device, tap the share button
          <span role="img" aria-label="share icon">
            {" "}
            ⎋{" "}
          </span>
          and then &quot;Add to Home Screen&quot;
          <span role="img" aria-label="plus icon">
            {" "}
            +{" "}
          </span>
          .
        </p>
      )}
    </div>
  );
}
