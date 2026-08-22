import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import {assets} from "../../public/assets/assets"
const ShoppingCategory = () => {
return (
  <>
    <section className="relative overflow-hidden bg-white">
      
      {/* Small decorative accent */}
      <div
        aria-hidden="true"
        className="absolute right-0 top-0 h-40 w-40 rounded-full bg-orange-100/60"
      />

      <div className="
        relative
        mx-auto
        flex
        max-w-7xl
        flex-col
        items-center
        justify-between
        gap-10
        px-5
        py-12
        sm:px-8
        sm:py-16
        md:flex-row
        md:gap-12
        md:px-12
        lg:px-16
        lg:py-20
      ">

        {/* ================= TEXT ================= */}
        <div className="
          relative
          z-10
          flex-1
          text-center
          md:text-left
        ">

          {/* Small label */}
          <div className="
            mb-4
            inline-flex
            items-center
            gap-2
            rounded-full
            border
            border-orange-100
            bg-orange-50
            px-3
            py-1.5
            text-xs
            font-semibold
            uppercase
            tracking-wider
            text-orange-600
          ">
            <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
            Something special for you
          </div>


          {/* Heading */}
          <h1 className="
            max-w-2xl
            text-3xl
            font-bold
            leading-[1.1]
            tracking-tight
            text-gray-950
            sm:text-4xl
            md:text-4xl
            lg:text-5xl
            xl:text-6xl
          ">
            You deserve a little gift
            <span className="block text-orange-500">
              that says love.
            </span>
          </h1>


          {/* Description */}
          <p className="
            mx-auto
            mt-5
            max-w-xl
            text-sm
            leading-7
            text-gray-600
            sm:text-base
            md:mx-0
            lg:text-[15px]
          ">
            Because you deserve to feel good every day. Discover quality
            essentials designed to add a little more comfort, freshness,
            and joy to your daily routine. Treat yourself, or make someone
            special smile with something thoughtful.
          </p>


          {/* Button */}
          <div className="mt-7 flex justify-center md:justify-start">
            <Link
              href="/all-products"
              className="
                group
                inline-flex
                items-center
                justify-center
                gap-3
                rounded-xl
                bg-black
                px-7
                py-3.5
                text-sm
                font-semibold
                text-white
                shadow-lg
                shadow-black/10
                transition-all
                duration-200
                hover:-translate-y-0.5
                hover:bg-orange-500
                hover:shadow-xl
                hover:shadow-orange-500/20
                active:translate-y-0
                sm:px-9
              "
            >
              View all Products

              <span className="
                text-lg
                transition-transform
                duration-200
                group-hover:translate-x-1
              ">
                →
              </span>
            </Link>
          </div>


          {/* Small trust points */}
          <div className="
            mt-7
            flex
            flex-wrap
            justify-center
            gap-x-5
            gap-y-2
            text-xs
            text-gray-500
            md:justify-start
          ">
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
              Quality products
            </span>

            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
              Great value
            </span>

            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
              Shop with confidence
            </span>
          </div>

        </div>


        {/* ================= IMAGE ================= */}
        <div className="
          relative
          flex
          w-full
          flex-1
          items-center
          justify-center
          md:justify-end
        ">

          {/* Lightweight background shape */}
          <div
            aria-hidden="true"
            className="
              absolute
              h-56
              w-56
              rounded-full
              bg-orange-50
              sm:h-72
              sm:w-72
              md:h-80
              md:w-80
            "
          />

          {/* Image container */}
          <div className="
            relative
            z-10
            flex
            items-center
            justify-center
            rounded-[2rem]
            bg-gray-50
            p-4
            shadow-sm
            transition-transform
            duration-300
            hover:-translate-y-1
            sm:p-6
            md:p-7
          ">

            <Image
              src={assets.towel}
              alt="Quality towel"
              width={380}
              height={320}
              priority
              className="
                h-[210px]
                w-[260px]
                object-contain
                transition-transform
                duration-300
                ease-out
                hover:scale-[1.03]
                sm:h-[260px]
                sm:w-[320px]
                md:h-[300px]
                md:w-[380px]
              "
            />

          </div>

          {/* Floating accent */}
          <div
            aria-hidden="true"
            className="
              absolute
              -bottom-2
              right-2
              z-20
              hidden
              rounded-2xl
              bg-black
              px-4
              py-3
              text-xs
              font-semibold
              text-white
              shadow-lg
              sm:block
              md:right-4
            "
          >
            Made for everyday comfort
          </div>

        </div>

      </div>
    </section>
  </>
);
}

export default ShoppingCategory