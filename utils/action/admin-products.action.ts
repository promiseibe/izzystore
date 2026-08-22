"use server";

import { createClientServer } from "@/utils/supabase/server";
import { requireAdmin } from "../auth/admin";
import { revalidatePath } from "next/cache";
import { ProductParams } from "@/shared.types";



// Create Product
export async function createProduct(
  product: ProductParams
) {
  try {
    const supabase = await createClientServer();

    /*
     * Get the currently authenticated user.
     * Never accept author_id from the client.
     */
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return {
        success: false,
        error: "You must be logged in.",
      };
    }

    /*
     * Verify the user's role.
     */
    const { data: profile, error: profileError } =
      await supabase
        .from("eldics_users")
        .select("role")
        .eq("id", user.id)
        .single();

    if (profileError || !profile) {
      return {
        success: false,
        error: "User profile not found.",
      };
    }

    if (profile.role !== "admin") {
      return {
        success: false,
        error: "You are not authorized to create products.",
      };
    }

    /*
     * Product must have at least one image.
     */
    if (
      !product.image_url_array ||
      product.image_url_array.length === 0
    ) {
      return {
        success: false,
        error: "Please upload at least one product image.",
      };
    }

    /*
     * Validate important values on the server.
     */
    if (!product.name.trim()) {
      return {
        success: false,
        error: "Product name is required.",
      };
    }

    if (!product.category) {
      return {
        success: false,
        error: "Product category is required.",
      };
    }

    if (product.price < 0) {
      return {
        success: false,
        error: "Price cannot be negative.",
      };
    }

    if (product.quantity < 0) {
      return {
        success: false,
        error: "Quantity cannot be negative.",
      };
    }

    if (
      product.discount !== undefined &&
      (product.discount < 0 || product.discount > 100)
    ) {
      return {
        success: false,
        error: "Discount must be between 0 and 100.",
      };
    }

    /*
     * Insert product.
     */
   const { data, error } = await supabase
  .from("products")
  .insert({
    author_id: user.id,
    name: product.name.trim(),
    brand: product.brand?.trim() || null,
    category: product.category,
    price: product.price,
    offer_price: product.offer_price ?? null,
    discount: product.discount ?? 0,
    quantity: product.quantity,
    product_shipping_fee:
      product.product_shipping_fee ?? null,
    description:
      product.description?.trim() || null,
    location:
      product.location?.trim() || null,
    product_comment:
      product.product_comment?.trim() || null,
    sizes: product.sizes,
    colors: product.colors,
    stles: product.stles,
    image_url_array: product.image_url_array,
    video_url_array:
      product.videos_url_array ?? [],
  })
  .select()
  .single();

if (error) {
  console.error(
    "CREATE PRODUCT DATABASE ERROR:",
    error
  );

  return {
    success: false,
    error: error.message,
  };
}

revalidatePath("/");
revalidatePath("/admin/products");
revalidatePath("/all-products");

return {
  success: true,
  product: data,
};
  } catch (error) {
    console.error(
      "CREATE PRODUCT SERVER ERROR:",
      error
    );

    return {
      success: false,
      error: "Something went wrong while creating the product.",
    };
  }
}
export async function getProductCategories() {
  await requireAdmin();

  const supabase = await createClientServer();

  const { data, error } = await supabase
    .from("categories")
    .select("id, name")
    .order("name", {
      ascending: true,
    });

  if (error) {
    console.error("CATEGORY ERROR:", error);
    return [];
  }

  return data;
}

// Update admin
export async function updateProduct(
  productId: string,
  values: {
    name: string;
    brand: string;
    category: string;
    price: number;
    offer_price?: number;
    discount?: number;
    quantity: number;
    product_shipping_fee?: number;
    description: string;
    location: string;
    product_comment: string;
    sizes: string[];
    colors: string[];
    stles: string[];
    image_url_array: string[];
    video_url_array: string[];
  }
) {
  await requireAdmin();

  const supabase = await createClientServer();

  const { data, error } = await supabase
    .from("products")
    .update({
      name: values.name,
      brand: values.brand,
      category: values.category,
      price: values.price,
      offer_price: values.offer_price,
      discount: values.discount,
      quantity: values.quantity,
      product_shipping_fee:
        values.product_shipping_fee,
      description: values.description,
      location: values.location,
      product_comment: values.product_comment,
      sizes: values.sizes,
      colors: values.colors,

      stles: values.stles,

      image_url_array:
        values.image_url_array,

      video_url_array:
        values.video_url_array,

      updated_at: new Date().toISOString(),
    })
    .eq("id", productId)
    .select()
    .single();

  if (error) {
    console.error(
      "UPDATE PRODUCT ERROR:",
      error
    );

    return {
      success: false,
      error: error.message,
    };
  }

  return {
    success: true,
    data,
  };
}

// Delete


export async function deleteProduct(productId: string) {
  try {
    const supabase = await createClientServer();

    // 1. Get the product first
    const { data: product, error: fetchError } = await supabase
      .from("products")
      .select("id, image_url_array, video_url_array")
      .eq("id", productId)
      .single();

    if (fetchError || !product) {
      console.error("Fetch product before delete error:", fetchError);

      return {
        success: false,
        message: "Product not found.",
      };
    }

    console.log("PRODUCT FOUND:", product);

    // 2. Delete product from database
    const { data: deletedProduct, error: deleteError } = await supabase
      .from("products")
      .delete()
      .eq("id", productId)
      .select();

    console.log("DELETE PRODUCT RESULT:", {
      deletedProduct,
      deleteError,
    });

    if (deleteError) {
      console.error("Delete product error:", deleteError);

      return {
        success: false,
        message: deleteError.message,
      };
    }

    if (!deletedProduct || deletedProduct.length === 0) {
      return {
        success: false,
        message: "Product could not be deleted.",
      };
    }

    // 3. Extract image paths
    const imagePaths: string[] =
      product.image_url_array
        ?.map((url: string): string | null => {
          const marker =
            "/storage/v1/object/public/product-images/";

          const index = url.indexOf(marker);

          if (index === -1) {
            console.log("Invalid image URL:", url);
            return null;
          }

          return url.substring(index + marker.length);
        })
        .filter((path: string | null): path is string =>
          typeof path === "string" && path.length > 0,
        ) || [];

    console.log("IMAGE PATHS:", imagePaths);

    // 4. Delete images from Storage
    if (imagePaths.length > 0) {
      const { error: storageError } = await supabase.storage
        .from("product-images")
        .remove(imagePaths);

      if (storageError) {
        console.error("Storage deletion error:", storageError);

        // Product was already deleted, so don't report
        // the whole operation as a database failure.
      }
    }

    // 5. Revalidate admin products page
    revalidatePath("/admin/products");

    return {
      success: true,
      message: "Product deleted successfully.",
    };
  } catch (error) {
    console.error("DELETE PRODUCT UNEXPECTED ERROR:", error);

    return {
      success: false,
      message: "Something went wrong while deleting the product.",
    };
  }
}

// Get orders


export async function getAdminOrders() {
  try {
    await requireAdmin();

    const supabase = await createClientServer();

    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      console.error("GET ADMIN ORDERS ERROR:", error);

      return {
        success: false,
        error: error.message,
        orders: [],
      };
    }

    return {
      success: true,
      orders: data ?? [],
    };
  } catch (error) {
    console.error("GET ADMIN ORDERS SERVER ERROR:", error);

    return {
      success: false,
      error: "Something went wrong while fetching orders.",
      orders: [],
    };
  }
}

// update status


type OrderStatus =
  | "waiting"
  | "processing"
  | "shipped"
  | "delivered"
  | "completed"
  | "cancelled"
  | "returned"
  | "reviewed";

export async function updateOrderStatus(
  orderId: string,
  status: OrderStatus
) {
  try {
    await requireAdmin();

    const supabase = await createClientServer();

    const { error } = await supabase
      .from("orders")
      .update({
        status,
        updated_at: new Date().toISOString(),
      })
      .eq("id", orderId);

    if (error) {
      console.error(
        "UPDATE ORDER STATUS DATABASE ERROR:",
        error
      );

      return {
        success: false,
        error: error.message,
      };
    }

    revalidatePath("/admin/orders");
    revalidatePath(`/admin/orders/view/${orderId}`);

    return {
      success: true,
    };
  } catch (error) {
    console.error(
      "UPDATE ORDER STATUS SERVER ERROR:",
      error
    );

    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to update order status.",
    };
  }
}

