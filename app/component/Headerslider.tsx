"use client";

import React, { useState, useEffect } from "react";
import { assets } from "../../public/assets/assets";

import Image from "next/image";
const HeaderSlider = () => {
  const sliderData = [
    {
      id: 1,
      title: "Premium Hotel Amenities Crafted for Exceptional Guest Comfort",
      offer: "Enhance your hospitality standards with trusted quality",
      buttonText1: "Explore Collection",
      buttonText2: "View products",
      imgSrc: assets.Banner1,
    },
    {
      id: 2,
      title: "Luxury Toiletries Designed for Modern Hospitality Businesses",
      offer: "Bulk pricing available for hotels, resorts, and apartments",
      buttonText1: "Get Deals",
      buttonText2: "View Products",
      imgSrc: assets.Banner2,
    },
    {
      id: 3,
      title: "Reliable, Elegant & Affordable Hotel Essentials in One Place",
      offer: "Fast delivery and consistent supply you can depend on",
      buttonText1: "Order Today",
      buttonText2: "View products",
      imgSrc: assets.Banner3,
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderData.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [sliderData.length]);

  const handleSlideChange = (index: number) => {
    setCurrentSlide(index);
  };

  return (
  <div className="relative w-full overflow-hidden bg-black">

    {/* SLIDER */}
    <div
      className="flex transition-transform duration-500 ease-out"
      style={{
        transform: `translateX(-${currentSlide * 100}%)`,
      }}
    >
      {sliderData.map((slide, index) => (
        <div
          key={slide.id}
          className="
            relative
            min-w-full
            overflow-hidden
            bg-gradient-to-br
            from-black
            via-[#111111]
            to-orange-600
            px-5
            py-10
            text-white
            sm:px-8
            md:px-14
            md:py-14
            lg:px-20
            lg:py-16
          "
        >

          {/* SIMPLE ORANGE ACCENT */}
          <div
            className="
              absolute
              -right-20
              -top-20
              h-64
              w-64
              rounded-full
              bg-orange-500/10
            "
          />

          {/* CONTENT */}
          <div
            className="
              relative
              z-10
              mx-auto
              flex
              max-w-7xl
              flex-col-reverse
              items-center
              justify-between
              gap-10
              md:flex-row
            "
          >

            {/* TEXT */}
            <div
              className="
                w-full
                max-w-xl
                text-center
                md:text-left
              "
            >

              <p
                className="
                  mb-3
                  text-sm
                  font-semibold
                  uppercase
                  tracking-[0.2em]
                  text-orange-400
                "
              >
                New Collection
              </p>

              <h1
                className="
                  text-3xl
                  font-bold
                  leading-tight
                  tracking-tight
                  sm:text-4xl
                  md:text-5xl
                  md:leading-tight
                "
              >
                {slide.title}
              </h1>

              <div className="mt-6 md:mt-8">

                <button
                  className="
                    rounded-full
                    bg-orange-500
                    px-7
                    py-3
                    text-sm
                    font-semibold
                    text-white
                    shadow-md
                    shadow-orange-500/20
                    transition
                    duration-200
                    hover:bg-orange-400
                    active:scale-95
                    md:px-9
                    md:py-3.5
                  "
                >
                  {slide.buttonText1}
                </button>

              </div>

            </div>


            {/* IMAGE */}
            <div
              className="
                relative
                flex
                w-full
                flex-1
                items-center
                justify-center
              "
            >

              <div
                className="
                  relative
                  flex
                  items-center
                  justify-center
                "
              >

                {/* Small orange accent behind image */}
                <div
                  className="
                    absolute
                    h-40
                    w-40
                    rounded-full
                    bg-orange-500/10
                    sm:h-52
                    sm:w-52
                  "
                />

                <Image
                  src={slide.imgSrc}
                  alt={`Slide ${index + 1}`}
                  width={500}
                  height={500}
                  priority={index === 0}
                  className="
                    relative
                    z-10
                    w-48
                    rounded-2xl
                    object-contain
                    sm:w-60
                    md:w-72
                    lg:w-80
                  "
                />

              </div>

            </div>

          </div>

        </div>
      ))}
    </div>


    {/* DOT INDICATORS */}
    <div
      className="
        flex
        items-center
        justify-center
        gap-2
        bg-black
        py-4
      "
    >
      {sliderData.map((_, index) => (
        <button
          key={index}
          type="button"
          aria-label={`Go to slide ${index + 1}`}
          onClick={() => handleSlideChange(index)}
          className={`
            h-2
            rounded-full
            transition-all
            duration-300
            ${
              currentSlide === index
                ? "w-7 bg-orange-500"
                : "w-2 bg-white/30 hover:bg-white/60"
            }
          `}
        />
      ))}
    </div>

  </div>
);
};

export default HeaderSlider;
