"use server";

import { createClientServer } from "@/utils/supabase/server";
import { requireAdmin } from "@/utils/auth/admin";

export async function getAdminStats() {
  await requireAdmin();

  const supabase = await createClientServer();

  // Total products
  const {
    count: productsCount,
    error: productsError,
  } = await supabase
    .from("products")
    .select("*", {
      count: "exact",
      head: true,
    });

  // Total orders
  const {
    count: ordersCount,
    error: ordersError,
  } = await supabase
    .from("orders")
    .select("*", {
      count: "exact",
      head: true,
    });

  // Total customers
  const {
    count: customersCount,
    error: customersError,
  } = await supabase
    .from("eldics_users")
    .select("*", {
      count: "exact",
      head: true,
    });

  // Get orders for revenue
  const {
    data: orders,
    error: revenueError,
  } = await supabase
    .from("orders")
    .select("amount_paid");

  if (productsError) {
    console.error("Products error:", productsError);
  }

  if (ordersError) {
    console.error("Orders error:", ordersError);
  }

  if (customersError) {
    console.error("Customers error:", customersError);
  }

  if (revenueError) {
    console.error("Revenue error:", revenueError);
  }

  // Calculate total revenue
  const totalRevenue =
    orders?.reduce(
      (total, order) =>
        total + Number(order.amount_paid || 0),
      0
    ) ?? 0;

  return {
    products: productsCount ?? 0,
    orders: ordersCount ?? 0,
    customers: customersCount ?? 0,
    revenue: totalRevenue,
  };
}