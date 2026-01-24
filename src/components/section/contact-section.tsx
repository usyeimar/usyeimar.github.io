"use client";
import Link from "next/link";
import { FlickeringGrid } from "@/components/magicui/flickering-grid";
import { useEffect, useRef } from "react";

type Props = {
  data: any;
};

export default function ContactSection({ data }: Props) {
  const buttonContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!data.contact.bookingUrl || !buttonContainerRef.current) return;

    const head = document.querySelector("head");
    const scriptId = "google-calendar-script";
    const cssId = "google-calendar-css";

    // Load CSS
    if (!document.getElementById(cssId)) {
       const link = document.createElement("link");
       link.id = cssId;
       link.href = "https://calendar.google.com/calendar/scheduling-button-script.css";
       link.rel = "stylesheet";
       head?.appendChild(link);
    }

    // Load Script and initialize
    const loadButton = () => {
       if ((window as any).calendar) {
           (window as any).calendar.schedulingButton.load({
            url: data.contact.bookingUrl,
            color: '#000000',
            label: data.sectionHeaders.contact.bookingButtonLabel,
            target: buttonContainerRef.current,
          });
       }
    };

    if (!document.getElementById(scriptId)) {
        const script = document.createElement("script");
        script.id = scriptId;
        script.setAttribute("src", "https://calendar.google.com/calendar/scheduling-button-script.js");
        script.setAttribute("async", "true");
        script.onload = loadButton;
        head?.appendChild(script);
    } else {
        loadButton();
    }
  }, [data.contact.bookingUrl, data.sectionHeaders.contact.bookingButtonLabel]);

  return (
    <div className="border rounded-xl p-10 relative">
      <div className="absolute -top-4 border bg-primary z-10 rounded-xl px-4 py-1 left-1/2 -translate-x-1/2">
        <span className="text-background text-sm font-medium">{data.sectionHeaders.contact.label}</span>
      </div>
      <div className="absolute inset-0 top-0 left-0 right-0 h-1/2 rounded-xl overflow-hidden">
        <FlickeringGrid
          className="h-full w-full"
          squareSize={2}
          gridGap={2}
          style={{
            maskImage: "linear-gradient(to bottom, black, transparent)",
            WebkitMaskImage: "linear-gradient(to bottom, black, transparent)",
          }}
        />
      </div>
      <div className="relative flex flex-col items-center gap-4 text-center">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
          {data.sectionHeaders.contact.title}
        </h2>
        <p className="mx-auto max-w-lg text-muted-foreground text-balance">
          {data.sectionHeaders.contact.description}{" "}
          <Link
            href={data.contact.social.email.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
          >
            {data.sectionHeaders.contact.linkText}
          </Link>{" "}
          {data.sectionHeaders.contact.suffix}
        </p>
        
        {data.contact.bookingUrl && (
          <div className="w-full mt-8 flex justify-center">
             <div ref={buttonContainerRef} />
          </div>
        )}
      </div>
    </div>
  );
}

