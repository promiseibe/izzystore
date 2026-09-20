import { fetchProductsAll } from "@/utils/action/product.action";
import AllProducts from "../component/AllProducts";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{
    search?: string;
  }>;
}) {
  const params = await searchParams;

  const search = params.search || "";

  const products = await fetchProductsAll(search);

  return (
    <AllProducts products={products} />
  );
}