"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function BookingFrame({ url }: { url: string }) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-full h-full bg-background animate-pulse" />;
  }

  // Google Calendar doesn't support dark mode natively.
  // We invert colors to fake it when in dark mode.
  const isDark = resolvedTheme === "dark";

  return (
    <iframe
      src={url}
      style={{
        border: 0,
        filter: isDark ? "invert(1) hue-rotate(180deg) saturate(0.6)" : "none",
        transition: "filter 0.3s ease",
      }}
      className="w-full h-full flex-1"
      allowFullScreen
    />
  );
}
