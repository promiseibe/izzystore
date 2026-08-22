import { getAdminOrders } from "@/utils/action/admin-products.action";
import Image from "next/image";
import Link from "next/link";

export default async function AdminOrdersPage() {
  const result = await getAdminOrders();

  if (!result.success) {
    return (
      <main className="p-4 sm:p-6 lg:p-8">
        <div className="rounded-2xl border border-red-100 bg-red-50 p-6">
          <h1 className="text-xl font-semibold text-red-700">
            Orders
          </h1>

          <p className="mt-2 text-sm text-red-600">
            {result.error}
          </p>
        </div>
      </main>
    );
  }

  const orders = result.orders;

  return (
    <main className="p-4 sm:p-6 lg:p-8">

      {/* HEADER */}
      <div className="mb-8">
        <p className="text-sm text-gray-500">
          Store Management
        </p>

        <h1 className="mt-1 text-2xl font-bold text-gray-900 sm:text-3xl">
          Orders
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          Manage customer orders and track their status.
        </p>
      </div>


      {/* ORDER COUNT */}
      <div className="mb-6">
        <div className="inline-flex items-center rounded-xl bg-orange-50 px-4 py-2 text-sm font-medium text-orange-600">
          {orders.length}{" "}
          {orders.length === 1 ? "Order" : "Orders"}
        </div>
      </div>


      {/* ORDERS */}
      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">

        {/* DESKTOP HEADER */}
        <div
          className="
            hidden
            md:grid
            md:grid-cols-[2fr_1.2fr_1fr_1fr_120px]
            gap-4
            border-b
            border-gray-100
            px-6
            py-4
            text-xs
            font-semibold
            uppercase
            tracking-wide
            text-gray-400
          "
        >
          <span>Product</span>
          <span>Customer</span>
          <span>Amount</span>
          <span>Status</span>
          <span>Action</span>
        </div>


        {orders.length > 0 ? (
          orders.map((order) => (

            <div
              key={order.id}
              className="
                flex
                flex-col
                gap-5
                border-b
                border-gray-100
                px-5
                py-5
                last:border-b-0
                hover:bg-gray-50
                transition
                md:grid
                md:grid-cols-[2fr_1.2fr_1fr_1fr_120px]
                md:items-center
                md:px-6
              "
            >

              {/* PRODUCT */}
              <div className="flex items-center gap-4">

                <div
                  className="
                    h-16
                    w-16
                    shrink-0
                    overflow-hidden
                    rounded-xl
                    border
                    border-gray-100
                    bg-gray-50
                  "
                >
                  {order.image_url ? (
                    <Image
                      src={order.image_url}
                      alt={order.product_name}
                      width={100}
                      height={100}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-xs text-gray-400">
                      No image
                    </div>
                  )}
                </div>


                <div className="min-w-0">

                  <h3 className="truncate font-semibold text-gray-900">
                    {order.product_name}
                  </h3>

                  <p className="mt-1 text-xs text-gray-400">
                    Qty: {order.quantity_bought}
                  </p>

                  {order.product_category && (
                    <p className="mt-1 text-xs text-gray-400">
                      {order.product_category}
                    </p>
                  )}

                </div>

              </div>


              {/* CUSTOMER */}
              <div>

                <p className="truncate text-sm font-medium text-gray-800">
                  {order.user_email || "No email"}
                </p>

                <p className="mt-1 text-xs text-gray-400">
                  {order.city || "Unknown city"},{" "}
                  {order.state || "Unknown state"}
                </p>

              </div>


              {/* AMOUNT */}
              <div>

                <p className="font-semibold text-gray-900">
                  {process.env.NEXT_PUBLIC_CURRENCY}
                  {Number(order.amount_paid).toLocaleString()}
                </p>

                <p className="mt-1 text-xs text-gray-400">
                  Qty: {order.quantity_bought}
                </p>

              </div>


              {/* STATUS */}
              <div>

                <span
                  className={`
                    inline-flex
                    rounded-full
                    px-3
                    py-1
                    text-xs
                    font-medium
                    ${
                      order.status === "processing"
                        ? "bg-orange-50 text-orange-600"
                        : order.status === "completed"
                        ? "bg-green-50 text-green-600"
                        : order.status === "cancelled"
                        ? "bg-red-50 text-red-600"
                        : order.status === "shipped"
                        ? "bg-blue-50 text-blue-600"
                        : order.status === "delivered"
                        ? "bg-emerald-50 text-emerald-600"
                        : order.status === "returned"
                        ? "bg-purple-50 text-purple-600"
                        : order.status === "reviewed"
                        ? "bg-gray-100 text-gray-600"
                        : "bg-yellow-50 text-yellow-600"
                    }
                  `}
                >
                  {order.status}
                </span>

              </div>


              {/* ACTION */}
              <div>

                <Link
                  href={`/admin/orders/view/${order.id}`}
                  className="
                    inline-flex
                    rounded-lg
                    bg-orange-50
                    px-3
                    py-2
                    text-xs
                    font-medium
                    text-orange-600
                    transition
                    hover:bg-orange-100
                  "
                >
                  View
                </Link>

              </div>

            </div>

          ))
        ) : (

          <div className="py-16 text-center">

            <p className="text-gray-500">
              No orders found.
            </p>

          </div>

        )}

      </div>

    </main>
  );
}