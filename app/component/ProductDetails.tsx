"use client";

import { ProductParams } from "@/shared.types";
import Image from "next/image";
import { assets } from "@/public/assets/assets";
import Link from "next/link";

import toast from "react-hot-toast";
import { useState } from "react";
import { cartStore } from "../store/cart-store";


const ProductDetails = ({ product }: { product: ProductParams }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const limit = 150; // number of characters to show
  const isLong = product.description.length > limit;
  const shortText = product.description.slice(0, limit);

  const handleAddToCart = () => {
    cartStore.getState().addItem(product);
    toast.success("Product added to cart!");
  };

  // whatsapp payment method
  const handleWhatsApp = () => {
  const message = `Hello, I'm interested in this product:

Product: ${product.name}
Price: ${product.price}

Please I would like to know more about it.`;

  const whatsappUrl = `https://wa.me/2349029129268?text=${encodeURIComponent(
    message
  )}`;

  window.open(whatsappUrl, "_blank");
};
  return (
  <>
    <main className="bg-white text-gray-900">
      {/* Product Section */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 md:px-10 lg:px-16 lg:py-16">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-16">

          {/* ================= PRODUCT IMAGE ================= */}
          <div className="lg:sticky lg:top-24">
            <div className="group relative overflow-hidden rounded-3xl border border-gray-100 bg-gray-50 shadow-sm transition-shadow duration-300 hover:shadow-xl">

              {/* Small product badge */}
              <div className="absolute left-4 top-4 z-10 rounded-full bg-black px-3 py-1.5 text-xs font-semibold text-white shadow-md">
                Product
              </div>

              <Image
                src={product.image_url_array[0]}
                alt={product.name}
                width={1280}
                height={1280}
                priority
                className="
                  h-auto
                  max-h-[650px]
                  w-full
                  object-contain
                  bg-gray-50
                  p-3
                  sm:p-6
                  transition-transform
                  duration-500
                  ease-out
                  group-hover:scale-[1.025]
                "
              />

              {/* Bottom image indicator */}
              {product.image_url_array.length > 1 && (
                <div className="absolute bottom-4 right-4 rounded-full bg-black/80 px-3 py-1.5 text-xs font-medium text-white">
                  {product.image_url_array.length} photos
                </div>
              )}
            </div>
          </div>


          {/* ================= PRODUCT INFORMATION ================= */}
          <div className="flex flex-col">

            {/* Category */}
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-orange-500">
              {product.category.name}
            </p>

            {/* Product name */}
            <h1 className="
              text-2xl
              font-bold
              leading-tight
              text-gray-950
              sm:text-3xl
              lg:text-4xl
            ">
              {product.name}
            </h1>


            {/* Rating */}
            <div className="mt-4 flex items-center gap-3">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4].map((_, i) => (
                  <Image
                    key={i}
                    className="h-4 w-4"
                    src={assets.star_icon}
                    alt="star"
                    width={16}
                    height={16}
                  />
                ))}

                <Image
                  className="h-4 w-4"
                  src={assets.star_dull_icon}
                  alt="star"
                  width={16}
                  height={16}
                />
              </div>

              <span className="text-sm font-medium text-gray-500">
                4.5
              </span>

              <span className="h-1 w-1 rounded-full bg-gray-300" />

              <span className="text-sm text-gray-500">
                Customer rating
              </span>
            </div>


            {/* Description */}
            <div className="mt-6">
              <p className="
                text-sm
                leading-7
                text-gray-600
                sm:text-base
              ">
                {isExpanded || !isLong
                  ? product.description
                  : `${shortText}...`}

                {isLong && (
                  <button
                    type="button"
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="
                      ml-1
                      font-semibold
                      text-orange-500
                      transition-colors
                      duration-200
                      hover:text-orange-600
                    "
                  >
                    {isExpanded ? "Show less" : "Read more"}
                  </button>
                )}
              </p>
            </div>


            {/* ================= PRICE ================= */}
            <div className="mt-7 flex flex-wrap items-end gap-3">
              <span className="
                text-3xl
                font-bold
                tracking-tight
                text-black
                sm:text-4xl
              ">
                {process.env.NEXT_PUBLIC_CURRENCY}
                {Number(product.price).toLocaleString()}
              </span>

              {product.offer_price && (
                <span className="
                  pb-1
                  text-sm
                  text-gray-400
                  line-through
                  sm:text-base
                ">
                  {process.env.NEXT_PUBLIC_CURRENCY}
                  {Number(product.offer_price).toLocaleString()}
                </span>
              )}

              {product.discount > 0 && (
                <span className="
                  mb-1
                  rounded-full
                  bg-orange-50
                  px-3
                  py-1
                  text-xs
                  font-bold
                  text-orange-600
                ">
                  {product.discount}% OFF
                </span>
              )}
            </div>


            <div className="my-7 h-px bg-gray-100" />


            {/* ================= PRODUCT DETAILS ================= */}
            <div className="rounded-2xl border border-gray-100 bg-gray-50/70 p-5 sm:p-6">

              <h2 className="mb-4 text-sm font-bold uppercase tracking-wide text-gray-900">
                Product details
              </h2>

              <div className="space-y-3 text-sm">

                {/* Brand */}
                <div className="flex items-start justify-between gap-6 border-b border-gray-200 pb-3">
                  <span className="font-medium text-gray-500">
                    Brand
                  </span>

                  <span className="text-right font-semibold text-gray-800">
                    {product.brand || "No brand"}
                  </span>
                </div>


                {/* Colors */}
                {product.colors?.length > 0 && (
                  <div className="flex items-start justify-between gap-6 border-b border-gray-200 pb-3">
                    <span className="font-medium text-gray-500">
                      Colors
                    </span>

                    <div className="flex max-w-[65%] flex-wrap justify-end gap-2">
                      {product.colors.map((color, index) => (
                        <span
                          key={index}
                          className="
                            rounded-full
                            border
                            border-gray-200
                            bg-white
                            px-3
                            py-1
                            text-xs
                            font-medium
                            text-gray-700
                          "
                        >
                          {color}
                        </span>
                      ))}
                    </div>
                  </div>
                )}


                {/* Category */}
                <div className="flex items-start justify-between gap-6">
                  <span className="font-medium text-gray-500">
                    Category
                  </span>

                  <span className="text-right font-semibold text-gray-800">
                    {product.category.name}
                  </span>
                </div>

              </div>
            </div>


            {/* ================= PRODUCT COMMENT ================= */}
            {product.product_comment && (
              <div className="
                mt-4
                rounded-2xl
                border
                border-orange-100
                bg-orange-50
                p-4
                text-sm
                leading-6
                text-gray-700
              ">
                <span className="font-semibold text-orange-600">
                  Note:
                </span>{" "}
                {product.product_comment}
              </div>
            )}


            {/* ================= SIZES ================= */}
            {product.sizes?.length > 0 && (
              <div className="mt-6">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-sm font-bold text-gray-900">
                    Available sizes
                  </h3>

                  <span className="text-xs text-gray-400">
                    Select your preferred size
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size, index) => (
                    <button
                      key={index}
                      type="button"
                      className="
                        min-w-[48px]
                        rounded-xl
                        border
                        border-gray-200
                        bg-white
                        px-4
                        py-2.5
                        text-xs
                        font-semibold
                        text-gray-700
                        shadow-sm
                        transition-all
                        duration-200
                        hover:border-orange-400
                        hover:bg-orange-50
                        hover:text-orange-600
                        active:scale-95
                      "
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}


            {/* ================= ACTION BUTTONS ================= */}
            <div className="
              mt-8
              grid
              grid-cols-1
              gap-3
              sm:grid-cols-3
            ">

              {/* Add to cart */}
              <button
                type="button"
                onClick={handleAddToCart}
                className="
                  flex
                  min-h-[52px]
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-black
                  bg-white
                  px-4
                  py-3
                  text-sm
                  font-bold
                  text-black
                  transition-all
                  duration-200
                  hover:-translate-y-0.5
                  hover:bg-black
                  hover:text-white
                  active:translate-y-0
                "
              >
                Add to Cart
              </button>


              {/* Buy now */}
              <Link
                href={`/buy-now/${product.id}`}
                className="
                  flex
                  min-h-[52px]
                  items-center
                  justify-center
                  rounded-xl
                  bg-black
                  px-4
                  py-3
                  text-sm
                  font-bold
                  text-white
                  shadow-md
                  transition-all
                  duration-200
                  hover:-translate-y-0.5
                  hover:bg-orange-500
                  hover:shadow-lg
                  active:translate-y-0
                "
              >
                Buy Now
              </Link>


              {/* WhatsApp */}
              <button
                type="button"
                onClick={handleWhatsApp}
                className="
                  flex
                  min-h-[52px]
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-[#25D366]
                  px-4
                  py-3
                  text-sm
                  font-bold
                  text-white
                  shadow-md
                  transition-all
                  duration-200
                  hover:-translate-y-0.5
                  hover:bg-[#20bd5a]
                  hover:shadow-lg
                  active:translate-y-0
                "
              >
                <Image
                  src={assets.whatsapp_icon}
                  alt="WhatsApp"
                  width={19}
                  height={19}
                  className="h-5 w-5 object-contain"
                />

                <span>WhatsApp</span>
              </button>

            </div>


            {/* Small trust message */}
            <div className="
              mt-5
              flex
              items-center
              justify-center
              gap-2
              text-center
              text-xs
              text-gray-400
              sm:justify-start
            ">
              <span className="h-2 w-2 rounded-full bg-green-500" />
              you can also proceed with payment on whatsApp? Contact us on WhatsApp.
            </div>

          </div>
        </div>
      </section>


      {/* ================= EXTRA IMAGES ================= */}
      {product.image_url_array.length > 1 && (
        <section className="
          border-t
          border-gray-100
          bg-gray-50
          px-4
          py-10
          sm:px-6
          sm:py-14
          md:px-10
          lg:px-16
        ">

          <div className="mx-auto max-w-7xl">

            <div className="mb-6">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-500">
                Product gallery
              </p>

              <h2 className="mt-1 text-2xl font-bold text-black">
                More views
              </h2>
            </div>


            <div className="
              grid
              grid-cols-2
              gap-3
              sm:grid-cols-2
              md:grid-cols-3
              lg:grid-cols-4
            ">

              {product.image_url_array.slice(1).map(
                (eachImage, index) => (
                  <div
                    key={index}
                    className="
                      group
                      relative
                      overflow-hidden
                      rounded-2xl
                      border
                      border-gray-100
                      bg-white
                      shadow-sm
                      transition-shadow
                      duration-300
                      hover:shadow-lg
                    "
                  >
                    <Image
                      src={eachImage}
                      alt={`${product.name} image ${index + 2}`}
                      width={600}
                      height={600}
                      loading="lazy"
                      className="
                        aspect-square
                        w-full
                        object-cover
                        transition-transform
                        duration-500
                        ease-out
                        group-hover:scale-105
                      "
                    />

                    {/* Image number */}
                    <div className="
                      absolute
                      bottom-2
                      right-2
                      rounded-full
                      bg-black/75
                      px-2.5
                      py-1
                      text-[10px]
                      font-medium
                      text-white
                    ">
                      {index + 2}
                    </div>
                  </div>
                )
              )}

            </div>
          </div>

        </section>
      )}
    </main>
  </>
);
};

export default ProductDetails;