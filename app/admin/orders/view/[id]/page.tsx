import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createClientServer } from "@/utils/supabase/server";
import { requireAdmin } from "@/utils/auth/admin";
import OrderStatusSelect from "@/app/component/admin/OrderStatusSelect";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function AdminOrderDetailsPage({
  params,
}: Props) {
  await requireAdmin();

  const { id } = await params;

  const supabase = await createClientServer();

  const { data: order, error } = await supabase
    .from("orders")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !order) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">

      {/* HEADER */}
      <div className="mb-8">

        <Link
          href="/admin/orders"
          className="
            inline-flex
            items-center
            text-sm
            font-medium
            text-gray-500
            transition
            hover:text-orange-500
          "
        >
          ← Back to Orders
        </Link>

        <div className="mt-5">

          <p className="text-sm text-gray-500">
            Order Details
          </p>

          <h1 className="mt-1 text-2xl font-bold text-gray-900 sm:text-3xl">
            #{order.id.slice(0, 8)}
          </h1>

        </div>

      </div>


      {/* MAIN GRID */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

        {/* LEFT */}
        <div className="space-y-6 lg:col-span-2">

          {/* PRODUCT */}
          <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">

            <h2 className="text-lg font-semibold text-gray-900">
              Product
            </h2>

            <div className="mt-5 flex flex-col gap-5 sm:flex-row">

              {/* IMAGE */}
              <div className="h-32 w-32 shrink-0 overflow-hidden rounded-2xl bg-gray-100">

                {order.image_url ? (
                  <Image
                    src={order.image_url}
                    alt={order.product_name}
                    width={300}
                    height={300}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-sm text-gray-400">
                    No image
                  </div>
                )}

              </div>


              {/* INFO */}
              <div className="space-y-3">

                <h3 className="text-xl font-semibold text-gray-900">
                  {order.product_name}
                </h3>

                {order.product_category && (
                  <p className="text-sm text-gray-500">
                    Category:{" "}
                    <span className="text-gray-800">
                      {order.product_category}
                    </span>
                  </p>
                )}

                <p className="text-sm text-gray-500">
                  Quantity:{" "}
                  <span className="font-medium text-gray-800">
                    {order.quantity_bought}
                  </span>
                </p>

                {order.size && (
                  <p className="text-sm text-gray-500">
                    Size:{" "}
                    <span className="font-medium text-gray-800">
                      {order.size}
                    </span>
                  </p>
                )}

                {order.color && (
                  <p className="text-sm text-gray-500">
                    Color:{" "}
                    <span className="font-medium text-gray-800">
                      {order.color}
                    </span>
                  </p>
                )}

                <p className="text-lg font-bold text-orange-500">
                  {process.env.NEXT_PUBLIC_CURRENCY}
                  {Number(order.amount_paid).toLocaleString()}
                </p>

              </div>

            </div>

          </section>


          {/* CUSTOMER */}
          <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">

            <h2 className="text-lg font-semibold text-gray-900">
              Customer Information
            </h2>

            <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                  Email
                </p>

                <p className="mt-1 break-all text-sm text-gray-800">
                  {order.user_email || "Not provided"}
                </p>
              </div>


              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                  Phone
                </p>

                <p className="mt-1 text-sm text-gray-800">
                  {order.phone}
                </p>
              </div>


              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                  Country
                </p>

                <p className="mt-1 text-sm text-gray-800">
                  {order.country_code || "Not provided"}
                </p>
              </div>


              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                  Region
                </p>

                <p className="mt-1 text-sm text-gray-800">
                  {order.region || "Not provided"}
                </p>
              </div>

            </div>

          </section>


          {/* SHIPPING */}
          <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">

            <h2 className="text-lg font-semibold text-gray-900">
              Delivery Information
            </h2>

            <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                  State
                </p>

                <p className="mt-1 text-sm text-gray-800">
                  {order.state || "Not provided"}
                </p>
              </div>


              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                  City
                </p>

                <p className="mt-1 text-sm text-gray-800">
                  {order.city || "Not provided"}
                </p>
              </div>


              <div className="sm:col-span-2">

                <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                  Address
                </p>

                <p className="mt-1 text-sm leading-6 text-gray-800">
                  {order.address}
                </p>

              </div>

            </div>

          </section>

        </div>


        {/* RIGHT */}
        <div className="space-y-6">

          {/* STATUS */}
          <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">

            <h2 className="text-lg font-semibold text-gray-900">
              Order Status
            </h2>

            <div className="mt-5">

             <OrderStatusSelect orderId={order.id} currentStatus={order.status}/>

            </div>

          </section>


          {/* ORDER INFORMATION */}
          <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">

            <h2 className="text-lg font-semibold text-gray-900">
              Order Information
            </h2>

            <div className="mt-5 space-y-4">

              <div>
                <p className="text-xs text-gray-400">
                  Order ID
                </p>

                <p className="mt-1 break-all text-sm font-medium text-gray-800">
                  {order.id}
                </p>
              </div>


              <div>
                <p className="text-xs text-gray-400">
                  Customer ID
                </p>

                <p className="mt-1 break-all text-sm font-medium text-gray-800">
                  {order.user_id}
                </p>
              </div>


              <div>
                <p className="text-xs text-gray-400">
                  Created
                </p>

                <p className="mt-1 text-sm text-gray-800">
                  {new Date(
                    order.created_at
                  ).toLocaleString()}
                </p>
              </div>


              <div>
                <p className="text-xs text-gray-400">
                  Last Updated
                </p>

                <p className="mt-1 text-sm text-gray-800">
                  {new Date(
                    order.updated_at
                  ).toLocaleString()}
                </p>
              </div>

            </div>

          </section>

        </div>

      </div>

    </main>
  );
}