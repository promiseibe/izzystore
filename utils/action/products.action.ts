"use server";

import { ProductParams } from "@/shared.types";
import { createClient } from "../supabase/server";

// Fetch products from Supabase
export  async function fetchProduct():Promise<ProductParams[]> {
    const supabase = await createClient();
    
const { data: products, error } = await supabase
  .from('products')
  .select('*')

  if(error) {
    console.log(error)
     return []
  }

  console.log(products)

  return products

}

// Fetch product from Supabase by ID
export async function fetchProductById(id: string): Promise<ProductParams | null> {
  const supabase = await createClient();
  try {
const { data: product, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error(error);
    return null;
  }

  return product;
  } catch (error) {
    console.error(error);
    return null;
  }
  
}