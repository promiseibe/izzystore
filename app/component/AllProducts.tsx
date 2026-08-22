import { ProductParams } from "@/shared.types";
import ProductCard from "./ProductCard";

interface HomeProductsParams {
  products: ProductParams[];
}
const AllProducts = ({ products }: HomeProductsParams) => {
return (
  <main className="min-h-screen bg-[#fafafa]">

    {/* Products Header */}
    <section className="mx-auto w-full max-w-[1500px] px-4 pt-10 sm:px-6 sm:pt-12 lg:px-10 lg:pt-16">

      <div className="flex flex-col gap-3 border-b border-gray-200 pb-6 sm:flex-row sm:items-end sm:justify-between">

        <div>
          <p className="
            mb-2
            text-xs
            font-semibold
            uppercase
            tracking-[0.2em]
            text-orange-500
          ">
            Store
          </p>

          <h1 className="
            text-2xl
            font-bold
            tracking-tight
            text-black
            sm:text-3xl
            lg:text-4xl
          ">
            All Products
          </h1>

          <p className="
            mt-2
            max-w-xl
            text-sm
            leading-6
            text-gray-500
            sm:text-base
          ">
            Explore our collection and find something perfect for you.
          </p>
        </div>

        {/* Product count */}
        <div className="
          inline-flex
          w-fit
          items-center
          rounded-full
          border
          border-gray-200
          bg-white
          px-4
          py-2
          text-xs
          font-medium
          text-gray-600
          shadow-sm
        ">
          {products.length} {products.length === 1 ? "Product" : "Products"}
        </div>

      </div>
    </section>


    {/* Products Grid */}
    <section className="
      mx-auto
      w-full
      max-w-[1500px]
      px-4
      pb-16
      pt-6
      sm:px-6
      sm:pb-20
      sm:pt-8
      lg:px-10
    ">

      {products.length > 0 ? (
        <div className="
          grid
          w-full
          grid-cols-2
          gap-x-3
          gap-y-7
          sm:grid-cols-2
          sm:gap-x-5
          sm:gap-y-9
          md:grid-cols-3
          lg:grid-cols-4
          lg:gap-x-6
          lg:gap-y-10
          xl:grid-cols-4
          2xl:grid-cols-5
        ">

          {products.map((product, index: number) => (
            <div
              key={index}
              className="
                min-w-0
                transition-transform
                duration-300
                ease-out
                hover:-translate-y-1
              "
            >
              <ProductCard
                product={product}
              />
            </div>
          ))}

        </div>
      ) : (

        /* Empty state */
        <div className="
          flex
          min-h-[400px]
          flex-col
          items-center
          justify-center
          rounded-3xl
          border
          border-dashed
          border-gray-300
          bg-white
          px-6
          text-center
        ">

          <div className="
            flex
            h-16
            w-16
            items-center
            justify-center
            rounded-full
            bg-orange-50
            text-orange-500
          ">
            <span className="text-2xl">🛍️</span>
          </div>

          <h2 className="
            mt-5
            text-lg
            font-bold
            text-gray-900
          ">
            No products available
          </h2>

          <p className="
            mt-2
            max-w-sm
            text-sm
            leading-6
            text-gray-500
          ">
            We currently dont have any products to display.
            Please check back soon.
          </p>

        </div>

      )}

    </section>

  </main>
);
};

export default AllProducts;