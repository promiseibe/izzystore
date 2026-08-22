import Link from "next/link";
import { Plus, Search } from "lucide-react";
import { createClientServer } from "@/utils/supabase/server";
import Image from "next/image";
import toast from "react-hot-toast";
import ProductSearch from "@/app/component/admin/ProductSearch";

export default async function AdminProductsPage() {
  const supabase = await createClientServer();

  const {
    data: products,
    error,
  } = await supabase
    .from("products")
    .select("*")
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    toast.error("Error fetching products:");
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">

      {/* Header */}
      <div className="
        flex
        flex-col
        sm:flex-row
        sm:items-center
        sm:justify-between
        gap-4
        mb-8
      ">

        <div>
          <p className="text-sm text-gray-500">
            Store Management
          </p>

          <h1 className="
            text-2xl
            sm:text-3xl
            font-bold
            text-gray-900
            mt-1
          ">
            Products
          </h1>

          <p className="text-sm text-gray-500 mt-2">
            Manage your store products and inventory.
          </p>
        </div>

        <Link
          href="/admin/products/add"
          className="
            inline-flex
            items-center
            justify-center
            gap-2
            bg-orange-500
            hover:bg-orange-600
            text-white
            px-4
            py-3
            rounded-xl
            text-sm
            font-medium
            shadow-sm
            hover:shadow-md
            transition-all
            duration-200
          "
        >
          <Plus size={18} />
          Add Product
        </Link>

      </div>
      
  <ProductSearch products ={products || []}/>

    </div>
  );
}