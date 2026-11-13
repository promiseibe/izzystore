import Image from "next/image";
import { fetchProductById } from "@/utils/action/product.action";
import DeleteProductButton from "@/app/component/admin/DeleteProductButton";
const ViewProductPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const product = await fetchProductById(id);
  console.log(product)

  if (!product) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-500">
          Product not found.
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">

      {/* Header */}
      <div className="mb-8">
        <p className="text-sm text-gray-500">
          Store Management
        </p>

        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1">
          Product Details
        </h1>

        <p className="text-sm text-gray-500 mt-2">
          View product information.
        </p>
      </div>

      {/* Product Card */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">

        {/* Images */}
        <div className="p-5 sm:p-6 border-b border-gray-100">

          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Product Images
          </h2>

         {/* Product Images */}
<div className="p-5 sm:p-6 border-b border-gray-100">

  <h2 className="text-lg font-semibold text-gray-900 mb-4">
    Product Images
  </h2>

  <div className="flex flex-wrap gap-4">

    {product.image_url_array?.map(
      (image: string, index: number) => (
        <div
          key={index}
          className="
            w-32
            h-32
            sm:w-40
            sm:h-40
            rounded-xl
            overflow-hidden
            border
            border-gray-200
            bg-gray-50
          "
        >
          <Image
            src={image}
            alt={`${product.name} ${index + 1}`}
            width={400}
            height={400}
            className="w-full h-full object-cover"
          />
        </div>
      )
    )}

  </div>

</div>
        </div>

        {/* Details */}
        <div className="p-5 sm:p-6">

          <h2 className="text-lg font-semibold text-gray-900 mb-6">
            Product Information
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

            {/* Name */}
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide">
                Product Name
              </p>

              <p className="mt-1 font-medium text-gray-900">
                {product.name}
              </p>
            </div>

            {/* Brand */}
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide">
                Brand
              </p>

              <p className="mt-1 font-medium text-gray-900">
                {product.brand || "No brand"}
              </p>
            </div>

            {/* Category */}
       
<div>
  <p className="text-xs text-gray-400 uppercase tracking-wide">
    Category
  </p>

  <p className="mt-1 font-medium text-gray-900">
    {typeof product.category === "object"
      ? product.category?.name
      : product.category || "No category"}
  </p>
</div>
            {/* Price */}
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide">
                Price
              </p>

              <p className="mt-1 font-semibold text-gray-900">
                {process.env.NEXT_PUBLIC_CURRENCY}
                {Number(product.price).toLocaleString()}
              </p>
            </div>

            {/* Discount */}
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide">
                Discount
              </p>

              <p className="mt-1 font-medium text-gray-900">
                {product.discount > 0
                  ? `${product.discount}%`
                  : "No discount"}
              </p>
            </div>

            {/* Quantity */}
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide">
                Stock
              </p>

              <p
                className={`mt-1 font-medium ${
                  product.quantity > 0
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {product.quantity > 0
                  ? `${product.quantity} in stock`
                  : "Out of stock"}
              </p>
            </div>

          </div>

          {/* Description */}
          {product.description && (
            <div className="mt-8">
              <p className="text-xs text-gray-400 uppercase tracking-wide">
                Description
              </p>

              <p className="mt-2 text-sm leading-7 text-gray-600 whitespace-pre-line">
                {product.description}
              </p>
            </div>
          )}

        </div>

        {/* Delete */}
        <div className="p-5 sm:p-6 border-t border-gray-100">

        <DeleteProductButton productId={product.id} />

        </div>

      </div>

    </div>
  );
};

export default ViewProductPage;