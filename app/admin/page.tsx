import { getAdminStats } from "@/utils/action/admin.action";

export default async function AdminDashboard() {
  const stats = await getAdminStats();

  return (
    <div className="p-4 sm:p-6 lg:p-8">

      {/* Header */}
      <div className="mb-8">

        <p className="text-sm text-gray-500 mb-1">
          Overview
        </p>

        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Dashboard
        </h1>

        <p className="text-sm text-gray-500 mt-2">
          Manage your store, products, orders and customers.
        </p>

      </div>


      {/* Statistics */}
      <div className="
        grid
        grid-cols-1
        sm:grid-cols-2
        xl:grid-cols-4
        gap-4
      ">

        {/* PRODUCTS */}
        <div className="
          bg-white
          rounded-2xl
          border
          border-gray-100
          p-5
          shadow-sm
          hover:shadow-md
          transition-all
        ">
          <p className="text-sm text-gray-500">
            Total Products
          </p>

          <h2 className="
            text-3xl
            font-bold
            text-gray-900
            mt-2
          ">
            {stats.products}
          </h2>
        </div>


        {/* ORDERS */}
        <div className="
          bg-white
          rounded-2xl
          border
          border-gray-100
          p-5
          shadow-sm
          hover:shadow-md
          transition-all
        ">
          <p className="text-sm text-gray-500">
            Total Orders
          </p>

          <h2 className="
            text-3xl
            font-bold
            text-gray-900
            mt-2
          ">
            {stats.orders}
          </h2>
        </div>


        {/* CUSTOMERS */}
        <div className="
          bg-white
          rounded-2xl
          border
          border-gray-100
          p-5
          shadow-sm
          hover:shadow-md
          transition-all
        ">
          <p className="text-sm text-gray-500">
            Total Customers
          </p>

          <h2 className="
            text-3xl
            font-bold
            text-gray-900
            mt-2
          ">
            {stats.customers}
          </h2>
        </div>


        {/* REVENUE */}
        <div className="
          bg-white
          rounded-2xl
          border
          border-gray-100
          p-5
          shadow-sm
          hover:shadow-md
          transition-all
        ">
          <p className="text-sm text-gray-500">
            Total Revenue
          </p>

          <h2 className="
            text-2xl
            sm:text-3xl
            font-bold
            text-orange-500
            mt-2
          ">
            {process.env.NEXT_PUBLIC_CURRENCY}
            {stats.revenue.toLocaleString()}
          </h2>
        </div>

      </div>

    </div>
  );
}