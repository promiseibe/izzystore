"use server";
import { redirect } from "next/navigation";
import { createClientServer } from "../supabase/server";
import { revalidatePath } from "next/cache";

  
export default async function MessagesPage(formData: {
    name: string;
    email: string;
    message: string;
  }) {
  const supabase = await createClientServer();
  const {data} = await supabase.auth.getUser();
  const userId = data.user?.id;
  if(!userId){
    console.log("User not authenticated-->>messageActions.ts");
    redirect("/login");
  }

  const {  error } = await supabase
    .from("messages")
    .insert([{
        name: formData.name,
        email: formData.email,
        message: formData.message,
        user_id: userId
    }])
    if (error) {
       console.error("Error sending message :", error);
       revalidatePath("/contact");
       return { success: false };
     }
   
     revalidatePath("/contact");
     return { success: true };

}