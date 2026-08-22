import AddProducts from "@/app/component/admin/AddProducts";
import { getProductCategories } from "@/utils/action/admin-products.action";

export default async function AddProductPage() {
  const categories = await getProductCategories();

  return (
    <AddProducts categories={categories} />
  );
}