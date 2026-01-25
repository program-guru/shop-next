import { useState, useEffect, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Product } from "../types/Product";

interface CarouselProps {
  products: Product[];
  autoSlideInterval: number;
}

export default function Carousel({
  products,
  autoSlideInterval = 3000,
}: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef<number | null>(null);

  // Handlers for navigation
  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % products.length);
  }, [products.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) =>
      prev === 0 ? products.length - 1 : prev - 1
    );
  }, [products.length]);

  // Auto-slide control
  const startAutoSlide = useCallback(() => {
    if (intervalRef.current !== null) return;

    intervalRef.current = setInterval(() => {
      nextSlide();
    }, autoSlideInterval);
  }, [autoSlideInterval, nextSlide]);

  const stopAutoSlide = useCallback(() => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  // Auto-slide Timer
  useEffect(() => {
    startAutoSlide();

    // Cleanup on unmount
    return stopAutoSlide;
  }, [startAutoSlide, stopAutoSlide]);

  // Don't render if no products
  if (!products || products.length === 0) return null;

  return (
    <div
      onMouseEnter={stopAutoSlide}
      onMouseLeave={startAutoSlide}
      className="relative w-full h-100 md:h-125 overflow-hidden rounded-2xl group"
    >
      {/* Background Image with fallback background color */}
      <div
        className="w-full h-full bg-center transition-all duration-700 ease-in-out"
        style={{
          backgroundImage: `url('${products[currentIndex].images[0]}')`,
          backgroundColor: "#899194", 
          backgroundSize: "auto", 
          backgroundRepeat: "no-repeat", 
          backgroundPosition: "center", 
        }}
      >
        {/* Dark Overlay for text readability */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
        <span className="bg-primary text-xs font-bold px-3 py-1 rounded-full mb-4 animate-fade-in">
          FEATURED
        </span>
        <h2 className="text-4xl md:text-6xl font-heading font-bold mb-4 drop-shadow-lg">
          {products[currentIndex].name}
        </h2>
        <p className="text-lg md:text-xl max-w-2xl text-gray-200 mb-8 line-clamp-2">
          {products[currentIndex].description}
        </p>
        <button className="bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-full font-semibold transition-transform hover:scale-105 active:scale-95">
          Shop Now - ${products[currentIndex].price}
        </button>
      </div>

      {/* Left Arrow */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-sm p-2 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
        aria-label="Previous Slide"
      >
        <ChevronLeft size={32} />
      </button>

      {/* Right Arrow */}
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-sm p-2 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
        aria-label="Next Slide"
      >
        <ChevronRight size={32} />
      </button>

      {/* Dots Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
        {products.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentIndex
                ? "bg-white w-8"
                : "bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
