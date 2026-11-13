import { JSX } from "react";

export interface ProductParams {
  id: string;
  author_id: string;
  sizes: string[];
  colors: string[];
  stles: string[];
  brand: string;
  status: string;
  image_url_array: string[];
  video_url_array: string[];
  name: string;
category: {
  id: string;
  name: string;
};
  price: number;
  description: string;
  discount?: number;

  quantity: number;
  product_shipping_fee?: number;
  offer_price?: number;
  created_at: Date;
  updated_at: Date;
  location: string;
  product_comment: string;
}
export interface CreateProductParams {
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
export interface AddressParams {
  id: string;
  user_id: string;

  title: string | null;
  region: string | null;

  address: string | null;
  state: string | null;
  city: string | null;

  phone: string | null;
  country_code: string | null;
  flag: string | null;

  is_default: boolean;

  created_at: string; // ISO date string
}

export type OrderStatus =
  | "processing"
  | "completed"
  | "cancelled"
  | "shipped"
  | "delivered"
  | "returned"
  | "waiting"
  | "reviewed";

export interface Order {
  map(arg0: (order: any, index: any) => JSX.Element): import("react").ReactNode;
  id: string;

  user_id: string;
  user_email: string | null;

  product_name: string;
  product_category: string | null;

  amount_paid: number; // numeric(10,2) → number in TS

  quantity_bought: number;
  image_url: string;

  status: OrderStatus;

  size: string | null;
  color: string | null;

  region: string | null;
  state: string | null;
  city: string | null;
  address: string;

  phone: string;
  country_code: string | null;
  reference_paystack: string;
  created_at: string;
  updated_at: string;
}