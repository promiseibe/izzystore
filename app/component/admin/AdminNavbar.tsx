"use client";

import Image from "next/image";
import { Menu } from "lucide-react";
import { assets } from "@/public/assets/assets";

export default function AdminNavbar({
  onMenuClick,
}: {
  onMenuClick: () => void;
}) {
  return (
    <header className="sticky top-0 z-40 h-16 border-b border-black/10 bg-[#080808] text-white">

      <div className="flex h-full items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Mobile menu */}
       <button
  type="button"
  onClick={onMenuClick}
  aria-label="Open admin menu"
  className="
    flex
    h-10
    w-10
    items-center
    justify-center
    rounded-xl
    border
    border-white/10
    text-gray-300
    transition-all
    duration-200
    hover:border-orange-500/40
    hover:bg-orange-500/10
    hover:text-orange-400
    active:scale-95
    lg:hidden
  "
>
  <Menu size={21} />
</button>
        {/* Desktop title */}
        <div className="hidden lg:block">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-orange-500">
            Admin Panel
          </p>

          <p className="mt-0.5 text-sm text-gray-400">
            Store Management
          </p>
        </div>

        {/* Mobile logo */}
        <div className="lg:hidden">
          <Image
            src={assets.logo}
            alt="Company logo"
            width={120}
            height={38}
            className="h-8 w-auto object-contain"
          />
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">

          <div className="hidden text-right sm:block">
            <p className="text-xs text-gray-400">
              Management
            </p>

            <p className="text-sm font-medium text-white">
              Admin
            </p>
          </div>

          <div className="
            flex h-9 w-9 items-center justify-center
            rounded-xl
            border border-orange-500/20
            bg-orange-500/10
            text-sm font-bold
            text-orange-400
          ">
            A
          </div>

        </div>

      </div>

    </header>
  );
}