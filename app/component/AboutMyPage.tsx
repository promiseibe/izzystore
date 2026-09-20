"use client";

import Link from "next/link";

const AboutPage = () => {
  return (
    <main className="min-h-screen bg-[#fafafa] text-gray-900">

      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden bg-[#080808] text-white">
        <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-orange-500/20 blur-3xl" />
        <div className="absolute -bottom-32 -right-20 h-96 w-96 rounded-full bg-orange-500/10 blur-3xl" />

        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-orange-500 to-transparent" />

        <div className="relative mx-auto max-w-[1400px] px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-32">
          <div className="max-w-4xl">

            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-orange-400 sm:text-sm">
              About Our Company
            </p>

            <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              Quality Amenities
              <span className="block text-orange-500">
                For Hotels & Homes.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-sm leading-7 text-gray-400 sm:text-base sm:leading-8 md:text-lg">
              We provide quality hotel and home amenities designed to bring
              comfort, convenience and a better everyday experience to the
              places people live, stay and relax.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/all-products"
                className="rounded-xl bg-orange-500 px-6 py-3.5 text-center text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-orange-600 hover:shadow-xl hover:shadow-orange-500/20"
              >
                Explore Our Products
              </Link>

              <Link
                href="/contact"
                className="rounded-xl border border-white/10 bg-white/5 px-6 py-3.5 text-center text-sm font-semibold text-white transition-all duration-300 hover:bg-white/10"
              >
                Contact Us
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* ================= WHO WE ARE ================= */}
      <section className="mx-auto max-w-[1400px] px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">

        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">

          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-orange-500">
              Who We Are
            </p>

            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
              Making comfort easier to access.
            </h2>

            <div className="mt-6 space-y-4 text-sm leading-7 text-gray-600 sm:text-base">
              <p>
                Our company is built around a simple idea: quality everyday
                amenities should be easy to find, affordable and dependable.
              </p>

              <p>
                From hotels and hospitality businesses to everyday homes, we
                provide products that help create clean, comfortable and
                welcoming spaces.
              </p>

              <p>
                We are focused on building a reliable shopping experience
                where customers can discover useful products without
                unnecessary stress.
              </p>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-3xl bg-[#080808] p-7 text-white shadow-2xl sm:p-9">

            <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-orange-500/20 blur-3xl" />

            <div className="relative">

              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500/10 text-2xl">
                ✦
              </div>

              <h3 className="text-2xl font-bold">
                Comfort meets quality.
              </h3>

              <p className="mt-4 text-sm leading-7 text-gray-400">
                Whether you are preparing a hotel room for your next guest or
                upgrading your home, we are here to help you find the
                amenities you need.
              </p>

              <div className="mt-7 h-px bg-white/10" />

              <p className="mt-5 text-sm font-medium text-orange-400">
                Hotel • Home • Hospitality
              </p>

            </div>
          </div>

        </div>
      </section>

      {/* ================= WHAT WE OFFER ================= */}
      <section className="bg-white py-16 sm:py-20 lg:py-24">

        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">

          <div className="mx-auto max-w-2xl text-center">

            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-orange-500">
              What We Offer
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Built for Hotels. Made for Home.
            </h2>

            <p className="mt-4 text-sm leading-7 text-gray-500 sm:text-base">
              Our products are selected to serve both hospitality businesses
              and customers looking to improve their everyday spaces.
            </p>

          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2">

            {/* HOTEL */}
            <div className="group relative overflow-hidden rounded-3xl bg-[#080808] p-7 text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:p-9">

              <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-orange-500/10 blur-3xl transition duration-500 group-hover:bg-orange-500/20" />

              <div className="relative">

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500 text-2xl shadow-lg shadow-orange-500/20">
                  🏨
                </div>

                <p className="mt-7 text-xs font-semibold uppercase tracking-[0.2em] text-orange-400">
                  Hospitality
                </p>

                <h3 className="mt-2 text-2xl font-bold sm:text-3xl">
                  For Hotels & Businesses
                </h3>

                <p className="mt-4 text-sm leading-7 text-gray-400">
                  Equip your hospitality space with practical and quality
                  amenities that help create a comfortable experience for
                  your guests.
                </p>

                <ul className="mt-7 space-y-3 text-sm text-gray-300">

                  <li className="flex gap-3">
                    <span className="text-orange-500">✓</span>
                    Hotel towels and linens
                  </li>

                  <li className="flex gap-3">
                    <span className="text-orange-500">✓</span>
                    Guest-room essentials
                  </li>

                  <li className="flex gap-3">
                    <span className="text-orange-500">✓</span>
                    Bathroom amenities
                  </li>

                  <li className="flex gap-3">
                    <span className="text-orange-500">✓</span>
                    Bulk and business purchases
                  </li>

                </ul>

              </div>
            </div>

            {/* HOME */}
            <div className="group relative overflow-hidden rounded-3xl border border-gray-200 bg-gray-50 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-xl sm:p-9">

              <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-orange-500/5 blur-3xl transition duration-500 group-hover:bg-orange-500/10" />

              <div className="relative">

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-50 text-2xl">
                  🏠
                </div>

                <p className="mt-7 text-xs font-semibold uppercase tracking-[0.2em] text-orange-500">
                  Everyday Living
                </p>

                <h3 className="mt-2 text-2xl font-bold sm:text-3xl">
                  For Your Home
                </h3>

                <p className="mt-4 text-sm leading-7 text-gray-600">
                  Discover useful amenities and everyday essentials designed
                  to make your home more comfortable, practical and welcoming.
                </p>

                <ul className="mt-7 space-y-3 text-sm text-gray-700">

                  <li className="flex gap-3">
                    <span className="text-orange-500">✓</span>
                    Bath and home towels
                  </li>

                  <li className="flex gap-3">
                    <span className="text-orange-500">✓</span>
                    Home linens and essentials
                  </li>

                  <li className="flex gap-3">
                    <span className="text-orange-500">✓</span>
                    Bathroom accessories
                  </li>

                  <li className="flex gap-3">
                    <span className="text-orange-500">✓</span>
                    Everyday home amenities
                  </li>

                </ul>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= WHY CHOOSE US ================= */}
      <section className="bg-[#fafafa] py-16 sm:py-20 lg:py-24">

        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">

          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">

            <div>

              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-orange-500">
                Why Choose Us
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                Simple shopping.
                <span className="block text-orange-500">
                  Better spaces.
                </span>
              </h2>

              <p className="mt-5 text-sm leading-7 text-gray-500 sm:text-base">
                We focus on the things that matter most when buying everyday
                amenities: quality, convenience and reliability.
              </p>

            </div>

            <div className="grid gap-4 sm:grid-cols-2">

              {[
                {
                  icon: "✓",
                  title: "Quality Focus",
                  text: "We aim to provide products that deliver dependable everyday value.",
                },
                {
                  icon: "⚡",
                  title: "Easy Shopping",
                  text: "Browse, discover and order products through a simple online experience.",
                },
                {
                  icon: "◇",
                  title: "For Everyone",
                  text: "Our collection serves individual customers, homes and hospitality businesses.",
                },
                {
                  icon: "♥",
                  title: "Customer First",
                  text: "We want every customer to have a smooth and satisfying experience.",
                },
              ].map((item) => (

                <div
                  key={item.title}
                  className="rounded-2xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-lg"
                >

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-lg font-bold text-orange-500">
                    {item.icon}
                  </div>

                  <h3 className="mt-5 font-bold text-gray-900">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-gray-500">
                    {item.text}
                  </p>

                </div>

              ))}

            </div>

          </div>
        </div>
      </section>

      {/* ================= MISSION ================= */}
      <section className="bg-[#080808] py-16 text-white sm:py-20 lg:py-24">

        <div className="mx-auto max-w-4xl px-5 text-center sm:px-8">

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-orange-500/10 text-2xl text-orange-500">
            ✦
          </div>

          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.3em] text-orange-400">
            Our Mission
          </p>

          <h2 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
            Helping people create
            <span className="block text-orange-500">
              Happiness
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-gray-400 sm:text-base sm:leading-8">
            Our mission is to make quality hotel and home amenities more
            accessible while building a shopping experience customers can
            trust.
          </p>

        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="bg-white py-16 sm:py-20 lg:py-24">

        <div className="mx-auto max-w-[1100px] px-5 sm:px-8">

          <div className="relative overflow-hidden rounded-3xl bg-orange-500 px-6 py-12 text-center text-white shadow-2xl shadow-orange-500/20 sm:px-10 sm:py-16">

            <div className="absolute -left-20 -top-20 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -bottom-24 -right-20 h-64 w-64 rounded-full bg-black/10 blur-3xl" />

            <div className="relative">

              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-orange-100">
                Start Exploring
              </p>

              <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
                Find the amenities you need.
              </h2>

              <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-orange-50 sm:text-base">
                Whether you are shopping for your home or sourcing amenities
                for your business, explore our collection today.
              </p>

              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">

                <Link
                  href="/all-products"
                  className="rounded-xl bg-white px-7 py-3.5 text-sm font-bold text-orange-600 transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-50 hover:shadow-xl"
                >
                  Shop Now
                </Link>

                <Link
                  href="/contact"
                  className="rounded-xl border border-white/30 bg-white/10 px-7 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:bg-white/20"
                >
                  Talk To Us
                </Link>

              </div>

            </div>
          </div>

        </div>
      </section>

    </main>
  );
};

export default AboutPage;