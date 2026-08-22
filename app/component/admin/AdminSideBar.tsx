"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  X,
} from "lucide-react";
import { assets } from "@/public/assets/assets";

const navigation = [
  {
    name: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    name: "Products",
    href: "/admin/products",
    icon: Package,
  },
  {
    name: "Orders",
    href: "/admin/orders",
    icon: ShoppingBag,
  },
  {
    name: "Customers",
    href: "/admin/customers",
    icon: Users,
  },
];

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdminSidebar({
  isOpen,
  onClose,
}: AdminSidebarProps) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/admin") {
      return pathname === "/admin";
    }

    return pathname.startsWith(href);
  };

  return (
    <>
      {/* =========================
          MOBILE OVERLAY
      ========================== */}
      <div
        onClick={onClose}
        className={`
          fixed
          inset-0
          z-40
          bg-black/60
          backdrop-blur-[2px]
          transition-opacity
          duration-300
          lg:hidden

          ${
            isOpen
              ? "pointer-events-auto opacity-100"
              : "pointer-events-none opacity-0"
          }
        `}
      />

      {/* =========================
          SIDEBAR
      ========================== */}
      <aside
        className={`
          fixed
          left-0
          top-0
          z-50
          flex
          h-screen
          w-[270px]
          flex-col
          overflow-hidden
          bg-[#080808]
          text-white
          shadow-2xl
          shadow-black/40

          transform
          transition-transform
          duration-300
          ease-out

          lg:translate-x-0

          ${
            isOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >

        {/* =========================
            ORANGE ACCENT
        ========================== */}
        <div
          className="
            absolute
            left-0
            top-0
            h-full
            w-[2px]
            bg-gradient-to-b
            from-orange-500
            via-orange-500/40
            to-transparent
          "
        />

        {/* =========================
            HEADER / LOGO
        ========================== */}
        <div
          className="
            flex
            h-20
            shrink-0
            items-center
            justify-between
            border-b
            border-white/10
            px-6
          "
        >

          <Link
            href="/"
            onClick={onClose}
            className="
              shrink-0
              transition-transform
              duration-200
              hover:scale-[1.03]
            "
          >
            <Image
              src={assets.logo}
              alt="Company logo"
              width={140}
              height={45}
              className="h-9 w-auto object-contain"
              priority
            />
          </Link>

          {/* Mobile close button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close sidebar"
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-xl
              text-gray-400
              transition-all
              duration-200
              hover:bg-white/5
              hover:text-orange-400
              active:scale-95
              lg:hidden
            "
          >
            <X size={20} />
          </button>

        </div>

        {/* =========================
            NAVIGATION
        ========================== */}
        <nav className="flex-1 overflow-y-auto px-4 py-7">

          <p
            className="
              mb-4
              px-3
              text-[10px]
              font-semibold
              uppercase
              tracking-[0.22em]
              text-gray-500
            "
          >
            Management
          </p>

          <div className="space-y-2">

            {navigation.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={`
                    group
                    relative
                    flex
                    items-center
                    gap-3
                    overflow-hidden
                    rounded-xl
                    px-3
                    py-3
                    text-sm
                    font-medium

                    transition-all
                    duration-200

                    ${
                      active
                        ? `
                          bg-orange-500
                          text-white
                          shadow-lg
                          shadow-orange-500/20
                        `
                        : `
                          text-gray-400
                          hover:bg-white/[0.05]
                          hover:text-white
                        `
                    }
                  `}
                >

                  {/* Active indicator */}
                  {active && (
                    <span
                      className="
                        absolute
                        left-0
                        top-1/2
                        h-6
                        w-[3px]
                        -translate-y-1/2
                        rounded-r-full
                        bg-white
                      "
                    />
                  )}

                  <Icon
                    size={19}
                    strokeWidth={active ? 2.4 : 1.9}
                    className={`
                      shrink-0
                      transition-all
                      duration-200

                      ${
                        active
                          ? "text-white"
                          : "text-gray-500 group-hover:translate-x-0.5 group-hover:text-orange-400"
                      }
                    `}
                  />

                  <span>{item.name}</span>

                  {active && (
                    <span
                      className="
                        absolute
                        right-3
                        h-1.5
                        w-1.5
                        rounded-full
                        bg-white
                      "
                    />
                  )}

                </Link>
              );
            })}

          </div>

        </nav>

        {/* =========================
            BOTTOM SECTION
        ========================== */}
        <div
          className="
            shrink-0
            border-t
            border-white/10
            p-4
          "
        >
          <div
            className="
              rounded-xl
              border
              border-orange-500/10
              bg-orange-500/[0.04]
              px-4
              py-3
            "
          >
            <p className="text-xs font-medium text-gray-300">
              Admin Panel
            </p>

            <p className="mt-1 text-[11px] text-gray-600">
              Store management
            </p>
          </div>
        </div>

      </aside>
    </>
  );
}