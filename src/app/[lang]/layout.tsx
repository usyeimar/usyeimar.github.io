import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { getDictionary } from "@/data/resume";
import type { Metadata } from "next";
import { FlickeringGrid } from "@/components/magicui/flickering-grid";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const data = await getDictionary(lang);
  
  return {
    metadataBase: new URL(data.url),
    title: {
      default: data.name,
      template: `%s | ${data.name}`,
    },
    description: data.description,
    openGraph: {
      title: `${data.name}`,
      description: data.description,
      url: data.url,
      siteName: `${data.name}`,
      locale: lang === "es" ? "es_ES" : "en_US",
      type: "website",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    twitter: {
      title: `${data.name}`,
      card: "summary_large_image",
    },
    verification: {
      google: "",
      yandex: "",
    },
  };
}

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const data = await getDictionary(lang);

  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <TooltipProvider delayDuration={0}>
        <div className="absolute inset-0 top-0 left-0 right-0 h-[100px] overflow-hidden z-0">
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
        <div className="relative z-10 max-w-2xl mx-auto py-12 pb-24 sm:py-24 px-6">
          {children}
        </div>
        <Navbar data={data} lang={lang} />
      </TooltipProvider>
    </ThemeProvider>
  );
}
