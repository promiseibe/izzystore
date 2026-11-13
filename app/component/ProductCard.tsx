import { ProductParams } from "@/shared.types";
import Image from "next/image";
import Link from "next/link";

const ProductCard = ({ product }: { product: ProductParams }) => {
 return (
  <Link
    href={`/product/${product.id}`}
    className="
      group
      relative
      flex
      w-full
      flex-col
      overflow-hidden
      rounded-2xl
      border
      border-gray-100
      bg-white
      shadow-sm
      transition-transform
      duration-300
      ease-out
      hover:-translate-y-1
      hover:shadow-xl
      focus:outline-none
      focus-visible:ring-2
      focus-visible:ring-orange-500
      focus-visible:ring-offset-2
    "
  >
    {/* ================= IMAGE ================= */}
    <div
      className="
        relative
        w-full
        overflow-hidden
        bg-gray-50
      "
    >
      {/* Discount badge */}
     {(product.discount ?? 0) > 0 && (
        <span
          className="
            absolute
            left-3
            top-3
            z-10
            rounded-full
            bg-orange-500
            px-3
            py-1
            text-[10px]
            font-bold
            uppercase
            tracking-wide
            text-white
            shadow-sm
          "
        >
          -{product.discount}%
        </span>
      )}

      {/* Image */}
      <div className="flex h-[230px] items-center justify-center p-4 sm:h-[250px]">
        <Image
          src={product.image_url_array[0]}
          alt={product.name}
          width={500}
          height={500}
          loading="lazy"
          className="
            h-full
            w-full
            object-contain
            transition-transform
            duration-500
            ease-out
            group-hover:scale-105
          "
        />
      </div>

      {/* Image overlay */}
      <div
        className="
          pointer-events-none
          absolute
          inset-x-0
          bottom-0
          h-16
          bg-gradient-to-t
          from-black/10
          to-transparent
          opacity-0
          transition-opacity
          duration-300
          group-hover:opacity-100
        "
      />

      {/* View label */}
      <span
        className="
          absolute
          bottom-3
          left-1/2
          -translate-x-1/2
          translate-y-2
          rounded-full
          bg-black
          px-3
          py-1.5
          text-[10px]
          font-semibold
          text-white
          opacity-0
          transition-all
          duration-300
          group-hover:translate-y-0
          group-hover:opacity-100
        "
      >
        View product
      </span>
    </div>


    {/* ================= CONTENT ================= */}
    <div className="flex flex-1 flex-col p-4">

      {/* Category */}
      <p
        className="
          mb-1
          text-[10px]
          font-semibold
          uppercase
          tracking-[0.15em]
          text-orange-500
        "
      >
{product.category || "Product"}
      </p>


      {/* Product name */}
      <h3
        className="
          line-clamp-1
          text-sm
          font-bold
          text-gray-900
          transition-colors
          duration-200
          group-hover:text-orange-600
          sm:text-base
        "
      >
        {product.name}
      </h3>


      {/* Description */}
      <p
        className="
          mt-1.5
          line-clamp-2
          min-h-[32px]
          text-xs
          leading-5
          text-gray-500
        "
      >
        {product.description}
      </p>


      {/* Rating */}
      <div className="mt-3 flex items-center gap-1.5">
        <div className="flex items-center gap-0.5 text-xs">
          <span className="text-yellow-400">★</span>
          <span className="text-yellow-400">★</span>
          <span className="text-yellow-400">★</span>
          <span className="text-yellow-400">★</span>
          <span className="text-gray-300">★</span>
        </div>

        <span className="text-xs font-medium text-gray-500">
          4.5
        </span>
      </div>


      {/* Divider */}
      <div className="my-3 h-px bg-gray-100" />


      {/* Price + Button */}
      <div className="mt-auto flex items-center justify-between gap-3">

        {/* Price */}
        <div className="min-w-0">
          <p className="text-base font-bold text-gray-950 sm:text-lg">
            {process.env.NEXT_PUBLIC_CURRENCY}
            {Number(product.price).toLocaleString()}
          </p>

          {product.offer_price && (
            <p className="text-[10px] text-gray-400 line-through">
              {process.env.NEXT_PUBLIC_CURRENCY}
              {Number(product.offer_price).toLocaleString()}
            </p>
          )}
        </div>


        {/* Buy button */}
        <span
          className="
            hidden
            shrink-0
            rounded-xl
            bg-black
            px-4
            py-2.5
            text-xs
            font-bold
            text-white
            shadow-sm
            transition-all
            duration-200
            group-hover:bg-orange-500
            group-hover:shadow-md
            sm:inline-flex
            sm:items-center
            sm:justify-center
          "
        >
          Buy now
        </span>

      </div>
    </div>
  </Link>
);
};

export default ProductCard;