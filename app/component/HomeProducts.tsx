"use client";
import { ProductParams } from "@/shared.types";
import ProductCard from "./ProductCard";
import ShoppingCategory from "./ShoppingCategory";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";

interface HomeProductsParams {
  products: ProductParams[];
}
const HomeProducts = ({ products }: HomeProductsParams) => {
  const sliderRef = useRef<HTMLDivElement>(null);

const slideLeft = () => {
  sliderRef.current?.scrollBy({
    left: -350,
    behavior: "smooth",
  });
};

const slideRight = () => {
  sliderRef.current?.scrollBy({
    left: 350,
    behavior: "smooth",
  });
};
 return (
  <div className="w-full bg-white">

    {/* ================= NEW ARRIVALS ================= */}
    <section className="w-full px-4 pt-10 sm:px-6 sm:pt-12 md:px-10 lg:px-16 xl:px-24">

      {/* Section heading */}
      <div className="mb-6 flex items-end justify-between gap-4">

        <div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-orange-500">
            Just In
          </p>

          <h2 className="
            text-2xl
            font-bold
            tracking-tight
            text-gray-950
            sm:text-3xl
          ">
            New Arrivals
          </h2>

          <div className="mt-2 h-1 w-10 rounded-full bg-orange-500" />
        </div>

        {/* Desktop hint */}
        <div className="hidden items-center gap-2 text-xs text-gray-400 sm:flex">
          <span>Explore products</span>
          <span className="h-1 w-1 rounded-full bg-orange-400" />
          <span>Swipe to view more</span>
        </div>

      </div>


      {/* ================= PRODUCT SLIDER ================= */}
      <div className="relative w-full">

        {/* LEFT BUTTON */}
        <button
          type="button"
          onClick={slideLeft}
          aria-label="Previous products"
          className="
            absolute
            left-1
            top-1/2
            z-20
            flex
            h-10
            w-10
            -translate-y-1/2
            items-center
            justify-center
            rounded-full
            border
            border-gray-200
            bg-white
            text-gray-800
            shadow-lg
            transition-all
            duration-200
            hover:border-orange-500
            hover:bg-orange-500
            hover:text-white
            hover:shadow-xl
            active:scale-95
            sm:left-2
            sm:h-11
            sm:w-11
          "
        >
          <ChevronLeft size={20} strokeWidth={2} />
        </button>


        {/* PRODUCTS */}
        <div
          ref={sliderRef}
          className="
            flex
            gap-4
            overflow-x-auto
            scroll-smooth
            snap-x
            snap-mandatory
            px-1
            pb-6
            scrollbar-hide
            sm:gap-5
          "
        >

          {products.map((product, index: number) => (
            <div
              key={index}
              className="
                min-w-0
                flex-shrink-0
                snap-start
                w-[82%]
                sm:w-[48%]
                md:w-[32%]
                lg:w-[30%]
                xl:w-[27%]
              "
            >
              <div className="
                h-full
                rounded-2xl
                transition-transform
                duration-300
                ease-out
                hover:-translate-y-1
              ">
                <ProductCard product={product} />
              </div>
            </div>
          ))}

        </div>


        {/* RIGHT BUTTON */}
        <button
          type="button"
          onClick={slideRight}
          aria-label="Next products"
          className="
            absolute
            right-1
            top-1/2
            z-20
            flex
            h-10
            w-10
            -translate-y-1/2
            items-center
            justify-center
            rounded-full
            border
            border-gray-200
            bg-white
            text-gray-800
            shadow-lg
            transition-all
            duration-200
            hover:border-orange-500
            hover:bg-orange-500
            hover:text-white
            hover:shadow-xl
            active:scale-95
            sm:right-2
            sm:h-11
            sm:w-11
          "
        >
          <ChevronRight size={20} strokeWidth={2} />
        </button>

      </div>


      {/* Bottom slider indicator */}
      <div className="mt-1 flex items-center justify-center gap-2">
        <span className="h-1.5 w-8 rounded-full bg-orange-500" />
        <span className="h-1.5 w-1.5 rounded-full bg-gray-200" />
        <span className="h-1.5 w-1.5 rounded-full bg-gray-200" />
      </div>

    </section>


    {/* ================= SHOPPING CATEGORIES ================= */}
    <section className="mt-12 border-t border-gray-100 bg-gray-50 px-4 py-10 sm:px-6 sm:py-12 md:px-10 lg:px-16 xl:px-24">

      <ShoppingCategory />

    </section>

  </div>
);
};

export default HomeProducts;