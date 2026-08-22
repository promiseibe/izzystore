"use client"
import { Order } from '@/shared.types'
import Image from 'next/image';

import React from 'react'

const OrderPage = ({orderData}: {orderData:     Order}) => {
  return (
   
<div className="min-h-screen bg-gradient-to-br from-white via-orange-50/30 to-gray-100 px-4 sm:px-6 md:px-10 lg:px-20 xl:px-32 pt-8 sm:pt-12 md:pt-14 pb-16">

  <div className="max-w-7xl mx-auto">

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-14 xl:gap-20 items-start">

      {/* Product Image */}
      <div className="px-0 sm:px-4 lg:px-8 xl:px-12">

        <div className="group relative rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-xl hover:shadow-2xl transition-all duration-500">

          {/* Soft orange glow */}
          <div className="absolute -inset-1 bg-gradient-to-r from-orange-400/20 via-orange-200/10 to-transparent blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-50 to-orange-50/40">

            <Image
              src={orderData.image_url}
              alt="alt"
              className="w-full h-auto object-cover mix-blend-multiply transition-all duration-700 ease-out group-hover:scale-105 group-hover:drop-shadow-2xl"
              width={1280}
              height={720}
            />

            {/* Image shine effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

          </div>
        </div>

      </div>


      {/* Order Information */}
      <div className="flex flex-col bg-white rounded-2xl border border-gray-100 shadow-lg hover:shadow-xl transition-shadow duration-500 p-5 sm:p-7 md:p-8 lg:p-10">

        {/* Title */}
        <div className="mb-2">

          <span className="inline-block text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-orange-500 mb-3">
            Order Details
          </span>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-orange-500 leading-tight transition-colors duration-300">
            {orderData.product_name}
          </h1>

        </div>


        {/* Price */}
        <div className="mt-5 sm:mt-6">

          <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
            {process.env.NEXT_PUBLIC_CURRENCY} {orderData.amount_paid}
          </p>

        </div>


        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-orange-500/40 via-gray-200 to-transparent my-6" />


        {/* Customer / Delivery Information */}
        <div className="overflow-x-auto">

          <table className="table-auto border-collapse w-full">

            <tbody className="divide-y divide-gray-100">

              <tr className="group">
                <td className="py-3 pr-4 text-sm sm:text-base text-gray-500 font-medium whitespace-nowrap">
                  Region
                </td>

                <td className="py-3 text-sm sm:text-base text-gray-800 font-medium break-words">
                  {orderData.region}
                </td>
              </tr>

              <tr className="group">
                <td className="py-3 pr-4 text-sm sm:text-base text-gray-500 font-medium whitespace-nowrap">
                  State
                </td>

                <td className="py-3 text-sm sm:text-base text-gray-800 font-medium break-words">
                  {orderData.state}
                </td>
              </tr>

              <tr className="group">
                <td className="py-3 pr-4 text-sm sm:text-base text-gray-500 font-medium whitespace-nowrap">
                  City
                </td>

                <td className="py-3 text-sm sm:text-base text-gray-800 font-medium break-words">
                  {orderData.city}
                </td>
              </tr>

              <tr className="group">
                <td className="py-3 pr-4 text-sm sm:text-base text-gray-500 font-medium whitespace-nowrap">
                  Phone
                </td>

                <td className="py-3 text-sm sm:text-base text-gray-800 font-medium break-words">
                  {orderData.country_code}
                  {orderData.phone}
                </td>
              </tr>

            </tbody>

          </table>

        </div>


        {/* Order Status */}
        <div className="mt-7 sm:mt-8">

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-xl bg-orange-50 border border-orange-100 px-4 sm:px-5 py-4 shadow-sm">

            <p className="text-sm sm:text-base text-gray-600 font-medium">
              Order Status
            </p>

            <span className="w-fit px-4 py-1.5 rounded-full bg-orange-500 text-white text-xs sm:text-sm font-semibold shadow-md shadow-orange-500/20">
              {orderData.status}
            </span>

          </div>

        </div>

      </div>

    </div>

  </div>

</div>

  );
}

export default OrderPage