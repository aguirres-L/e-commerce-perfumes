import { useEffect } from "react";

export function useBackButtonClose(onClose, isActive) {
  useEffect(() => {
    if (!isActive) return;

    window.history.pushState(null, "", window.location.href);

    const handlePopState = (e) => {
      e.preventDefault();
      onClose();
      window.history.pushState(null, "", window.location.href);
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [onClose, isActive]);
} 