import { createClientServer } from "@/utils/supabase/server";

export default async function AdminCustomersPage() {
  const supabase = await createClientServer();

  const { data: customers, error } = await supabase
    .from("eldics_users")
    .select(`
      id,
      full_name,
      username,
      email,
      avatar_url,
      created_at
    `)
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    console.error("CUSTOMERS FETCH ERROR:", error);

    return (
      <div className="p-6">
        <p className="text-red-500">
          Failed to load customers.
        </p>
      </div>
    );
  }

  return (
    <main className="p-4 sm:p-6 lg:p-8">

      {/* HEADER */}
      <div className="mb-8">
        <p className="text-sm text-gray-500">
          Store Management
        </p>

        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1">
          Customers
        </h1>

        <p className="text-sm text-gray-500 mt-2">
          Manage your store customers.
        </p>
      </div>

      {/* CUSTOMERS */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

        {/* HEADER */}
        <div className="
          hidden
          md:grid
          grid-cols-[2fr_2fr_1fr_120px]
          gap-4
          px-6
          py-4
          border-b
          border-gray-100
          text-xs
          font-semibold
          uppercase
          tracking-wide
          text-gray-400
        ">
          <span>Customer</span>
          <span>Email</span>
          <span>Username</span>
          <span>Action</span>
        </div>

        {/* LIST */}
        {customers && customers.length > 0 ? (
          customers.map((customer) => (
            <div
              key={customer.id}
              className="
                flex
                flex-col
                md:grid
                md:grid-cols-[2fr_2fr_1fr_120px]
                gap-4
                md:items-center
                px-5
                sm:px-6
                py-5
                border-b
                border-gray-100
                last:border-b-0
                hover:bg-gray-50
                transition
              "
            >

              {/* CUSTOMER */}
              <div className="flex items-center gap-4">

                <div className="
                  w-12
                  h-12
                  rounded-full
                  overflow-hidden
                  bg-gray-100
                  border
                  border-gray-200
                  flex-shrink-0
                ">
                  {customer.avatar_url ? (
                    <img
                      src={customer.avatar_url}
                      alt={customer.full_name || "Customer"}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="
                      w-full
                      h-full
                      flex
                      items-center
                      justify-center
                      text-gray-400
                      font-semibold
                    ">
                      {(customer.full_name || "U")
                        .charAt(0)
                        .toUpperCase()}
                    </div>
                  )}
                </div>

                {/* <div className="min-w-0">

                  <h3 className="
                    font-semibold
                    text-gray-900
                    truncate
                  ">
                    {customer.full_name || "No name"}
                  </h3>

                  <p className="
                    text-xs
                    text-gray-400
                    mt-1
                  ">
                    Customer
                  </p>

                </div> */}

              </div>

              {/* EMAIL */}
              <div className="
                text-sm
                text-gray-600
                truncate
              ">
                {customer.email || "No email"}
              </div>

              {/* USERNAME */}
              <div className="
                text-sm
                text-gray-600
              ">
                {customer.username
                  ? `@${customer.username}`
                  : "No username"}
              </div>

              {/* ACTION */}
              <div>
                <button
                  type="button"
                  className="
                    px-3
                    py-2
                    rounded-lg
                    bg-gray-100
                    hover:bg-gray-200
                    text-xs
                    font-medium
                    text-gray-700
                    transition
                  "
                >
                  View
                </button>
              </div>

            </div>
          ))
        ) : (
          <div className="py-16 text-center">
            <p className="text-gray-500">
              No customers found.
            </p>
          </div>
        )}

      </div>

    </main>
  );
}