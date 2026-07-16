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
      buttonText1: "View products",
      buttonText2: "Explore Collection",
      imgSrc: assets.Banner1,
    },
    {
      id: 2,
      title: "Luxury Toiletries Designed for Modern Hospitality Businesses",
      offer: "Bulk pricing available for hotels, resorts, and apartments",
      buttonText1: "View Products",
      buttonText2: "Get Deals",
      imgSrc: assets.Banner2,
    },
    {
      id: 3,
      title: "Reliable, Elegant & Affordable Hotel Essentials in One Place",
      offer: "Fast delivery and consistent supply you can depend on",
      buttonText1: "View products",
      buttonText2: "Order Today",
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
    <div className="overflow-hidden top-12 rounded-4xl relative w-full ">
      <div
        className="flex transition-transform duration-700 ease-in-out "
        style={{
          transform: `translateX(-${currentSlide * 100}%)`,
        }}
      >
        {sliderData.map((slide, index) => (
          <div
            key={slide.id}
            className="flex flex-col-reverse md:flex-row items-center justify-between bg-black py-8 md:px-14 px-5  min-w-full text-white"
          >
            <div className="md:pl-8 mt-10 md:mt-0">
              <h1 className="max-w-lg md:text-[40px] md:leading-[48px] text-2xl font-semibold">
                {slide.title}
              </h1>
              <div className="flex items-center mt-4 md:mt-6 ">
                <button className="md:px-10 px-7 md:py-2.5 py-2 bg-[#c91313] rounded-full text-white font-medium">
                  {slide.buttonText1}
                </button>
              </div>
            </div>
            <div className="flex items-center flex-1 justify-center">
              <Image
                className="md:w-72 w-48 rounded-3xl"
                src={slide.imgSrc}
                alt={`Slide ${index + 1}`}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-2 mt-8">
        {sliderData.map((_, index) => (
          <div
            key={index}
            onClick={() => handleSlideChange(index)}
            className={`h-2 w-2 rounded-full cursor-pointer ${
              currentSlide === index ? "bg-[#043033]" : "bg-gray-500/30"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default HeaderSlider;
