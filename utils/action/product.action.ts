"use server";
import { ProductParams } from "@/shared.types";
import { createClientServer } from "../supabase/server";
import { redirect } from "next/navigation";

export async function fetchProducts(): Promise<ProductParams[]> {
  const supabase = await createClientServer();

 
  const { data: products, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(6);

  if (error) {
    console.log(error);
    return [];
  }

  return products;
}
export async function fetchProductsAll(search?: string): Promise<ProductParams[]> {
  const supabase = await createClientServer();

  let query = supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (search && search.trim()) {
    query = query.ilike(
      "name",
      `%${search.trim()}%`
    );
  }

  const { data: products, error } = await query;

  if (error) {
    console.error("Error fetching products:", error);
    return [];
  }

  return products ?? [];
}
export async function fetchProductById(id: string) {
  const supabase = await createClientServer();
  
 
    const { data: product, error } = await supabase
      .from("products")
      .select("*,category:categories!fk_category(name)")
      .eq("id", id)
      .single();

    if (error) {
      console.log(error);
      return null;
    }

    return product;
  }


export const GetProductCount = async () => {
  const supabase = await createClientServer();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile, error: profileError } = await supabase
    .from("eldics_users")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profileError || !profile || profile.role !== "admin") {
    redirect("/");
  }

  const { count: productCount } = await supabase.from("products").select("*", {
    count: "exact",
    head: true,
  });

  return productCount;
};

export async function getProductById(id: string) {
  const supabase = await createClientServer();



  const { data: product, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("GET PRODUCT ERROR:", error);

    return null;
  }

  return product;
}
