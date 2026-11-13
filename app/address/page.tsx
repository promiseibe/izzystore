import React from 'react'
import NewAddress from '../component/NewAddress'
import { createClientServer } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import AddressCard from '../component/AddressCard';
import { AddressParams } from '@/shared.types';

const AddressPage = async () => {
    const supabase = await createClientServer();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data } = await supabase
    .from("address")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  console.log("address data--->>", data);
  return (
  <>
      <NewAddress />

     {data && data.length > 0 && (
  <>
    <div className="flex flex-col items-center px-4">
      
      {/* Header */}
      <div className="flex flex-col items-center mb-8 mt-12 text-center">
        <p className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight">
          My{" "}
          <span className="text-orange-500 drop-shadow-sm">
            Addresses
          </span>
        </p>

        <div className="w-20 sm:w-28 h-1 bg-linear-to-r from-orange-400 to-orange-600 mt-3 rounded-full shadow-md animate-pulse"></div>
      </div>
    </div>

    {/* Address Container */}
    <div className="bg-linear-to-br from-[#043033] via-[#065f63] to-[#022224] 
                    flex flex-col md:flex-row flex-wrap 
                    items-stretch justify-center gap-6 
                    px-4 sm:px-6 md:px-10 py-8 
                    rounded-t-3xl shadow-2xl transition-all duration-500">

      {data &&
        data.map((address: AddressParams, index: number) => (
          <div
            key={index}
            className="w-full sm:w-[90%] md:w-[45%] lg:w-[30%] 
                       transform transition-all duration-300 
                       hover:scale-[1.03] hover:-translate-y-1"
          >
            {/* Card Wrapper Enhancement */}
            <div className="h-full rounded-2xl bg-white/5 backdrop-blur-md 
                            border border-white/10 shadow-lg 
                            hover:shadow-orange-500/20 transition-all duration-300">
              
              <AddressCard address={address} />
              
            </div>
          </div>
        ))}
    </div>
  </>
)}
    </>
  )
}

export default AddressPage