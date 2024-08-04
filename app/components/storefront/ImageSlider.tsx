"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface iAppProps {
  images: string[];
}

export function ImageSlider({ images }: iAppProps) {
  const [mainImageIndex, setMainImageIndex] = useState(0);

  function handlePreviousClick() {
    setMainImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1,
    );
  }

  function handleNextClick() {
    setMainImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1,
    );
  }

  function handleImageClick(index: number) {
    setMainImageIndex(index);
  }

  return (
    <div className="grid items-start gap-6 md:gap-3">
      <div className="relative overflow-hidden rounded-lg">
        <Image
          width={600}
          height={600}
          src={images[mainImageIndex]}
          alt="Product image"
          className="h-full max-h-[600px] w-full max-w-[600px] border object-cover"
        />

        <div className="absolute inset-0 flex items-center justify-between px-4">
          <Button
            onClick={handlePreviousClick}
            variant="ghost"
            size="icon"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            onClick={handleNextClick}
            variant="ghost"
            size="icon"
            aria-label="Next image"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-start gap-4">
        {images.map((image, index) => (
          <div
            className={cn(
              "w-full max-w-24 cursor-pointer overflow-hidden rounded-lg border",
              index === mainImageIndex ? "border-primary" : "border-gray-200",
            )}
            key={index}
            onClick={() => handleImageClick(index)}
          >
            <Image
              src={image}
              alt="Product Image"
              width={100}
              height={100}
              className="h-[100px] w-[100px] object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
