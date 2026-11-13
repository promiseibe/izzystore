"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { Plus, X,ImagePlus } from "lucide-react";
import Image from "next/image";
import { createProduct } from "@/utils/action/admin-products.action";
import { createClient } from "@/utils/supabase/client";

type Category = {
  id: string;
  name: string;
};
type ImagePreview = {
  file: File;
  url: string;
};
type AddProductPageProps = {
  categories: Category[];
};

type VariantInputProps = {
  title: string;
  value: string;
  setValue: (value: string) => void;
  items: string[];
  addItem: () => void;
  removeItem: (item: string) => void;
  placeholder: string;
};

const VariantInput = ({
  title,
  value,
  setValue,
  items,
  addItem,
  removeItem,
  placeholder,
}: VariantInputProps) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {title}
      </label>

      <div className="flex gap-2">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addItem();
            }
          }}
          placeholder={placeholder}
          className="
            flex-1
            min-w-0
            px-4
            py-3
            rounded-xl
            border
            border-gray-200
            outline-none
            focus:border-orange-400
            focus:ring-2
            focus:ring-orange-100
            transition
          "
        />

        <button
          type="button"
          onClick={addItem}
          className="
            flex
            items-center
            justify-center
            w-12
            rounded-xl
            bg-orange-500
            text-white
            hover:bg-orange-600
            transition
            shadow-sm
          "
        >
          <Plus size={19} />
        </button>
      </div>

      {items.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {items.map((item) => (
            <div
              key={item}
              className="
                flex
                items-center
                gap-2
                px-3
                py-1.5
                rounded-full
                bg-orange-50
                text-orange-700
                text-sm
                border
                border-orange-100
              "
            >
              <span>{item}</span>

              <button
                type="button"
                onClick={() => removeItem(item)}
                className="
                  text-orange-500
                  hover:text-red-500
                  transition
                "
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default function AddProductPage({
  categories,
}: AddProductPageProps) {
  const router = useRouter();

  /* --------------------------------
     BASIC INFORMATION
  -------------------------------- */

  const [productName, setProductName] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");

  /* --------------------------------
     PRICING & INVENTORY
  -------------------------------- */

  const [price, setPrice] = useState("");
  const [offerPrice, setOfferPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shippingFee, setShippingFee] = useState("");

  /* --------------------------------
     VARIANTS
  -------------------------------- */

  const [sizes, setSizes] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [styles, setStyles] = useState<string[]>([]);

  const [sizeInput, setSizeInput] = useState("");
  const [colorInput, setColorInput] = useState("");
  const [styleInput, setStyleInput] = useState("");
const [selectedImages, setSelectedImages] =
  useState<ImagePreview[]>([]);
  /* --------------------------------
     DESCRIPTION
  -------------------------------- */

  const [description, setDescription] = useState("");
  const [productComment, setProductComment] = useState("");

  /* --------------------------------
     SUBMIT STATE
  -------------------------------- */

  const [loading, setLoading] = useState(false);

  /* --------------------------------
     VARIANT FUNCTIONS
  -------------------------------- */


  const addSize = () => {
    const value = sizeInput.trim();

    if (!value) return;

    if (sizes.includes(value)) {
      toast.error("This size has already been added.");
      return;
    }

    setSizes((prev) => [...prev, value]);
    setSizeInput("");
  };

  const addColor = () => {
    const value = colorInput.trim();

    if (!value) return;

    if (colors.includes(value)) {
      toast.error("This color has already been added.");
      return;
    }

    setColors((prev) => [...prev, value]);
    setColorInput("");
  };

  const addStyle = () => {
    const value = styleInput.trim();

    if (!value) return;

    if (styles.includes(value)) {
      toast.error("This style has already been added.");
      return;
    }

    setStyles((prev) => [...prev, value]);
    setStyleInput("");
  };
   const uploadProductImages = async () => {
    const supabase = await createClient();
  if (selectedImages.length === 0) {
    throw new Error(
      "Please upload at least one product image."
    );
  }

  const uploadedUrls: string[] = [];

  /*
   * Temporary folder identifier.
   * We will eventually use the created product ID
   * for an even cleaner structure.
   */
  const folder = crypto.randomUUID();

  for (const image of selectedImages) {
    const file = image.file;

    const fileExtension =
      file.name.split(".").pop()?.toLowerCase() || "webp";

    const fileName = `${crypto.randomUUID()}.${fileExtension}`;

    const filePath = `products/${folder}/${fileName}`;

   const { data, error } = await supabase.storage
  .from("product-images")
  .upload(filePath, file, {
    cacheControl: "3600",
    upsert: false,
  });

if (error) {
  console.error("SUPABASE STORAGE ERROR:", error);

  throw new Error(
    `Failed to upload ${file.name}: ${error.message}`
  );
}

console.log("UPLOAD SUCCESS:", data);

    const {
      data: publicUrlData,
    } = supabase.storage
      .from("product-images")
      .getPublicUrl(filePath);

    uploadedUrls.push(
      publicUrlData.publicUrl
    );
  }

  return uploadedUrls;
};
const handleImageSelect = (
  e: React.ChangeEvent<HTMLInputElement>
) => {
  

  const files = Array.from(e.target.files ?? []);

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

  setSelectedImages((prev) => {
    const remaining = 8 - prev.length;

    const newImages = files
      .slice(0, remaining)
      .map((file) => ({
        file,
        url: URL.createObjectURL(file),
      }));

    if (files.length > remaining) {
      toast.error("Maximum of 8 images allowed.");
    }

    return [...prev, ...newImages];
  });

  e.target.value = "";
};
const removeImage = (index: number) => {
  setSelectedImages((prev) => {
    const image = prev[index];

    if (image) {
      URL.revokeObjectURL(image.url);
    }

    return prev.filter(
      (_, imageIndex) => imageIndex !== index
    );
  });
};
  /* --------------------------------
     CREATE PRODUCT
  -------------------------------- */

const handleCreateProduct = async () => {
  if (loading) return;

  try {
    setLoading(true);

    /*
     * -----------------------------
     * VALIDATION
     * -----------------------------
     */

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

    if (selectedImages.length === 0) {
      toast.error(
        "Please upload at least one product image."
      );
      return;
    }

    /*
     * -----------------------------
     * UPLOAD IMAGES
     * -----------------------------
     */

    toast.loading("Uploading product images...", {
      id: "product-upload",
    });

    const imageUrls =
      await uploadProductImages();

    toast.success("Images uploaded!", {
      id: "product-upload",
    });

    /*
     * -----------------------------
     * CREATE PRODUCT
     * -----------------------------
     */

    const result = await createProduct({
      name: productName.trim(),

      brand: brand.trim(),

      category,

      price: Number(price),

      offer_price:
        offerPrice.trim()
          ? Number(offerPrice)
          : undefined,

      discount:
        discount.trim()
          ? Number(discount)
          : undefined,

      quantity: Number(quantity),

      product_shipping_fee:
        shippingFee.trim()
          ? Number(shippingFee)
          : undefined,

      description:
        description.trim(),

      location:
        location.trim(),

      product_comment:
        productComment.trim(),

      sizes,

      colors,

      stles: styles,
     image_url_array: imageUrls,

      video_url_array: [],
    });

    if (!result.success) {
      toast.error(result.error || "Something went wrong");
      return;
    }

    toast.success(
      "Product added successfully!"
    );

    router.push("/admin/products");

    router.refresh();

  } catch (error) {
    console.error(
      "ADD PRODUCT ERROR:",
      error
    );

    toast.error(
      error instanceof Error
        ? error.message
        : "Something went wrong."
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <main
      className="
        min-h-screen
        bg-gray-50
        px-4
        py-6
        sm:px-6
        lg:px-8
      "
    >
      <div className="max-w-6xl mx-auto">

        {/* --------------------------------
            HEADER
        -------------------------------- */}

        <div className="mb-8">

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

            <div>
              <p className="text-sm text-orange-500 font-semibold mb-1">
                Products
              </p>

              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Add New Product
              </h1>

              <p className="text-sm text-gray-500 mt-2">
                Create and publish a new product to your store.
              </p>
            </div>

            <Link
              href="/admin/products"
              className="
                inline-flex
                items-center
                justify-center
                px-5
                py-2.5
                rounded-xl
                border
                border-gray-200
                bg-white
                text-sm
                font-medium
                text-gray-700
                hover:bg-gray-50
                transition
              "
            >
              Cancel
            </Link>

          </div>

        </div>

        <div className="space-y-6">
{/* --------------------------------
    PRODUCT IMAGES
-------------------------------- */}

<section
  className="
    bg-white
    border
    border-gray-100
    rounded-2xl
    shadow-sm
    p-5
    sm:p-6
  "
>
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">

    <div>
      <h2 className="text-lg font-semibold text-gray-900">
        Product Images
      </h2>

      <p className="text-sm text-gray-500 mt-1">
        Upload clear images of your product.
      </p>
    </div>

    <span className="text-xs text-gray-400">
      {selectedImages.length}/8 images
    </span>

  </div>

  {/* Upload area */}

  <label
    htmlFor="product-images"
    className="
      relative
      flex
      flex-col
      items-center
      justify-center
      w-full
      min-h-[180px]
      border-2
      border-dashed
      border-gray-200
      rounded-2xl
      cursor-pointer
      bg-gray-50
      hover:bg-orange-50
      hover:border-orange-300
      transition-all
      duration-300
    "
  >

    <div
      className="
        flex
        items-center
        justify-center
        w-14
        h-14
        rounded-2xl
        bg-orange-100
        text-orange-500
        mb-4
      "
    >
      <ImagePlus size={26} />
    </div>

    <p className="text-sm font-semibold text-gray-700">
      Click to upload product images
    </p>

    <p className="text-xs text-gray-400 mt-2 text-center px-4">
      JPG, PNG, WEBP or AVIF · Maximum 5MB per image
    </p>

    <input
      id="product-images"
      type="file"
      accept="image/jpeg,image/png,image/webp,image/avif"
      multiple
      onChange={handleImageSelect}
      disabled={selectedImages.length >= 8}
      className="hidden"
    />

  </label>

  {/* Image previews */}

  {selectedImages.map((image, index) => (
  <div
    key={`${image.file.name}-${index}`}
    className="group relative aspect-square overflow-hidden rounded-xl bg-gray-100"
  >
    <Image
      src={image.url}
      alt={`Product preview ${index + 1}`}
      className="
        w-full
        h-full
        object-cover
        transition-transform
        duration-300
        group-hover:scale-105
      "
      width={100}
      height={100}
    />

    <button
      type="button"
      onClick={() => removeImage(index)}
      className="
        absolute
        top-2
        right-2
        flex
        items-center
        justify-center
        w-8
        h-8
        rounded-full
        bg-black/70
        text-white
        hover:bg-red-500
        transition
      "
    >
      <X size={16} />
    </button>

    <div
      className="
        absolute
        bottom-2
        left-2
        px-2
        py-1
        rounded-lg
        bg-black/70
        text-white
        text-xs
      "
    >
      {index === 0
        ? "Main image"
        : `Image ${index + 1}`}
    </div>
  </div>
))}

</section>
          {/* --------------------------------
              BASIC INFORMATION
          -------------------------------- */}

          <section
            className="
              bg-white
              border
              border-gray-100
              rounded-2xl
              shadow-sm
              p-5
              sm:p-6
            "
          >
            <h2 className="text-lg font-semibold text-gray-900">
              Basic Information
            </h2>

            <p className="text-sm text-gray-500 mt-1 mb-6">
              Enter the basic details about your product.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              {/* Product Name */}
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
                  placeholder="Enter product name"
                  className="
                    w-full
                    px-4
                    py-3
                    rounded-xl
                    border
                    border-gray-200
                    outline-none
                    focus:border-orange-400
                    focus:ring-2
                    focus:ring-orange-100
                    transition
                  "
                />
              </div>

              {/* Brand */}
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
                  placeholder="Enter brand"
                  className="
                    w-full
                    px-4
                    py-3
                    rounded-xl
                    border
                    border-gray-200
                    outline-none
                    focus:border-orange-400
                    focus:ring-2
                    focus:ring-orange-100
                    transition
                  "
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>

                <select
                  value={category}
                  onChange={(e) =>
                    setCategory(e.target.value)
                  }
                  className="
                    w-full
                    px-4
                    py-3
                    rounded-xl
                    border
                    border-gray-200
                    bg-white
                    outline-none
                    focus:border-orange-400
                    focus:ring-2
                    focus:ring-orange-100
                  "
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

              {/* Location */}
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
                  placeholder="Product location"
                  className="
                    w-full
                    px-4
                    py-3
                    rounded-xl
                    border
                    border-gray-200
                    outline-none
                    focus:border-orange-400
                    focus:ring-2
                    focus:ring-orange-100
                  "
                />
              </div>

            </div>
          </section>

          {/* --------------------------------
              PRICING
          -------------------------------- */}

          <section
            className="
              bg-white
              border
              border-gray-100
              rounded-2xl
              shadow-sm
              p-5
              sm:p-6
            "
          >
            <h2 className="text-lg font-semibold text-gray-900">
              Pricing & Inventory
            </h2>

            <p className="text-sm text-gray-500 mt-1 mb-6">
              Set the price, discount and available stock.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

              {/* Price */}
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
                  placeholder="0.00"
                  className="
                    w-full
                    px-4
                    py-3
                    rounded-xl
                    border
                    border-gray-200
                    outline-none
                    focus:border-orange-400
                    focus:ring-2
                    focus:ring-orange-100
                  "
                />
              </div>

              {/* Offer Price */}
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
                  placeholder="0.00"
                  className="
                    w-full
                    px-4
                    py-3
                    rounded-xl
                    border
                    border-gray-200
                    outline-none
                    focus:border-orange-400
                    focus:ring-2
                    focus:ring-orange-100
                  "
                />
              </div>

              {/* Discount */}
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
                  placeholder="0"
                  className="
                    w-full
                    px-4
                    py-3
                    rounded-xl
                    border
                    border-gray-200
                    outline-none
                    focus:border-orange-400
                    focus:ring-2
                    focus:ring-orange-100
                  "
                />
              </div>

              {/* Quantity */}
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
                  placeholder="0"
                  className="
                    w-full
                    px-4
                    py-3
                    rounded-xl
                    border
                    border-gray-200
                    outline-none
                    focus:border-orange-400
                    focus:ring-2
                    focus:ring-orange-100
                  "
                />
              </div>

              {/* Shipping */}
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
                  placeholder="0.00"
                  className="
                    w-full
                    px-4
                    py-3
                    rounded-xl
                    border
                    border-gray-200
                    outline-none
                    focus:border-orange-400
                    focus:ring-2
                    focus:ring-orange-100
                  "
                />
              </div>

            </div>
          </section>

          {/* --------------------------------
              VARIANTS
          -------------------------------- */}

          <section
            className="
              bg-white
              border
              border-gray-100
              rounded-2xl
              shadow-sm
              p-5
              sm:p-6
            "
          >
            <h2 className="text-lg font-semibold text-gray-900">
              Product Variants
            </h2>

            <p className="text-sm text-gray-500 mt-1 mb-6">
              Add available sizes, colors and styles.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

              <VariantInput
                title="Sizes"
                value={sizeInput}
                setValue={setSizeInput}
                items={sizes}
                addItem={addSize}
                removeItem={(item) =>
                  setSizes((prev) =>
                    prev.filter(
                      (size) => size !== item
                    )
                  )
                }
                placeholder="e.g. Large"
              />

              <VariantInput
                title="Colors"
                value={colorInput}
                setValue={setColorInput}
                items={colors}
                addItem={addColor}
                removeItem={(item) =>
                  setColors((prev) =>
                    prev.filter(
                      (color) => color !== item
                    )
                  )
                }
                placeholder="e.g. Black"
              />

              <VariantInput
                title="Styles"
                value={styleInput}
                setValue={setStyleInput}
                items={styles}
                addItem={addStyle}
                removeItem={(item) =>
                  setStyles((prev) =>
                    prev.filter(
                      (style) => style !== item
                    )
                  )
                }
                placeholder="e.g. Classic"
              />

            </div>
          </section>

          {/* --------------------------------
              DESCRIPTION
          -------------------------------- */}

          <section
            className="
              bg-white
              border
              border-gray-100
              rounded-2xl
              shadow-sm
              p-5
              sm:p-6
            "
          >
            <h2 className="text-lg font-semibold text-gray-900">
              Description
            </h2>

            <textarea
              rows={6}
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
              placeholder="Write a description for this product..."
              className="
                mt-4
                w-full
                px-4
                py-3
                rounded-xl
                border
                border-gray-200
                outline-none
                resize-none
                focus:border-orange-400
                focus:ring-2
                focus:ring-orange-100
              "
            />

            <textarea
              rows={4}
              value={productComment}
              onChange={(e) =>
                setProductComment(e.target.value)
              }
              placeholder="Additional product comment..."
              className="
                mt-4
                w-full
                px-4
                py-3
                rounded-xl
                border
                border-gray-200
                outline-none
                resize-none
                focus:border-orange-400
                focus:ring-2
                focus:ring-orange-100
              "
            />
          </section>

          {/* --------------------------------
              ACTIONS
          -------------------------------- */}

          <div
            className="
              flex
              flex-col-reverse
              sm:flex-row
              justify-end
              gap-3
              pb-8
            "
          >
            <Link
              href="/admin/products"
              className="
                px-6
                py-3
                rounded-xl
                border
                border-gray-200
                text-sm
                font-medium
                text-gray-700
                text-center
                hover:bg-gray-50
                transition
              "
            >
              Cancel
            </Link>

            <button
              type="button"
              onClick={handleCreateProduct}
              disabled={loading}
              className={`
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
                shadow-sm
                transition-all
                duration-200
                ${
                  loading
                    ? "opacity-70 cursor-not-allowed"
                    : "hover:bg-orange-600 hover:shadow-md active:scale-[0.98]"
                }
              `}
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

                  Adding Product...
                </>
              ) : (
                "Add Product"
              )}
            </button>
          </div>

        </div>
      </div>
    </main>
  );
}