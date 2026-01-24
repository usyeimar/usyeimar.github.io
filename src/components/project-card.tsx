/* eslint-disable @next/next/no-img-element */
"use client";

import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { ArrowUpRight, ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Markdown from "react-markdown";

interface Props {
  title: string;
  href?: string;
  description: string;
  dates: string;
  tags: readonly string[];
  link?: string;
  image?: string;
  video?: string;
  gallery?: readonly { url: string; label: string }[];
  links?: readonly {
    icon: React.ReactNode;
    type: string;
    href: string;
  }[];
  className?: string;
}

export function ProjectCard({
  title,
  href,
  description,
  dates,
  tags,
  link,
  image,
  video,
  gallery,
  links,
  className,
}: Props) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (gallery) {
      setCurrentImageIndex((prev) => (prev + 1) % gallery.length);
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (gallery) {
      setCurrentImageIndex((prev) => (prev - 1 + gallery.length) % gallery.length);
    }
  };

  const currentImage = gallery ? gallery[currentImageIndex] : null;
  const displayImage = currentImage?.url || image;

  return (
    <div
      className={cn(
        "flex flex-col h-full border border-border rounded-xl overflow-hidden hover:ring-2 cursor-pointer hover:ring-muted transition-all duration-200 group/card",
        className
      )}
    >
      <div className="relative shrink-0">
         <Dialog open={isLightboxOpen} onOpenChange={setIsLightboxOpen}>
           <DialogTrigger asChild>
            <div className="block relative group/gallery cursor-pointer">
              {video ? (
                <video
                  src={video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-48 object-cover"
                />
              ) : displayImage ? (
                 <div className="relative w-full h-48 overflow-hidden">
                    <Image
                      src={displayImage}
                      alt={title}
                      width={500}
                      height={300}
                      className="w-full h-48 object-cover"
                      unoptimized
                    />
                    
                    {gallery && gallery.length > 1 && (
                      <>
                         <div className="absolute inset-0 flex items-center justify-between p-2 opacity-0 group-hover/gallery:opacity-100 transition-opacity pointer-events-none">
                            <button 
                              onClick={handlePrev}
                              className="p-1 rounded-full bg-black/50 text-white hover:bg-black/70 pointer-events-auto transition-colors focus:outline-none"
                            >
                               <ChevronLeft className="h-4 w-4" />
                            </button>
                            <button 
                              onClick={handleNext}
                              className="p-1 rounded-full bg-black/50 text-white hover:bg-black/70 pointer-events-auto transition-colors focus:outline-none"
                            >
                               <ChevronRight className="h-4 w-4" />
                            </button>
                         </div>
                         <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 pointer-events-none">
                            {gallery.map((_, idx) => (
                              <div 
                                key={idx}
                                className={cn(
                                  "w-1.5 h-1.5 rounded-full bg-white/50 transition-colors",
                                  idx === currentImageIndex && "bg-white"
                                )}
                              />
                            ))}
                         </div>
                      </>
                    )}
    
                    {currentImage?.label && (
                       <div className="absolute top-2 left-2 pointer-events-none">
                          <Badge variant="secondary" className="bg-black/60 text-white hover:bg-black/60 backdrop-blur-sm border-0 font-normal">
                             {currentImage.label}
                          </Badge>
                       </div>
                    )}
                 </div>
              ) : (
                <div className="w-full h-48 bg-muted" />
              )}
            </div>
           </DialogTrigger>
           <DialogContent className="max-w-fit w-fit p-0 bg-transparent border-none shadow-none">
             <DialogHeader className="sr-only">
               <DialogTitle>{title} Gallery</DialogTitle>
             </DialogHeader>
             <div className="relative flex items-center justify-center">
                {displayImage && (
                  <img 
                    src={displayImage} 
                    alt={currentImage?.label || title}
                    className="max-w-[90vw] max-h-[85vh] object-contain rounded-md"
                  />
                )}
                 
                 {gallery && gallery.length > 1 && (
                    <>
                      <button
                        onClick={handlePrev}
                        className="absolute -left-12 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors focus:outline-none backdrop-blur-sm"
                      >
                         <ChevronLeft className="h-8 w-8" />
                      </button>
                      <button
                        onClick={handleNext}
                        className="absolute -right-12 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors focus:outline-none backdrop-blur-sm"
                      >
                         <ChevronRight className="h-8 w-8" />
                      </button>
                      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
                        {gallery.map((_, idx) => (
                          <div
                            key={idx}
                            className={cn(
                              "w-2 h-2 rounded-full bg-white/50 transition-colors",
                              idx === currentImageIndex && "bg-white"
                            )}
                          />
                        ))}
                      </div>
                    </>
                 )}
    
                 {currentImage?.label && (
                   <div className="absolute bottom-4 left-1/2 -translate-x-1/2 translate-y-full pt-2">
                      <span className="text-white/90 text-sm font-medium drop-shadow-md">
                         {currentImage.label}
                      </span>
                   </div>
                 )}
             </div>
           </DialogContent>
         </Dialog>

        {links && links.length > 0 && (
          <div className="absolute top-2 right-2 flex flex-wrap gap-2 pointer-events-none">
            {links.map((link, idx) => (
              <Link
                href={link.href}
                key={idx}
                target="_blank"
                rel="noopener noreferrer"
                className="pointer-events-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <Badge
                  className="flex items-center gap-1.5 text-xs bg-black text-white hover:bg-black/90"
                  variant="default"
                >
                  {link.icon}
                  {link.type}
                </Badge>
              </Link>
            ))}
          </div>
        )}
      </div>
      <div className="p-6 flex flex-col gap-3 flex-1">
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-col gap-1">
            <h3 className="font-semibold line-clamp-1">{title}</h3>
            <time className="text-xs text-muted-foreground">{dates}</time>
          </div>
          <Link
            href={href || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
            aria-label={`Open ${title}`}
          >
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
        <div className="text-xs flex-1 prose max-w-full text-pretty font-sans leading-relaxed text-muted-foreground dark:prose-invert line-clamp-3">
          <Markdown>{description}</Markdown>
        </div>
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-auto">
            {tags.map((tag) => (
              <Badge
                key={tag}
                className="text-[11px] font-medium border border-border h-6 w-fit px-2"
                variant="outline"
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
