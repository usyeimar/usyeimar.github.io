import Link from "next/link";
import { FlickeringGrid } from "@/components/magicui/flickering-grid";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";


type Props = {
  data: any;
};

export default function ContactSection({ data }: Props) {
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
      <div className="relative flex flex-col items-center gap-6 text-center">
        <div className="space-y-4">
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
        </div>
        
        <div className="flex flex-col items-center gap-4 w-full">
           {/* Social Icons Row */}
          <div className="flex gap-4">
            {Object.entries(data.contact.social).map(([key, social]: [string, any]) => {
               if (!social.url) return null;
               const Icon = Icons[social.icon as keyof typeof Icons];
               return (
                 <Link key={key} href={social.url} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="icon" className="rounded-full">
                        {Icon && <Icon className="size-4" />}
                        <span className="sr-only">{social.name}</span>
                    </Button>
                 </Link>
               );
            })}
          </div>

          {/* Booking Button Modal */}
          {/* Booking Button CTA */}
          {data.contact.social.Booking && (
             <Link href={data.contact.social.Booking.url}>
                <Button size="lg" className="rounded-full font-semibold">
                    {data.sectionHeaders.contact.bookingButtonLabel}
                </Button>
             </Link>
          )}
        </div>
      </div>
    </div>
  );
}

