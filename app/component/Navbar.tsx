"use client";

import { assets } from "@/public/assets/assets";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import HamX from "./HamX";
import { useAppContext } from "../context/AppContext";
import { signOut } from "@/utils/action/userAuth.action";
import toast from "react-hot-toast";
import { createClient } from "@/utils/supabase/client";




export const Navbar =  () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const { session,setSession} = useAppContext();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<string | null>(null)

  // Modal open or close when user clicks on a page
  useEffect(() => {
  if (!isOpen) return;

  const closeMenu = () => setIsOpen(false);

  window.addEventListener("scroll", closeMenu);
  document.addEventListener("click", closeMenu);

  return () => {
    window.removeEventListener("scroll", closeMenu);
    document.removeEventListener("click", closeMenu);
  };
}, [isOpen]);

  // Checking if user is autenticated or not
useEffect(() => {

  const fetchData = async () => {
    const supabase = await createClient();
    
const {
  data: { user },
} = await supabase.auth.getUser();

if (!user) {
  console.log("User is not authenticated");
  return;
}

const { data, error } = await supabase
  .from("eldics_users")
  .select("role")
  .eq("id", user.id)
  .single();

if (error || !data) {
  console.log("User profile not found");
  return;
}

setUser(data.role);
  };

  fetchData()
 

}, [])

  const router = useRouter();

  const checkIn = () => {
    setUserOpen((prev) => !prev);
  };

  const handleSignOut = async () => {
    setLoading(true)
    await signOut();
    setSession(null);
    router.push("/");
    setLoading(false)
    toast.success(`${session?.user.user_metadata.full_name} you have successfully signout`)
  };
  return (
 <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#080808]/95 text-white shadow-2xl shadow-black/30 backdrop-blur-xl">

{/* Orange accent line */}

<div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-orange-500 to-transparent" />

<div className="relative flex items-center justify-between px-4 py-3 sm:px-6 md:px-16 lg:px-32">

{/* Logo */}
<Link
  href="/"
  className="shrink-0 transition-transform duration-300 hover:scale-[1.03]"
>
  <Image
    src={assets.logo}
    alt="Company logo"
    width={140}
    height={45}
    className="h-9 w-auto object-contain md:h-10"
  />
</Link>

{/* Desktop Navigation */}
<div className="hidden items-center gap-7 lg:gap-9 md:flex">

  {user === "admin" && (
    <Link
      href="/admin"
      className="group relative text-sm font-medium text-orange-400 transition"
    >
      Admin
      <span className="absolute -bottom-2 left-0 h-[2px] w-0 rounded-full bg-orange-500 transition-all duration-300 group-hover:w-full" />
    </Link>
  )}

  {[
    { name: "Home", href: "/" },
    { name: "Shop", href: "/all-products" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
  ].map((item) => (
    <Link
      key={item.href}
      href={item.href}
      className="group relative text-sm font-medium text-gray-300 transition-colors duration-300 hover:text-white"
    >
      {item.name}

      <span className="absolute -bottom-2 left-1/2 h-[2px] w-0 -translate-x-1/2 rounded-full bg-orange-500 transition-all duration-300 group-hover:w-full" />
    </Link>
  ))}

</div>

{/* Desktop Icons */}
<div className="hidden md:flex items-center gap-2">

  {/* Search */}
  <button
    className="
      flex h-10 w-10 items-center justify-center
      rounded-xl
      text-gray-300
      transition-all duration-300
      hover:bg-orange-500/10
      hover:text-orange-400
      hover:scale-105
    "
  >
    <Image
      src={assets.search_icon}
      alt="search"
      className="h-5 w-5"
    />
  </button>



  {/* Cart */}
  <Link
    href="/cart"
    className="
      flex h-10 w-10 items-center justify-center
      rounded-xl
      transition-all duration-300
      hover:bg-orange-500/10
      hover:scale-105
    "
  >
    <Image
      src={assets.cart_icon}
      alt="cart"
      className="h-5 w-5"
    />
  </Link>

  {/* User */}
  <button
    onClick={checkIn}
    className="
      flex h-10 w-10 items-center justify-center
      rounded-xl
      transition-all duration-300
      hover:bg-orange-500/10
      hover:scale-105
    "
  >
    <Image
      src={assets.user_icon}
      alt="user"
      className="h-5 w-5"
    />
  </button>

</div>

{/* Mobile */}
<div className="flex items-center gap-2 md:hidden">

  <button
    className="
      flex h-10 w-10 items-center justify-center
      rounded-xl
      transition-all
      hover:bg-orange-500/10
    "
  >
    <Image
      src={assets.search_icon}
      alt="search"
      className="h-5 w-5"
    />
  </button>

  <Link
    href="/cart"
    className="
      flex h-10 w-10 items-center justify-center
      rounded-xl
      transition-all
      hover:bg-orange-500/10
    "
  >
    <Image
      src={assets.cart_icon}
      alt="cart"
      className="h-5 w-5"
    />
  </Link>

  <button
    onClick={checkIn}
    className="
      flex h-10 w-10 items-center justify-center
      rounded-xl
      transition-all
      hover:bg-orange-500/10
    "
  >
    <Image
      src={assets.user_icon}
      alt="user"
      className="h-5 w-5"
    />
  </button>

  <HamX
    isOpen={isOpen}
    setIsOpen={setIsOpen}
  />

</div>

{/* User Dropdown */}
{userOpen && (
  <div
    className="
      absolute
      right-4
      top-[70px]
      z-50
      w-[350px]
      max-w-[90vw]
      overflow-hidden
      rounded-2xl
      border
      border-white/10
      bg-[#0d0d0d]/98
      p-5
      text-white
      shadow-2xl
      shadow-black/50
      backdrop-blur-2xl
    "
  >

    {/* Orange top accent */}
    <div className="absolute inset-x-0 top-0 h-[2px] bg-orange-500" />

    <div className="mb-5 flex items-center justify-center pt-1">

      {session ? (
        <div className="text-center">
          <p className="text-xs text-gray-500">
            Welcome back
          </p>

          <p className="mt-1 font-semibold text-white">
            {session?.user.user_metadata.full_name}
          </p>
        </div>
      ) : (
        <Link
          href="/login"
          onClick={() => setUserOpen(false)}
          className="
            rounded-xl
            bg-orange-500
            px-5
            py-2.5
            text-sm
            font-semibold
            text-white
            transition-all
            hover:bg-orange-600
            hover:shadow-lg
            hover:shadow-orange-500/20
          "
        >
          Sign In
        </Link>
      )}

    </div>

    {session && (
      <div className="flex flex-col gap-2 text-sm">

        <Link
          href="/profile"
          onClick={() => setUserOpen(false)}
          className="
            rounded-xl
            px-4
            py-3
            text-gray-300
            transition
            hover:bg-white/5
            hover:text-orange-400
          "
        >
          My Profile
        </Link>

        <Link
          href="/orders"
          onClick={() => setUserOpen(false)}
          className="
            rounded-xl
            px-4
            py-3
            text-gray-300
            transition
            hover:bg-white/5
            hover:text-orange-400
          "
        >
          My Orders
        </Link>

        <Link
          href="/reviews"
          onClick={() => setUserOpen(false)}
          className="
            rounded-xl
            px-4
            py-3
            text-gray-300
            transition
            hover:bg-white/5
            hover:text-orange-400
          "
        >
          My Reviews
        </Link>

        <div className="my-2 h-px bg-white/10" />

        <button
          onClick={handleSignOut}
          disabled={loading}
          className="
            flex
            items-center
            justify-center
            gap-2
            rounded-xl
            border
            border-red-500/20
            bg-red-500/10
            px-4
            py-3
            text-sm
            font-medium
            text-red-400
            transition-all
            hover:bg-red-500
            hover:text-white
          "
        >
          {loading ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              Signing Out...
            </>
          ) : (
            "Sign Out"
          )}
        </button>

      </div>
    )}

  </div>
)}

{/* Mobile Menu */}
{isOpen && (
  <div
    className="
      absolute
      right-0
      top-[64px]
      z-40
      h-[calc(100vh-64px)]
      w-[78%]
      border-l
      border-white/10
      bg-[#080808]/98
      text-white
      shadow-2xl
      backdrop-blur-2xl
      md:hidden
    "
  >

    {/* Orange accent */}
    <div className="absolute left-0 top-0 h-full w-[2px] bg-gradient-to-b from-orange-500 via-orange-400 to-transparent" />

    <div className="flex flex-col gap-2 px-6 pt-10">

      {[
        { name: "Home", href: "/" },
        { name: "Shop", href: "/all-products" },
        { name: "About Us", href: "/about" },
        { name: "Contact", href: "/contact" },
        
      ].map((item) => (
        <Link
          key={item.href}
          href={item.href}
          onClick={() => setIsOpen(false)}
          className="
            rounded-xl
            px-4
            py-4
            text-base
            font-medium
            text-gray-300
            transition-all
            duration-300
            hover:bg-orange-500/10
            hover:pl-6
            hover:text-orange-400
          "
        >
          {item.name}
        </Link>
      ))}

    </div>

  </div>
)}

</div>

</nav>
  );
};