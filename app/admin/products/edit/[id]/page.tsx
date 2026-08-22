import { fetchProductById } from "@/utils/action/product.action";
import { getProductCategories } from "@/utils/action/admin-products.action";
import EditProductForm from "@/app/component/admin/EditPageForm";

const EditProductPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const [product, categories] = await Promise.all([
    fetchProductById(id),
    getProductCategories(),
  ]);

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
    <EditProductForm
      product={product}
      categories={categories}
    />
  );
};

export default EditProductPage;