"use client";

import { useState } from "react";
import { ProductParams } from "@/shared.types";
import { updateProduct } from "@/utils/action/admin-products.action";
import toast from "react-hot-toast";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

type Category = {
  id: string;
  name: string;
};
type ImageItem = {
  url: string;
  isNew: boolean;
  file?: File;
};
type Props = {
  product: ProductParams;
  categories: Category[];
};

const EditProductForm = ({
  product,
  categories,
}: Props) => {
  // --------------------------------
  // BASIC INFORMATION
  // --------------------------------

  const [productName, setProductName] = useState(
    product.name || ""
  );

  const [brand, setBrand] = useState(
    product.brand || ""
  );

  const [category, setCategory] = useState(
    product.category?.id || ""
  );

  const [location, setLocation] = useState(
    product.location || ""
  );

  // --------------------------------
  // PRICING & INVENTORY
  // --------------------------------

  const [price, setPrice] = useState(
    String(product.price ?? "")
  );

  const [offerPrice, setOfferPrice] = useState(
    product.offer_price !== null &&
    product.offer_price !== undefined
      ? String(product.offer_price)
      : ""
  );

  const [discount, setDiscount] = useState(
    String(product.discount ?? "")
  );

  const [quantity, setQuantity] = useState(
    String(product.quantity ?? "")
  );

  const [shippingFee, setShippingFee] = useState(
    product.product_shipping_fee !== null &&
    product.product_shipping_fee !== undefined
      ? String(product.product_shipping_fee)
      : ""
  );

  // --------------------------------
  // VARIANTS
  // --------------------------------

  const [sizes, setSizes] = useState<string[]>(
    product.sizes || []
  );

  const [colors, setColors] = useState<string[]>(
    product.colors || []
  );

  // IMPORTANT:
  // Your Supabase column is "stles"
  const [stles, setStles] = useState<string[]>(
    product.stles || []
  );

  const [sizeInput, setSizeInput] = useState("");

  const [colorInput, setColorInput] = useState("");

  const [stleInput, setStleInput] = useState("");

  // --------------------------------
  // DESCRIPTION
  // --------------------------------

  const [description, setDescription] = useState(
    product.description || ""
  );

  const [productComment, setProductComment] = useState(
    product.product_comment || ""
  );
const [images, setImages] = useState<ImageItem[]>(
  (product.image_url_array || []).map((url) => ({
    url,
    isNew: false,
  }))
);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  // --------------------------------
  // ADD VARIANTS
  // --------------------------------

  const addSize = () => {
    const value = sizeInput.trim();

    if (!value) return;

    if (sizes.includes(value)) return;

    setSizes((prev) => [...prev, value]);

    setSizeInput("");
  };

  const addColor = () => {
    const value = colorInput.trim();

    if (!value) return;

    if (colors.includes(value)) return;

    setColors((prev) => [...prev, value]);

    setColorInput("");
  };

  const addStle = () => {
    const value = stleInput.trim();

    if (!value) return;

    if (stles.includes(value)) return;

    setStles((prev) => [...prev, value]);

    setStleInput("");
  };

  // --------------------------------
  // REMOVE VARIANTS
  // --------------------------------

  const removeSize = (value: string) => {
    setSizes((prev) =>
      prev.filter((item) => item !== value)
    );
  };

  const removeColor = (value: string) => {
    setColors((prev) =>
      prev.filter((item) => item !== value)
    );
  };

  const removeStle = (value: string) => {
    setStles((prev) =>
      prev.filter((item) => item !== value)
    );
  };
const uploadNewImages = async () => {
  const supabase = await createClient();

  const newImages = images.filter(
    (image) => image.isNew && image.file
  );

  if (newImages.length === 0) {
    return [];
  }

  const uploadedUrls: string[] = [];

  const folder = crypto.randomUUID();

  for (const image of newImages) {
    const file = image.file!;

    const extension =
      file.name.split(".").pop()?.toLowerCase() || "webp";

    const fileName =
      `${crypto.randomUUID()}.${extension}`;

    const filePath =
      `products/${folder}/${fileName}`;

    const { error } = await supabase.storage
      .from("product-images")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      throw new Error(
        `Failed to upload ${file.name}: ${error.message}`
      );
    }

    const { data } = supabase.storage
      .from("product-images")
      .getPublicUrl(filePath);

    uploadedUrls.push(data.publicUrl);
  }

  return uploadedUrls;
};
const handleUpdateProduct = async () => {
  if (loading) return;

  try {
    setLoading(true);

    if (!productName.trim()) {
      toast.error("Product name is required.");
      return;
    }

    if (!category) {
      toast.error("Please select a category.");
      return;
    }

    if (!price || Number(price) < 0) {
      toast.error("Please enter a valid price.");
      return;
    }

    if (!quantity || Number(quantity) < 0) {
      toast.error("Please enter a valid quantity.");
      return;
    }

    if (images.length === 0) {
      toast.error("Product must have at least one image.");
      return;
    }

  // Existing images that the admin did NOT remove
// Images still remaining in the form
const existingUrls = images
  .filter((image) => !image.isNew)
  .map((image) => image.url);

// Original images that were stored in the database
const originalUrls =
  product.image_url_array || [];

// Images removed by the admin
const removedUrls = originalUrls.filter(
  (url) => !existingUrls.includes(url)
);

// Upload newly selected images
const newImageUrls =
  await uploadNewImages();

// Final images to save in the database
const finalImageUrls = [
  ...existingUrls,
  ...newImageUrls,
];

    const result = await updateProduct(product.id, {
      name: productName.trim(),

      brand: brand.trim(),

      category,

      price: Number(price),

      offer_price: offerPrice.trim()
        ? Number(offerPrice)
        : undefined,

      discount: discount.trim()
        ? Number(discount)
        : undefined,

      quantity: Number(quantity),

      product_shipping_fee: shippingFee.trim()
        ? Number(shippingFee)
        : undefined,

      description: description.trim(),

      location: location.trim(),

      product_comment: productComment.trim(),

      sizes,

      colors,

      // IMPORTANT
      // Your database column is "stles"
      stles: stles,

      image_url_array: finalImageUrls,

      video_url_array: [],
    });

 if (!result.success) {
  toast.error(
    result.error || "Failed to update product."
  );
  return;
}

// Delete images that were removed
await deleteRemovedImages(
  removedUrls
);

toast.success(
  "Product updated successfully!"
);
    router.push("/admin/products");
    router.refresh();

  } catch (error) {
    console.error("UPDATE PRODUCT ERROR:", error);

    toast.error(
      error instanceof Error
        ? error.message
        : "Something went wrong."
    );
  } finally {
    setLoading(false);
  }
};
const deleteRemovedImages = async (
  removedUrls: string[]
) => {
  if (removedUrls.length === 0) return;

  const supabase = await createClient();

  const marker =
    "/storage/v1/object/public/product-images/";

  const paths = removedUrls
    .map((url) => {
      const index = url.indexOf(marker);

      if (index === -1) {
        return null;
      }

      return url.slice(
        index + marker.length
      );
    })
    .filter(
      (path): path is string =>
        Boolean(path)
    );

  if (paths.length === 0) return;

  const { error } =
    await supabase.storage
      .from("product-images")
      .remove(paths);

  if (error) {
    throw new Error(
      `Failed to delete removed images: ${error.message}`
    );
  }
};
  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto space-y-6">

        {/* HEADER */}

        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Edit Product
          </h1>

          <p className="text-gray-500 mt-2">
            Update your product information.
          </p>
        </div>
{/* --------------------------------
    PRODUCT IMAGES
-------------------------------- */}

<section className="bg-white rounded-2xl p-6 shadow-sm">

  <div className="flex items-center justify-between mb-4">
    <div>
      <h2 className="text-lg font-semibold text-gray-900">
        Product Images
      </h2>

      <p className="text-sm text-gray-500 mt-1">
        Add new images or remove existing images.
      </p>
    </div>

    <span className="text-sm text-gray-400">
      {images.length}/8
    </span>
  </div>

  {/* Upload button */}

  <label
    htmlFor="edit-product-images"
    className="
      flex
      flex-col
      items-center
      justify-center
      w-full
      min-h-[160px]
      border-2
      border-dashed
      border-gray-200
      rounded-2xl
      cursor-pointer
      bg-gray-50
      hover:bg-orange-50
      hover:border-orange-300
      transition
    "
  >
    <div className="
      flex
      items-center
      justify-center
      w-12
      h-12
      rounded-xl
      bg-orange-100
      text-orange-500
      mb-3
    ">
      <span className="text-2xl">
        +
      </span>
    </div>

    <p className="text-sm font-semibold text-gray-700">
      Add product images
    </p>

    <p className="text-xs text-gray-400 mt-1">
      JPG, PNG, WEBP or AVIF · Maximum 5MB
    </p>

    <input
      id="edit-product-images"
      type="file"
      accept="image/jpeg,image/png,image/webp,image/avif"
      multiple
      disabled={images.length >= 8}
      className="hidden"
      onChange={(e) => {
        const files = Array.from(
          e.target.files ?? []
        );

        if (!files.length) return;

        const allowedTypes = [
          "image/jpeg",
          "image/png",
          "image/webp",
          "image/avif",
        ];

        for (const file of files) {
          if (!allowedTypes.includes(file.type)) {
            toast.error(
              `${file.name} is not a supported image format.`
            );
            return;
          }

          if (file.size > 5 * 1024 * 1024) {
            toast.error(
              `${file.name} is larger than 5MB.`
            );
            return;
          }
        }

        setImages((prev) => {
          const remaining = 8 - prev.length;

          const newImages: ImageItem[] = files
            .slice(0, remaining)
            .map((file) => ({
              file,
              url: URL.createObjectURL(file),
              isNew: true,
            }));

          if (files.length > remaining) {
            toast.error(
              "Maximum of 8 images allowed."
            );
          }

          return [...prev, ...newImages];
        });

        e.target.value = "";
      }}
    />
  </label>

  {/* Image previews */}

  {images.length > 0 && (
    <div className="
      grid
      grid-cols-2
      sm:grid-cols-3
      md:grid-cols-4
      gap-4
      mt-6
    ">
      {images.map((image, index) => (
        <div
          key={`${image.url}-${index}`}
          className="
            group
            relative
            aspect-square
            overflow-hidden
            rounded-xl
            bg-gray-100
          "
        >

          <Image
            src={image.url}
            alt={`${product.name} image ${index + 1}`}
            fill
            className="
              object-cover
              transition
              duration-300
              group-hover:scale-105
            "
            unoptimized
          />

          {/* Remove button */}

          <button
            type="button"
            onClick={() => {
              const imageToRemove = images[index];

              if (
                imageToRemove.isNew &&
                imageToRemove.url.startsWith("blob:")
              ) {
                URL.revokeObjectURL(
                  imageToRemove.url
                );
              }

              setImages((prev) =>
                prev.filter(
                  (_, imageIndex) =>
                    imageIndex !== index
                )
              );
            }}
            className="
              absolute
              top-2
              right-2
              w-8
              h-8
              rounded-full
              bg-black/70
              text-white
              flex
              items-center
              justify-center
              hover:bg-red-500
              transition
              z-10
            "
          >
            ×
          </button>

          {/* Image label */}

          <div className="
            absolute
            bottom-2
            left-2
            px-2
            py-1
            rounded-md
            bg-black/70
            text-white
            text-xs
          ">
            {index === 0
              ? "Main image"
              : `Image ${index + 1}`}
          </div>

        </div>
      ))}
    </div>
  )}

</section>


        {/* --------------------------------
            BASIC INFORMATION
        -------------------------------- */}

        <section className="bg-white rounded-2xl p-6 shadow-sm">

          <h2 className="text-xl font-semibold mb-6">
            Basic Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            {/* PRODUCT NAME */}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Name
              </label>

              <input
                type="text"
                value={productName}
                onChange={(e) =>
                  setProductName(e.target.value)
                }
                className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-orange-400"
              />
            </div>

            {/* BRAND */}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Brand
              </label>

              <input
                type="text"
                value={brand}
                onChange={(e) =>
                  setBrand(e.target.value)
                }
                className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-orange-400"
              />
            </div>

            {/* CATEGORY */}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>

              <select
                value={category}
                onChange={(e) =>
                  setCategory(e.target.value)
                }
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white outline-none focus:border-orange-400"
              >
                <option value="">
                  Select category
                </option>

                {categories.map((item) => (
                  <option
                    key={item.id}
                    value={item.id}
                  >
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

            {/* LOCATION */}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>

              <input
                type="text"
                value={location}
                onChange={(e) =>
                  setLocation(e.target.value)
                }
                className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-orange-400"
              />
            </div>

          </div>

        </section>

        {/* --------------------------------
            PRICING & INVENTORY
        -------------------------------- */}

        <section className="bg-white rounded-2xl p-6 shadow-sm">

          <h2 className="text-xl font-semibold mb-6">
            Pricing & Inventory
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

            {/* PRICE */}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price
              </label>

              <input
                type="number"
                min="0"
                value={price}
                onChange={(e) =>
                  setPrice(e.target.value)
                }
                className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-orange-400"
              />
            </div>

            {/* OFFER PRICE */}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Offer Price
              </label>

              <input
                type="number"
                min="0"
                value={offerPrice}
                onChange={(e) =>
                  setOfferPrice(e.target.value)
                }
                className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-orange-400"
              />
            </div>

            {/* DISCOUNT */}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Discount (%)
              </label>

              <input
                type="number"
                min="0"
                max="100"
                value={discount}
                onChange={(e) =>
                  setDiscount(e.target.value)
                }
                className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-orange-400"
              />
            </div>

            {/* QUANTITY */}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantity
              </label>

              <input
                type="number"
                min="0"
                value={quantity}
                onChange={(e) =>
                  setQuantity(e.target.value)
                }
                className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-orange-400"
              />
            </div>

            {/* SHIPPING */}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Shipping Fee
              </label>

              <input
                type="number"
                min="0"
                value={shippingFee}
                onChange={(e) =>
                  setShippingFee(e.target.value)
                }
                className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-orange-400"
              />
            </div>

          </div>

        </section>

        {/* --------------------------------
            VARIANTS
        -------------------------------- */}

        <section className="bg-white rounded-2xl p-6 shadow-sm">

          <h2 className="text-xl font-semibold mb-2">
            Product Variants
          </h2>

          <p className="text-sm text-gray-500 mb-6">
            Manage sizes, colors and stles.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* SIZES */}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sizes
              </label>

              <div className="flex gap-2">

                <input
                  type="text"
                  value={sizeInput}
                  onChange={(e) =>
                    setSizeInput(e.target.value)
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addSize();
                    }
                  }}
                  placeholder="e.g. Large"
                  className="flex-1 px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-orange-400"
                />

                <button
                  type="button"
                  onClick={addSize}
                  className="px-4 rounded-xl bg-orange-500 text-white"
                >
                  +
                </button>

              </div>

              <div className="flex flex-wrap gap-2 mt-3">

                {sizes.map((size) => (
                  <div
                    key={size}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-50 text-orange-700 text-sm"
                  >
                    {size}

                    <button
                      type="button"
                      onClick={() =>
                        removeSize(size)
                      }
                    >
                      ×
                    </button>
                  </div>
                ))}

              </div>
            </div>

            {/* COLORS */}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Colors
              </label>

              <div className="flex gap-2">

                <input
                  type="text"
                  value={colorInput}
                  onChange={(e) =>
                    setColorInput(e.target.value)
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addColor();
                    }
                  }}
                  placeholder="e.g. Black"
                  className="flex-1 px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-orange-400"
                />

                <button
                  type="button"
                  onClick={addColor}
                  className="px-4 rounded-xl bg-orange-500 text-white"
                >
                  +
                </button>

              </div>

              <div className="flex flex-wrap gap-2 mt-3">

                {colors.map((color) => (
                  <div
                    key={color}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-50 text-orange-700 text-sm"
                  >
                    {color}

                    <button
                      type="button"
                      onClick={() =>
                        removeColor(color)
                      }
                    >
                      ×
                    </button>
                  </div>
                ))}

              </div>
            </div>

            {/* STLES */}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Stles
              </label>

              <div className="flex gap-2">

                <input
                  type="text"
                  value={stleInput}
                  onChange={(e) =>
                    setStleInput(e.target.value)
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addStle();
                    }
                  }}
                  placeholder="e.g. Classic"
                  className="flex-1 px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-orange-400"
                />

                <button
                  type="button"
                  onClick={addStle}
                  className="px-4 rounded-xl bg-orange-500 text-white"
                >
                  +
                </button>

              </div>

              <div className="flex flex-wrap gap-2 mt-3">

                {stles.map((stle) => (
                  <div
                    key={stle}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-50 text-orange-700 text-sm"
                  >
                    {stle}

                    <button
                      type="button"
                      onClick={() =>
                        removeStle(stle)
                      }
                    >
                      ×
                    </button>
                  </div>
                ))}

              </div>
            </div>

          </div>

        </section>

        {/* --------------------------------
            DESCRIPTION
        -------------------------------- */}

        <section className="bg-white rounded-2xl p-6 shadow-sm">

          <h2 className="text-xl font-semibold mb-2">
            Description
          </h2>

          <p className="text-sm text-gray-500 mb-5">
            Update the product description and additional comment.
          </p>

          {/* DESCRIPTION */}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Description
            </label>

            <textarea
              rows={6}
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
              placeholder="Write a description for this product..."
              className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none resize-none focus:border-orange-400"
            />
          </div>

          {/* PRODUCT COMMENT */}

          <div className="mt-5">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Comment
            </label>

            <textarea
              rows={4}
              value={productComment}
              onChange={(e) =>
                setProductComment(e.target.value)
              }
              placeholder="Additional product comment..."
              className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none resize-none focus:border-orange-400"
            />
          </div>

        </section>
        <button
  type="button"
  onClick={handleUpdateProduct}
  disabled={loading}
  className="
    flex
    items-center
    justify-center
    gap-2
    px-6
    py-3
    rounded-xl
    bg-orange-500
    text-white
    text-sm
    font-semibold
    hover:bg-orange-600
    disabled:opacity-70
    disabled:cursor-not-allowed
  "
>
  {loading ? (
    <>
      <span
        className="
          w-4
          h-4
          border-2
          border-white
          border-t-transparent
          rounded-full
          animate-spin
        "
      />

      Updating Product...
    </>
  ) : (
    "Update Product"
  )}
</button>


      </div>
    </main>
  );
};

export default EditProductForm;