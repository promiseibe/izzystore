"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

type Product = {
id: string;
name: string;
brand: string | null;
category: string | null;
price: number;
discount: number;
quantity: number;
image_url_array: string[] | null;
};

type Props = {
products: Product[];
};

export default function ProductSearch({
products,
}: Props) {
const [search, setSearch] = useState("");

const filteredProducts = products.filter((product) => {
const searchTerm = search.toLowerCase().trim();

if (!searchTerm) return true;

return (
  product.name?.toLowerCase().includes(searchTerm) ||
  product.brand?.toLowerCase().includes(searchTerm) ||
  product.category?.toLowerCase().includes(searchTerm)
);

});

return (
<>
{/* Search */}
<div className=" bg-white border border-gray-100 rounded-2xl p-4 mb-6 shadow-sm " >
<div className=" relative w-full max-w-md " >
<input
type="text"
value={search}
onChange={(e) => setSearch(e.target.value)}
placeholder="Search products..."
className="
w-full
pl-4
pr-4
py-3
rounded-xl
border
border-gray-200
outline-none
text-sm
focus
focus
focus
transition
"
/>
</div>
</div>

  {/* Products */}
  <div
    className="
      bg-white
      rounded-2xl
      border
      border-gray-100
      shadow-sm
      overflow-hidden
    "
  >
    {/* Desktop header */}
    <div
      className="
        hidden
        md:grid
        grid-cols-[2fr_1fr_1fr_1fr_120px]
        gap-4
        px-6
        py-4
        border-b
        border-gray-100
        text-xs
        font-semibold
        uppercase
        tracking-wide
        text-gray-400
      "
    >
      <span>Product</span>
      <span>Category</span>
      <span>Price</span>
      <span>Stock</span>
      <span>Action</span>
    </div>

    {filteredProducts.length > 0 ? (
      filteredProducts.map((product) => (
        <div
          key={product.id}
          className="
            flex
            flex-col
            md:grid
            md:grid-cols-[2fr_1fr_1fr_1fr_120px]
            gap-4
            md:items-center
            px-5
            sm:px-6
            py-5
            border-b
            border-gray-100
            last:border-b-0
            hover:bg-gray-50
            transition
          "
        >
          {/* Product */}
          <div className="flex items-center gap-4">
            <div
              className="
                w-16
                h-16
                rounded-xl
                bg-gray-50
                border
                border-gray-100
                overflow-hidden
                flex-shrink-0
              "
            >
              {product.image_url_array?.[0] && (
                <Image
                  src={product.image_url_array[0]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  width={100}
                  height={100}
                />
              )}
            </div>

            <div className="min-w-0">
              <h3
                className="
                  font-semibold
                  text-gray-900
                  truncate
                "
              >
                {product.name}
              </h3>

              <p
                className="
                  text-xs
                  text-gray-400
                  mt-1
                "
              >
                {product.brand || "No brand"}
              </p>
            </div>
          </div>

          {/* Category */}
          <div className="text-sm text-gray-600">
            {product.category || "No category"}
          </div>

          {/* Price */}
          <div>
            <p className="font-semibold text-gray-900">
              {process.env.NEXT_PUBLIC_CURRENCY}
              {Number(product.price).toLocaleString()}
            </p>

            {product.discount > 0 && (
              <p className="text-xs text-orange-500 mt-1">
                {product.discount}% discount
              </p>
            )}
          </div>

          {/* Stock */}
          <div>
            <span
              className={`
                inline-flex
                px-3
                py-1
                rounded-full
                text-xs
                font-medium
                ${
                  product.quantity > 0
                    ? "bg-green-50 text-green-600"
                    : "bg-red-50 text-red-600"
                }
              `}
            >
              {product.quantity > 0
                ? `${product.quantity} in stock`
                : "Out of stock"}
            </span>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Link
              href={`/admin/products/view/${product.id}`}
              className="
                px-3
                py-2
                rounded-lg
                bg-gray-100
                hover:bg-gray-200
                text-xs
                font-medium
                text-gray-700
                transition
              "
            >
              View
            </Link>

            <Link
              href={`/admin/products/edit/${product.id}`}
              className="
                px-3
                py-2
                rounded-lg
                bg-orange-50
                hover:bg-orange-100
                text-xs
                font-medium
                text-orange-600
                transition
              "
            >
              Edit
            </Link>
          </div>
        </div>
      ))
    ) : (
      <div className="py-16 text-center">
        <p className="text-gray-500">
          {search
            ? `No products found for "${search}".`
            : "No products found."}
        </p>
      </div>
    )}
  </div>
</>

);
}