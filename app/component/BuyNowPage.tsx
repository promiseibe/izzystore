"use client";

import { AddressParams, ProductParams } from "@/shared.types";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAppContext } from "../context/AppContext";
import { assets } from "@/public/assets/assets";

const BuyNow = ({
  product,
  addresses,
}: {
  product: ProductParams;
  addresses: AddressParams[];
}) => {
  const { session } = useAppContext();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();
  const [userAddresses, setUserAddresses] = useState<AddressParams[]>()
  const [quantity, setQuantity] = useState(1);
  const [totalCost, setTotalCost] = useState(product.price);
  const [selectedAddress, setSelectedAddress] = useState<AddressParams | null>(
    null,
  );
  const [paying, setPaying] = useState(false);

  const increaseQTY = () => {
    setQuantity((prev) => prev + 1);
  };
  const decreaseQTY = () => {
    if (quantity === 1) {
      toast.error("Quantity cannot be less than 1");
      return;
    }
    setQuantity((prev) => prev - 1);
  };

  const handleAddressSelect = (address: AddressParams) => {
    setSelectedAddress(address);
    setIsDropdownOpen(false);
  };

  const payNow = async () => {
    try {
      const result = await fetch("/api/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: session?.user?.email,
          amount: totalCost * 100 + product.product_shipping_fee * 100,
          source: "buy-now"
        }),
      });

      const paystackResult = await result.json();

      if (result.status) {
        localStorage.setItem(
          "paymentInformation",
          JSON.stringify({
            userId: session?.user?.id,
            productName: product.name,
            productCategory: product.category.name,
            quantity: quantity,
            image: product.image_url_array[0],
            amount: totalCost + product.product_shipping_fee,
            userEmail: session?.user?.email,
            fullAddressFields: selectedAddress,
          }),
        );
        router.push(paystackResult.data.authorization_url);
      }
    } catch (error) {
      console.log("Payment Error:", error);
      toast.error("Payment failed. Please try again.");
    } finally {
      console.log("Payment Processed");
    }
  };

  useEffect(() => {
    localStorage.removeItem("paymentInformation");

    if (addresses) {
      setUserAddresses(addresses);
      const defaultAddress = addresses.filter((eachAddress) => {
        return eachAddress.is_default === true;
      });
      setSelectedAddress(defaultAddress[0]);
    }
    setTotalCost(product.price * quantity);
  }, [quantity, product.price, userAddresses, addresses]);

  return (
 <div
  className={`min-h-screen flex flex-col lg:flex-row gap-8 lg:gap-12 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 pt-6 sm:pt-10 pb-20 bg-gray-50`}
>
  {/* LEFT SIDE */}
  <div className="flex-1 min-w-0">
    {/* HEADER */}
    <div className="flex items-center justify-between mb-6 sm:mb-8 border-b border-gray-200 pb-4">
      <p className="text-lg sm:text-2xl md:text-3xl text-gray-500 font-medium">
        The Product To{" "}
        <span className="font-bold text-orange-500">Buy</span>
      </p>
    </div>

    {/* PRODUCT CARD */}
    <div className="overflow-x-auto rounded-2xl shadow-lg border border-gray-200 bg-white transition-all duration-300 hover:shadow-xl">
      <table className="min-w-full table-auto">
        <thead className="text-left bg-gray-50">
          <tr>
            <th className="text-nowrap py-4 md:px-5 px-3 text-gray-600 font-semibold text-xs sm:text-sm">
              Product Details
            </th>

            <th className="py-4 md:px-5 px-3 text-gray-600 font-semibold text-xs sm:text-sm">
              Price
            </th>

            <th className="py-4 md:px-5 px-3 text-gray-600 font-semibold text-xs sm:text-sm">
              Quantity
            </th>
          </tr>
        </thead>

        <tbody>
          {product && (
            <tr className="border-t hover:bg-orange-50/30 transition-colors duration-300">
              {/* PRODUCT */}
              <td className="flex items-center gap-3 sm:gap-5 py-4 md:px-5 px-3">
                <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-orange-50 to-gray-100 shadow-lg relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 flex-shrink-0 group">
                  <Image
                    src={product.image_url_array[0]}
                    alt={product.name}
                    className="object-cover transition-transform duration-500 group-hover:scale-110 drop-shadow-md"
                    fill
                  />

                  {/* IMAGE GLOW */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/10 to-transparent pointer-events-none" />
                </div>

                <div className="text-sm min-w-0">
                  <p className="text-gray-800 font-semibold truncate max-w-[130px] sm:max-w-[220px] md:max-w-[300px]">
                    {product.name}
                  </p>

                  <p className="text-gray-500 text-xs mt-1">
                    {product.sizes && product.sizes}
                  </p>
                </div>
              </td>

              {/* PRICE */}
              <td className="py-4 md:px-5 px-3 text-gray-800 font-bold text-sm sm:text-base whitespace-nowrap">
                {process.env.NEXT_PUBLIC_CURRENCY}
                {product.price}
              </td>

              {/* QUANTITY */}
              <td className="py-4 md:px-5 px-3">
                <div className="flex items-center gap-1 sm:gap-2 bg-gray-100 rounded-xl px-2 py-1.5 w-fit shadow-inner">
                  <button
                    onClick={decreaseQTY}
                    className="p-1.5 rounded-lg hover:bg-white hover:shadow-md hover:scale-110 active:scale-95 transition-all duration-200"
                  >
                    <Image
                      src={assets.decrease_arrow}
                      alt="decrease_arrow"
                      className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                    />
                  </button>

                  <input
                    value={quantity}
                    readOnly
                    type="text"
                    className="w-7 sm:w-8 text-center bg-transparent outline-none font-semibold text-gray-700 text-sm"
                  />

                  <button
                    onClick={increaseQTY}
                    className="p-1.5 rounded-lg hover:bg-white hover:shadow-md hover:scale-110 active:scale-95 transition-all duration-200"
                  >
                    <Image
                      src={assets.icrease_arrow}
                      alt="increase_arrow"
                      className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                    />
                  </button>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>

    {/* SIZES */}
    <div className="mt-5 flex flex-wrap gap-2">
      {product?.sizes?.map((each, index) => (
        <button
          key={index}
          className="text-xs sm:text-sm rounded-full px-4 py-1.5 border border-gray-300 bg-white text-gray-600 hover:bg-orange-500 hover:text-white hover:border-orange-500 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
        >
          {each}
        </button>
      ))}
    </div>

    {/* CONTINUE SHOPPING */}
    <button className="group flex items-center mt-8 gap-2 text-white bg-gray-900 rounded-full py-3 px-5 shadow-lg hover:bg-orange-500 hover:shadow-orange-500/30 transition-all duration-300 hover:-translate-y-1 active:scale-95">
      <Image
        className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300"
        src={assets.arrow_right_icon_colored}
        alt="arrow_right_icon_colored"
      />

      <span className="text-sm sm:text-base">
        Continue Shopping
      </span>
    </button>
  </div>

  {/* RIGHT SIDE / ORDER SUMMARY */}
  <div className="w-full lg:w-[390px] xl:w-[420px] bg-white rounded-3xl shadow-xl border border-gray-200 p-5 sm:p-6 md:p-7 h-fit lg:sticky lg:top-6 transition-all duration-300 hover:shadow-2xl">
    {/* TITLE */}
    <div>
      <h2 className="text-xl sm:text-2xl font-bold text-orange-500">
        Order Summary
      </h2>

      <p className="text-xs sm:text-sm text-gray-400 mt-1">
        Review your order before payment
      </p>
    </div>

    <hr className="border-gray-200 my-5" />

    <div className="space-y-6">
      <div>
        {/* ADDRESS */}
        <label className="text-xs font-bold uppercase tracking-wider text-gray-500 block mb-2">
          Select Address
        </label>

        <div className="relative w-full text-sm">
          <button
            onClick={() => setIsDropdownOpen((prev) => !prev)}
            className="w-full flex justify-between items-center gap-3 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 hover:border-orange-400 hover:bg-orange-50/30 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all duration-300"
          >
            <span className="truncate text-left">
              {selectedAddress
                ? `${selectedAddress.address}, ${selectedAddress.city}, ${selectedAddress.state}`
                : "Select Address"}
            </span>

            <svg
              className={`w-4 h-4 flex-shrink-0 transition-transform duration-300 ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="#f97316"
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
            <ul className="absolute w-full bg-white border border-gray-200 rounded-xl shadow-2xl mt-2 z-20 py-2 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
              {userAddresses?.map((address, index) => (
                <li
                  onClick={() => handleAddressSelect(address)}
                  key={index}
                  className="px-4 py-3 hover:bg-orange-50 hover:text-orange-600 cursor-pointer transition-colors duration-200 text-sm"
                >
                  {address.address}, {address.city}, {address.state}
                </li>
              ))}

              <Link
                href={`/address`}
                className="block px-4 py-3 text-center text-orange-500 font-medium hover:bg-orange-50 transition-colors duration-200 border-t border-gray-100"
              >
                + Add New Address
              </Link>
            </ul>
          )}
        </div>

        {/* PROMO */}
        <div className="mt-6">
          <label className="text-xs font-bold uppercase tracking-wider text-gray-500 block mb-2">
            Promo Code
          </label>

          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Enter promo code"
              className="flex-grow min-w-0 outline-none p-3 text-gray-600 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400 transition-all duration-300"
            />

            <button className="bg-gray-900 text-white px-4 sm:px-5 py-2 rounded-xl hover:bg-orange-500 hover:shadow-lg hover:shadow-orange-500/20 transition-all duration-300 active:scale-95 text-sm font-medium">
              Apply
            </button>
          </div>
        </div>

        <hr className="border-gray-200 my-6" />

        {/* PRICING */}
        <div className="space-y-4">
          <div className="flex justify-between text-sm">
            <p className="text-gray-500">Shipping Fee</p>

            <p className="font-semibold text-gray-800">
              {process.env.NEXT_PUBLIC_CURRENCY}
              {product.product_shipping_fee}
            </p>
          </div>

          <div className="flex justify-between items-center text-lg sm:text-xl font-bold border-t border-gray-200 pt-4">
            <p className="text-gray-800">Total</p>

            <p className="text-orange-500">
              {process.env.NEXT_PUBLIC_CURRENCY}
              {totalCost}
            </p>
          </div>
        </div>
      </div>
    </div>

    {/* CTA */}
    {selectedAddress ? (
      <button
        onClick={async () => {
          setPaying(true);

          try {
            await payNow();
          } finally {
            setPaying(false);
          }
        }}
        disabled={paying}
        className={`flex items-center justify-center gap-3 bg-orange-500 text-white text-center p-3.5 sm:p-4 w-full mt-7 rounded-xl shadow-lg shadow-orange-500/20 hover:bg-orange-600 hover:shadow-xl hover:shadow-orange-500/30 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 font-semibold text-sm sm:text-base ${
          paying ? "opacity-80 cursor-not-allowed" : ""
        }`}
      >
        {paying ? (
          <>
            <span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
            <span>Processing Payment...</span>
          </>
        ) : (
          <>
            <span>Pay Now</span>
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </>
        )}
      </button>
    ) : (
      <p className="w-full text-red-400 bg-red-50 border border-red-100 rounded-xl px-4 py-3 mt-5 text-xs sm:text-sm text-center">
        Please select an address to continue
      </p>
    )}
  </div>
</div>
  );
};

export default BuyNow;
