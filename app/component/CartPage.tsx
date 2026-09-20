"use client";

import { assets } from "@/public/assets/assets";
import { AddressParams } from "@/shared.types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import toast from "react-hot-toast";
import { useAppContext } from "../context/AppContext";
import { cartStore } from "../store/cart-store";
import Link from "next/link";

const CartPage = ({ addresses }: { addresses: AddressParams[] }) => {
  const router = useRouter();
  const { items, decreaseQty, increaseQty } = cartStore((state) => state);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userAddresses, setUserAddresses] = useState<AddressParams[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<AddressParams>();
  const [totalCost, setTotalCost] = useState<number>(0);
  const [deducedShippingFee, setDeducedShippingFee] = useState(0);
  const { session } = useAppContext();
  const [isPaying, setIsPaying] = useState(false);
  useEffect(() => {
    setTotalCost(
      items.reduce((total, item) => {
        return total + item.price * item.quantity;
      }, 0)
    );

    setDeducedShippingFee(
      items.reduce((total, item) => {
        return total + item.product_shipping_fee * item.quantity;
      }, 0)
    );

    if (addresses) {
      setUserAddresses(addresses);
      const defaultAddress = addresses.filter(
        (eachAddresses) => eachAddresses.is_default === true
      )[0];
      setSelectedAddress(defaultAddress);
    }
  }, [items, addresses]);
// whatsapp payment
// Handle WhatsApp order
const handleWhatsAppOrder = () => {
  if (!selectedAddress || !items || items.length === 0) return;

  const companyWhatsApp = "09029129268";

  const orderItems = items
    .map((eachItem, index) => {
      const subtotal = eachItem.price * eachItem.quantity;

      return `
${index + 1}. *${eachItem.name}*
Quantity: ${eachItem.quantity}
Price: ${process.env.NEXT_PUBLIC_CURRENCY}${eachItem.price}
Subtotal: ${process.env.NEXT_PUBLIC_CURRENCY}${subtotal.toFixed(2)}
`;
    })
    .join("\n");

  const orderMessage = `
🛒 *NEW ORDER*

*PRODUCTS*
${orderItems}

🚚 *Shipping Fee:* ${
    process.env.NEXT_PUBLIC_CURRENCY
  }${deducedShippingFee}

💰 *TOTAL:* ${
    process.env.NEXT_PUBLIC_CURRENCY
  }${totalCost}

📍 *DELIVERY ADDRESS*
${selectedAddress.address}
${selectedAddress.city}, ${selectedAddress.state}

Please confirm my order. Thank you!
`;

  const whatsappUrl = `https://wa.me/${companyWhatsApp}?text=${encodeURIComponent(
    orderMessage
  )}`;

  window.open(whatsappUrl, "_blank");
};
  // const payNow = async () => {

  //   try {
  //     const result = await fetch("/api/payment", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         email: session?.user?.email,
  //         amount: totalCost * 100 + deducedShippingFee * 100,
  //         source: "cart",
  //       }),
  //     });

  //     const paystackResult = await result.json();

  //     if (result.status) {
  //       localStorage.setItem(
  //         "paymentInformation",
  //         JSON.stringify({
  //           userId: session?.user?.id,
  //           userEmail: session?.user?.email,
  //           fullAddressFields: selectedAddress,
  //           items: items,
  //           amount: totalCost * 100 + deducedShippingFee * 100,
  //         })
  //       );
  //       router.push(paystackResult.data.authorization_url);
  //     }
  //   } catch (error) {
  //     console.log("Payment Error:", error);
  //     toast.error("Payment failed. Please try again.");
  //   } finally {
  //     console.log("Payment Processed");
  //   }
  // };
  
// 

  return (
    <>
      
<div
  className="flex flex-col lg:flex-row gap-8 lg:gap-12 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 2xl:px-32 pt-8 md:pt-12 mb-16 md:mb-20"
>
  {/* ================= CART ================= */}
  <div className="flex-1 min-w-0">
    <div className="flex items-center justify-between mb-6 md:mb-8 border-b border-gray-200 pb-5 md:pb-6">
      <p className="text-xl sm:text-2xl md:text-3xl text-gray-500">
        Your{" "}
        <span className="font-semibold text-orange-500">
          Cart
        </span>
      </p>

      <p className="text-sm sm:text-base md:text-xl text-gray-500/80">
        {items ? items.length : 0} items
      </p>
    </div>

    {/* Cart Table */}
    <div className="overflow-x-auto rounded-xl">
      <table className="min-w-[650px] w-full table-auto">
        <thead className="text-left">
          <tr className="border-b border-gray-100">
            <th className="text-nowrap pb-5 md:px-4 px-2 text-gray-600 font-medium">
              Product Details
            </th>

            <th className="pb-5 md:px-4 px-2 text-gray-600 font-medium">
              Price
            </th>

            <th className="pb-5 md:px-4 px-2 text-gray-600 font-medium">
              Quantity
            </th>

            <th className="pb-5 md:px-4 px-2 text-gray-600 font-medium">
              Subtotal
            </th>
          </tr>
        </thead>

        <tbody>
          {items &&
            items.map((eachItem, index: number) => {
              return (
                <tr
                  key={index}
                  className="border-b border-gray-100 hover:bg-orange-50/30 transition-colors duration-300"
                >
                  <td className="flex items-center gap-3 sm:gap-4 py-5 md:px-4 px-2">
                    <div>
                      {/* Product Image */}
                      <div className="rounded-xl overflow-hidden bg-gradient-to-br from-orange-50 to-gray-100 relative w-16 h-16 sm:w-20 sm:h-20 shadow-sm hover:shadow-lg transition-all duration-300 group">
                        <Image
                          src={eachItem.image_url_array[0]}
                          alt={eachItem.name}
                          className="object-cover mix-blend-multiply group-hover:scale-110 transition-transform duration-500"
                          fill
                        />

                        {/* Image glow */}
                        <div className="absolute inset-0 ring-1 ring-inset ring-orange-200/40 rounded-xl pointer-events-none" />
                      </div>

                      {/* <button className="md:hidden text-xs text-orange-500 bg-black rounded-full py-1 px-3 mt-2 hover:bg-orange-500 hover:text-white transition-all duration-300">
                        Remove
                      </button> */}
                    </div>

                    <div className="text-sm hidden md:block">
                      <p className="text-gray-800 font-medium max-w-[220px] truncate">
                        {eachItem.name}
                      </p>
{/*  */}
                    </div>
                  </td>

                  <td className="py-4 md:px-4 px-2 text-gray-600 whitespace-nowrap">
                    {process.env.NEXT_PUBLIC_CURRENCY}
                    {eachItem.price}
                  </td>

                  <td className="py-4 md:px-4 px-2">
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <button
                        onClick={() => decreaseQty(eachItem.id)}
                        className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-orange-100 transition-all duration-300 active:scale-90"
                      >
                        <Image
                          src={assets.decrease_arrow}
                          alt="decrease quantity"
                          className="w-4 h-4"
                        />
                      </button>

                      <input
                        readOnly
                        type="text"
                        value={eachItem.quantity}
                        className="w-8 h-8 border border-gray-200 rounded-md text-center appearance-none text-sm focus:outline-none"
                      />

                      <button
                        onClick={() => increaseQty(eachItem.id)}
                        className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-orange-100 transition-all duration-300 active:scale-90"
                      >
                        <Image
                          src={assets.icrease_arrow}
                          alt="increase quantity"
                          className="w-4 h-4"
                        />
                      </button>
                    </div>
                  </td>

                  <td className="py-4 md:px-4 px-2 text-gray-600 font-medium whitespace-nowrap">
                    {process.env.NEXT_PUBLIC_CURRENCY}
                    {(eachItem.price * eachItem.quantity).toFixed(2)}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>

    {/* Continue Shopping */}
    <Link href="/all-products" className="group flex items-center mt-6 gap-2 text-orange-500 bg-black rounded-full py-2.5 px-5 hover:bg-orange-500 hover:text-white transition-all duration-300 shadow-sm hover:shadow-lg active:scale-95">
      <Image
        className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300"
        src={assets.arrow_right_icon_colored}
        alt="continue shopping"
      />

      <span className="text-sm font-medium">
        Continue Shopping
      </span>
    </Link>
  </div>

  {/* ================= ORDER SUMMARY ================= */}
  <div className="w-full lg:w-[380px] xl:w-[400px] lg:sticky lg:top-6 h-fit">
    <div className="bg-white border border-gray-100 rounded-2xl p-5 sm:p-6 shadow-[0_10px_40px_rgba(0,0,0,0.08)] hover:shadow-[0_15px_50px_rgba(0,0,0,0.12)] transition-shadow duration-500">
      
      {/* Summary Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl md:text-2xl font-semibold text-orange-500">
          Order Summary
        </h2>

        <div className="w-9 h-9 rounded-full bg-orange-50 flex items-center justify-center">
          <span className="text-orange-500 text-sm">🛒</span>
        </div>
      </div>

      <hr className="border-gray-200 my-5" />

      <div className="space-y-6">
        {/* Address */}
        <div>
          <label className="text-xs sm:text-sm font-semibold uppercase tracking-wide text-gray-600 block mb-2">
            Select Address
          </label>

          <div className="relative inline-block w-full text-sm">
            <button
              onClick={() =>
                setIsDropdownOpen((prev) => !prev)
              }
              className="w-full text-left px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 hover:border-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-200 transition-all duration-300"
            >
              <span className="pr-6 block truncate">
                {selectedAddress
                  ? `${selectedAddress.address}, ${selectedAddress.city}, ${selectedAddress.state}`
                  : "Select Address"}
              </span>

              <svg
                className={`w-5 h-5 absolute right-3 top-3 transition-transform duration-300 ${
                  isDropdownOpen ? "rotate-0" : "-rotate-90"
                }`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="#6B7280"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {isDropdownOpen && (
              <ul className="absolute w-full bg-white border border-gray-200 rounded-xl shadow-xl mt-2 z-20 py-1.5 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                {userAddresses?.map((address, index) => (
                  <li
  key={index}
  onClick={() => {
    setSelectedAddress(address);
    setIsDropdownOpen(false);
  }}
  className="px-4 py-3 hover:bg-orange-50 hover:text-orange-500 cursor-pointer transition-colors duration-200"
>
  {address.address}, {address.city}, {address.state}
</li>
                ))}

                <li
                  onClick={() => router.push("/address")}
                  className="px-4 py-3 hover:bg-orange-50 cursor-pointer text-center text-orange-500 font-medium border-t border-gray-100"
                >
                  + Add New Address
                </li>
              </ul>
            )}
          </div>
        </div>

        <hr className="border-gray-200" />

        {/* Price Details */}
        <div className="space-y-4">
          <div className="flex justify-between text-base font-medium">
            <p className="uppercase text-gray-600">
              Items {items?.length}
            </p>
          </div>

          <div className="flex justify-between">
            <p className="text-gray-600">
              Shipping Fee
            </p>

            <p className="font-medium text-gray-800">
              {process.env.NEXT_PUBLIC_CURRENCY}
              {deducedShippingFee}
            </p>
          </div>

          <div className="flex justify-between items-center text-lg md:text-xl font-semibold border-t border-gray-200 pt-4">
            <p className="text-gray-800">
              Total
            </p>

            <p className="text-orange-500">
              {process.env.NEXT_PUBLIC_CURRENCY}
              {totalCost + deducedShippingFee}
            </p>
          </div>
        </div>
      </div>

      {/* ================= PAYMENT BUTTON ================= */}
    {selectedAddress ? (
  <button
    onClick={handleWhatsAppOrder}
    className="group relative overflow-hidden flex items-center justify-center gap-3 w-full mt-6 py-3.5 px-5 rounded-xl bg-green-500 hover:bg-green-600 text-white font-semibold shadow-lg shadow-green-500/20 transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98]"
  >
    <span className="relative">
      Order via WhatsApp
    </span>

    <span className="relative transition-transform duration-300 group-hover:translate-x-1">
      →
    </span>
  </button>
) : (
  <button
    disabled
    className="w-full text-gray-400 bg-gray-100 rounded-xl py-3.5 mt-6 text-sm cursor-not-allowed"
  >
    Please Select An Address To Continue
  </button>
)}

      {/* Secure Payment Note */}
      {selectedAddress && !isPaying && (
        <p className="text-center text-xs text-gray-400 mt-3">
          🔒 Secure checkout • Your payment is protected
        </p>
      )}
    </div>
  </div>
</div>

    </>
  );
};

export default CartPage;