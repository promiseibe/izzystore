"use client";
import { makeDefaultAddress } from '@/utils/action/address.action';
import { createOrder } from '@/utils/action/order.action';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import toast from 'react-hot-toast';

const VerifyPay = ({reference,amount,email}:{reference: string,amount: number, email: string}) => {
const router = useRouter();
  useEffect(() => {
  const paymentInfo = JSON.parse(
    localStorage.getItem("paymentInformation") || "{}"
  );

  if (
    paymentInfo.amount !== amount / 100 ||
    paymentInfo.userEmail !== email
  ) {
    toast.error("PaymentVerification Error");
    return;
  } else {
    toast.success("Payment Verified Successfully");

    const makeOrder = async () => {
      const localStorageItems = JSON.parse(
        localStorage.getItem("paymentInformation") || "{}"
      );

      const OrderItem = {
        user_id: localStorageItems.userId,
        amount: localStorageItems.amount,
        user_email: localStorageItems.userEmail,
        productName: localStorageItems.productName,
        quantity: localStorageItems.quantity,
        productCategory: localStorageItems.productCategory,
        productImage: localStorageItems.image,
        address: localStorageItems.fullAddressFields,
        paymentReference: reference,
      };

    const orderId =   await createOrder(OrderItem);
    router.replace(`/order/${orderId}`);
    };

    makeOrder();
  }
}, [amount, email]);
    return (
 <>
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f172a] via-black to-[#020617] px-4">

    <div className="w-full max-w-lg bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-6 md:p-8 text-white transition-all duration-500 hover:shadow-orange-500/20">

      {/* Title */}
      <h1 className="text-2xl md:text-3xl font-bold text-center text-orange-500 mb-6 tracking-wide animate-fade-in">
        Verify Payment
      </h1>

      {/* Content */}
      <div className="space-y-4 text-sm md:text-base">

        <div className="flex flex-col gap-1">
          <span className="text-gray-400">Payment Reference</span>
          <p className="font-medium break-all">{reference}</p>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-gray-400">Amount</span>
          <p className="font-medium">₦{amount}</p>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-gray-400">Customer Email</span>
          <p className="font-medium break-all">{email}</p>
        </div>

      </div>

      {/* Decorative Icon */}
      <div className="flex justify-center mt-8">
        <div className="p-4 rounded-full bg-orange-500/10 shadow-lg shadow-orange-500/20 animate-bounce">
          <svg
            className="w-8 h-8 text-orange-500"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M9 12l2 2l4 -4" />
            <path d="M12 3a9 9 0 1 0 0 18a9 9 0 0 0 0 -18" />
          </svg>
        </div>
      </div>

      {/* Button */}
      <button
        className="w-full mt-8 flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 active:scale-95 transition-all duration-300 text-white font-medium py-3 rounded-lg shadow-lg shadow-orange-500/30"
      >
        {/* Spinner (hidden by default, show when loading state is true) */}
        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin hidden"></span>

        <span>Save Address</span>
      </button>

    </div>
  </div>
</>
  )
}

export default VerifyPay