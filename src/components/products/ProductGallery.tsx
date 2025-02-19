"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";

type Props = {
  images: {
    url: string;
    alt: string | null;
  }[];
};

export default function ProductGallery({ images }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images!.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images!.length) % images!.length
    );
  };

  useEffect(() => {
    if (carouselRef.current && photoRef.current) {
      carouselRef.current.scrollTo({
        left: currentIndex * photoRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
  }, [currentIndex]);

  return (
    <div className="relative w-full h-[600px] md:h-screen">
      {/* Mobile and Desktop Carousel */}
      <div
        ref={carouselRef}
        className="flex w-full h-full overflow-x-auto snap-x snap-mandatory scrollbar-hide">
        {images.map((image, index) => (
          <div
            key={index}
            ref={photoRef}
            className="relative w-full max-w-4xl h-full flex-shrink-0 snap-start">
            <Image
              src={image.url}
              alt={image.alt || "Product image"}
              fill
              className="object-cover"
              sizes="100vw"
              priority={index === 0 || index === 1}
            />
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <div className="absolute left-2 bottom-2 flex gap-2 items-center">
        <button
          onClick={prevSlide}
          className="bg-white/70 backdrop-blur-sm shadow p-2 rounded-full transition-colors hover:bg-white hover:cursor-pointer">
          <ArrowLeft strokeWidth={1.5} />
        </button>
        <button
          onClick={nextSlide}
          className="bg-white/70 backdrop-blur-sm shadow p-2 rounded-full transition-colors hover:bg-white hover:cursor-pointer">
          <ArrowRight strokeWidth={1.5} />
        </button>
        {/* Image counter */}
        <div className=" bg-white/60 backdrop-blur-sm shadow px-2 py-1 rounded-full text-sm">
          {currentIndex + 1} / {images!.length}
        </div>
      </div>
    </div>
  );
}
