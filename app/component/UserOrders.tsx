"use client";


import { Order } from "@/shared.types";
import Image from "next/image";
import Link from "next/link";

const UserOrders = ({ userOrders }: { userOrders: Order[] }) => {
  return (
   <div className="flex flex-col justify-between px-4 sm:px-6 md:px-10 lg:px-20 xl:px-32 py-6 min-h-screen bg-gray-50">
  <div className="space-y-6">

    {/* Page Title */}
    <div className="flex items-center justify-between">
      <h2 className="text-xl sm:text-2xl font-semibold text-orange-500 tracking-tight">
        My Orders
      </h2>
    </div>

    {/* Orders Container */}
    <div className="max-w-6xl border-t border-gray-200 text-sm bg-white rounded-2xl shadow-sm overflow-hidden">

      {userOrders.map((order, index) => (
        <div
          key={index}
          className="group flex flex-col lg:flex-row gap-6 lg:gap-8 justify-between p-5 sm:p-6 border-b border-gray-100 last:border-b-0 transition-all duration-300 hover:bg-orange-50/30 hover:shadow-md"
        >

          {/* Product */}
          <div className="flex-1 flex gap-4 sm:gap-5 lg:max-w-80">

            {/* Product Image */}
            <div className="relative flex-shrink-0 group/image">

              {/* Glow */}
              <div className="absolute inset-0 bg-orange-400/20 blur-xl rounded-full opacity-0 group-hover/image:opacity-100 transition-opacity duration-500" />

              <div className="relative w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-gray-50 to-orange-50 rounded-xl border border-gray-100 shadow-sm flex items-center justify-center overflow-hidden transition-all duration-500 group-hover/image:shadow-lg group-hover/image:-translate-y-1">
                <Image
                  className="w-full h-full object-cover transition-transform duration-500 group-hover/image:scale-110"
                  src={order.image_url}
                  alt="box_icon"
                  width={150}
                  height={150}
                  quality={100}
                />
              </div>
            </div>

            {/* Product Details */}
            <p className="flex flex-col gap-2 sm:gap-3 min-w-0">

              <span className="font-semibold text-sm sm:text-base text-gray-900 leading-tight">
                {order.product_name + ` x ${order.quantity_bought}`}
              </span>

              <span className="text-gray-500 text-xs sm:text-sm">
                Items : {order.quantity_bought}
              </span>

              {order.size && (
                <span className="text-gray-500 text-xs sm:text-sm">
                  Size {order.size}
                </span>
              )}

            </p>
          </div>

          {/* Delivery Address */}
          <div className="lg:min-w-48">
            <p className="text-gray-500 leading-6 text-xs sm:text-sm">

              <span className="text-gray-400">
                {order.region}
              </span>

              <br />

              <span className="font-medium text-gray-800">
                {order.address}
              </span>

              <br />

              <span>
                {`${order.state}, ${order.city}`}
              </span>

              <br />

              <span>
                {`${order.country_code}${order.phone}`}
              </span>

            </p>
          </div>

          {/* Amount */}
          <div className="lg:min-w-32">
            <p className="text-xs sm:text-sm text-gray-400 mb-1">
              Amount paid
            </p>

            <p className="font-semibold text-base sm:text-lg text-gray-900">
              {process.env.NEXT_PUBLIC_CURRENCY}
              {order.amount_paid}
            </p>
          </div>

          {/* Order Information */}
          <div className="lg:min-w-52">
            <div className="flex flex-col gap-3">

              {/* Date */}
              <span className="text-xs sm:text-sm text-gray-500">
                <span className="font-medium text-gray-700">
                  Date:
                </span>{" "}
                {order.created_at ? order.created_at : "N/A"}
              </span>

              {/* Status */}
              <span className="text-xs sm:text-sm flex items-center gap-2">
                <span className="font-medium text-gray-700">
                  Status:
                </span>

                <span
                  className={`px-2.5 py-1 rounded-full text-[11px] font-medium capitalize shadow-sm
                    ${
                      order.status === "completed"
                        ? "bg-green-100 text-green-700"
                        : order.status === "cancelled"
                        ? "bg-red-100 text-red-700"
                        : order.status === "processing"
                        ? "bg-orange-100 text-orange-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                >
                  {order.status}
                </span>
              </span>

              {/* Actions */}
              <div className="flex flex-wrap gap-2 pt-1">

                {(order.status === "completed" ||
                  order.status === "cancelled") && (
                  <button
                    className="bg-red-500 hover:bg-red-600 active:scale-95 text-white px-3 py-1.5 rounded-lg text-xs font-medium shadow-sm hover:shadow-md transition-all duration-200"
                  >
                    Delete
                  </button>
                )}

                {order.status !== "reviewed" &&
                  order.status !== "processing" &&
                  order.status === "completed" && (
                    <Link
                      href={`/add-review/${order.id}`}
                      className="bg-orange-500 hover:bg-orange-600 active:scale-95 text-white px-3 py-1.5 rounded-lg text-xs font-medium shadow-sm hover:shadow-md transition-all duration-200"
                    >
                      Review product
                    </Link>
                  )}

                <Link
                  href={`/order/${order.id}`}
                  className="bg-gray-900 hover:bg-orange-500 active:scale-95 text-white px-3 py-1.5 rounded-lg text-xs font-medium shadow-sm hover:shadow-md transition-all duration-200"
                >
                  View
                </Link>

              </div>

            </div>
          </div>

        </div>
      ))}

    </div>
  </div>
</div>
  );
};

export default UserOrders;