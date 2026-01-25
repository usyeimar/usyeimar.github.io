import { getDictionary } from "@/data/resume";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { BookingFrame } from "@/components/booking-frame";

export default async function BookingPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const data: any = await getDictionary(lang);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 gap-4">
       <Link href={lang === "es" ? "/es" : "/en"} className="self-start md:self-center md:absolute md:top-8 md:left-8">
        <Button variant="ghost" className="gap-2">
            <ChevronLeft className="size-4" />
            {lang === "es" ? "Volver" : "Back"}
        </Button>
      </Link>
      <div className="w-full max-w-4xl h-[800px] bg-background rounded-xl border shadow-sm overflow-hidden flex flex-col">
         <BookingFrame url={data.contact.bookingUrl} />
      </div>
    </div>
  );
}
