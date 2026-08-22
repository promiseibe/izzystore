"use server";

import { revalidatePath } from "next/cache";
import { createClientServer } from "../supabase/server";
import { createClient } from "../supabase/client";
import { emailValidation } from "../zodvalidation/form-validation";
export async function login(formData: FormData) {
  const supabase = await createClientServer();
  // check email
  const email = formData.get("email") as string;

  const emailValidations = emailValidation.safeParse({ email: email });
  if (!emailValidations.success) {
    console.log("Invalid email format");
    return;
  }

  const { error } = await supabase.auth.signInWithOtp({
    email: email,
    options: {
      shouldCreateUser: true,
    },
  });

  if (error) {
    console.log("Got errort signing in--->", error);
    revalidatePath("/");
    return { error: error.message };
  }

  revalidatePath("/");
}

export async function verifyToken(formData: FormData) {
  const supabase = await createClient();
  // check email
  const email = formData.get("email") as string;
  const token = formData.get("token") as string;

  const emailValidations = emailValidation.safeParse({ email: email });
  if (!emailValidations.success) {
    console.log("Invalid email format");
    return;
  }

  const {
    data: { session },
    error,
  } = await supabase.auth.verifyOtp({
    email: email,
    token: token.trim(),
    type: "email",
  });

  if (error) {
    console.log("Got errort verifying OTP--->", error);
    return { error: error.message, session: null };
  }
  console.log("User session:", session);
  revalidatePath("/");
  return { error: null, session };
}

export async function signOut() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.log("Error signing out:", error);
    return { error: error.message };
  }

  revalidatePath("/");
}
export async function getUserData() {
  const supabase = await createClientServer();
  const {data} = await supabase.from("eldics_users").select("*")
  return {success: true, data}
}