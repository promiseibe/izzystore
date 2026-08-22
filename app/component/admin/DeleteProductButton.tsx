"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteProduct } from "@/utils/action/admin-products.action";

const DeleteProductButton = ({
  productId,
}: {
  productId: string;
}) => {
  const router = useRouter();

  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product? This action cannot be undone."
    );

    if (!confirmed) return;

    setIsDeleting(true);

    const result = await deleteProduct(productId);

    if (result.success) {
      router.push("/admin/products");
      router.refresh();
      
    } else {
      alert(result.message);
      setIsDeleting(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={isDeleting}
      className="
        inline-flex
        items-center
        justify-center
        w-full
        sm:w-auto
        px-5
        py-3
        rounded-xl
        bg-red-500
        hover:bg-red-600
        disabled:bg-red-300
        text-white
        text-sm
        font-medium
        transition
      "
    >
      {isDeleting ? "Deleting..." : "Delete Product"}
    </button>
  );
};

export default DeleteProductButton;