"use client";

import { assets } from "@/public/assets/assets";
import { createClient } from "@/utils/supabase/client";
import Image from "next/image";

import Link from "next/link";

import { useState } from "react";
import toast from "react-hot-toast";


const LoginUser = () => {

  const [loading, setLoading] = useState(false);

  //  const { setSession } = useAppContext();

 const supabase = createClient()
   const handleLogin = async () => {
  setLoading(true);

  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${location.origin}/auth/callback`,
    },
  });

  if (error) {
    toast.error(error.message);
    setLoading(false);
    return;
  }

  toast.success("Redirecting to Google...");
};

  return  (
   <div className="min-h-screen bg-gradient-to-br from-[#012022] via-[#001111] to-orange-500 shadow-lg shadow-orange-500/30  flex items-center justify-center px-4">

  <section className="w-full max-w-md bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl shadow-2xl p-8 flex flex-col gap-6 text-white">

    {/* Small Header / Logo */}
    <Link href={"/"}>
      <h1 className="text-lg md:text-xl font-semibold text-center tracking-wide">
        Izzy All Hotel & Interior
      </h1>
    </Link>

    {/* Sub heading */}
    <p className="text-center text-sm text-gray-400">
      Continue with Google to get started
    </p>

    {/* Google Button */}
    <button
      onClick={handleLogin}
      disabled={loading}
      className={`flex items-center justify-center gap-3 px-4 py-3 mt-2 text-sm font-medium text-white border border-white/20 hover:bg-[#043033] rounded-lg transition-all duration-300 ${
        loading ? "opacity-70 cursor-not-allowed" : "hover:scale-[1.02]"
      }`}
    >
      {loading ? (
        <>
          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
          <span>Signing In...</span>
        </>
      ) : (
        <>
          <Image
            src={assets.google_icon}
            alt="Google"
            className="w-5 h-5"
          />
          <span>Sign in with Google</span>
        </>
      )}
    </button>

    {/* Footer note */}
    <div className="text-center text-xs text-gray-400">
      <p>We’ll create an account for you if you don’t have one.</p>
    </div>

  </section>
</div>
  );
};
export default LoginUser;