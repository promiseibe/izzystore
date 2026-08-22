"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { saveAddressDB } from "@/utils/action/address.action";
import { assets } from "@/public/assets/assets";
const NewAddress = () => {
  const router = useRouter();
  const [userAddressDetails, setUserAddressDetails] = useState({
    region: "",
    title: "",
    address: "",
    state: "",
    city: "",
    phone: "",
    flag: "",
    countryCode: "",
  });
  const [loading, setLoading] = useState(false);
  const [openRegion, setOpenRegion] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState<{
    region: string;
    code: string;
    flag: string;
  }>();
  const regionRef = useRef<HTMLDivElement>(null);
  const allRegions = [
    { region: "Nigeria", code: "+234", flag: "🇳🇬" },
    { region: "Ghana", code: "+233", flag: "🇬🇭" },
  ];

  const disabled =
    !userAddressDetails.region ||
    !userAddressDetails.title ||
    !userAddressDetails.address ||
    !userAddressDetails.state ||
    !userAddressDetails.city ||
    !userAddressDetails.phone;

  const handleAddress = async () => {
    try {
        setLoading(true)
      if (
        !userAddressDetails.address ||
        !userAddressDetails.region ||
        !userAddressDetails.phone ||
        !userAddressDetails.state ||
        !userAddressDetails.title
      ) {
        return;
      }
      //call function to save address to supabase database
      const saveResult = await saveAddressDB(userAddressDetails);

      if (saveResult.success === false) {
        toast.error("Your address wasn't saved yet. Please try again.");
        return;
      }

      toast.success("Address saved successfully");
      setUserAddressDetails({
        region: "",
        title: "",
        address: "",
        state: "",
        city: "",
        phone: "",
        flag: "",
        countryCode: "",
      });
      router.back();
    } catch (error) {
      console.log("error saving address", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        regionRef.current &&
        !regionRef.current.contains(event.target as Node)
      ) {
        setOpenRegion(false);
      }
    };

    const handleScroll = () => {
      setOpenRegion(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
  <>
  <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-black to-[#020617] px-6 md:px-16 lg:px-32 py-16 flex flex-col md:flex-row items-center justify-between gap-12">

    {/* LEFT SIDE */}
    <div className="w-full max-w-lg backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl shadow-2xl p-8 md:p-10 transition-all duration-500 hover:shadow-orange-500/10">

      {/* Title */}
      <p className="text-2xl md:text-3xl font-semibold text-white">
        Add Shipping{" "}
        <span className="text-orange-500 drop-shadow-md">Address</span>
      </p>

      <div className="space-y-4 mt-10">

        {/* REGION DROPDOWN */}
        <div className="relative inline-flex w-full">
          <span className="inline-flex w-full divide-x divide-gray-300/20 overflow-hidden rounded-xl border border-white/10 bg-white/5 shadow-lg backdrop-blur-md">

            <button
              onClick={() => setOpenRegion(!openRegion)}
              type="button"
              className="w-full px-4 py-3 text-sm font-medium text-gray-300 hover:text-white transition"
            >
              Country / Region
            </button>

            <button
              onClick={() => setOpenRegion(!openRegion)}
              type="button"
              className="px-4 py-3 text-gray-400 hover:text-white transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className={`w-4 h-4 transition-transform duration-300 ${
                  openRegion ? "rotate-180" : ""
                }`}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25 12 15.75 4.5 8.25" />
              </svg>
            </button>
          </span>

          <input type="hidden" name="region" value={userAddressDetails.region.trim()} />

          {openRegion && (
            <div
              ref={regionRef}
              className="absolute top-14 w-full z-50 rounded-xl border border-white/10 bg-black/90 backdrop-blur-lg shadow-xl max-h-60 overflow-y-auto animate-fadeIn"
            >
              {allRegions.map((eachRegion, index) => (
                <input
                  key={index}
                  readOnly
                  onClick={() => {
                    setUserAddressDetails((prevState) => ({
                      ...prevState,
                      region: eachRegion.region.trim(),
                      countryCode: eachRegion.code.trim(),
                      flag: eachRegion.flag.trim(),
                    }));
                    setSelectedRegion(eachRegion);
                    setOpenRegion(false);
                  }}
                  className="w-full px-4 py-3 text-sm text-gray-300 hover:bg-white/10 transition cursor-pointer"
                  value={eachRegion.region}
                />
              ))}
            </div>
          )}
        </div>

        {/* REGION DISPLAY */}
        <h2 className="text-white text-2xl font-semibold tracking-wide">
          {userAddressDetails.region}
        </h2>

        {/* INPUTS */}
        <input
          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-orange-500 outline-none transition"
          type="text"
          placeholder="Address Title (e.g. Home)"
          name="title"
          onChange={(e) =>
            setUserAddressDetails({
              ...userAddressDetails,
              title: e.target.value,
            })
          }
          value={userAddressDetails.title}
        />

        <textarea
          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-orange-500 outline-none transition resize-none"
          rows={4}
          placeholder="Full Address"
          name="address"
          onChange={(e) =>
            setUserAddressDetails({
              ...userAddressDetails,
              address: e.target.value,
            })
          }
          value={userAddressDetails.address}
        />

        <input
          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-orange-500 outline-none transition"
          type="text"
          placeholder="State"
          name="state"
          onChange={(e) =>
            setUserAddressDetails({
              ...userAddressDetails,
              state: e.target.value,
            })
          }
          value={userAddressDetails.state}
        />

        <input
          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-orange-500 outline-none transition"
          type="text"
          placeholder="City"
          name="city"
          onChange={(e) =>
            setUserAddressDetails({
              ...userAddressDetails,
              city: e.target.value.trim(),
            })
          }
          value={userAddressDetails.city}
        />

        {/* PHONE */}
        <div className="flex gap-2">
          <div className="flex items-center px-3 rounded-xl bg-white/5 border border-white/10 text-gray-300 w-32">
            {selectedRegion?.flag} {selectedRegion?.code}
          </div>

          <input
            onChange={(e) =>
              setUserAddressDetails({
                ...userAddressDetails,
                phone: e.target.value.trim(),
              })
            }
            disabled={!userAddressDetails.region}
            className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-orange-500 outline-none transition"
            placeholder="Phone number"
            type="tel"
          />
        </div>

        {/* ERROR TEXT */}
        {!userAddressDetails.region && (
          <p className="text-xs text-red-400 text-center">
            Please select a region above
          </p>
        )}

        {disabled && (
          <p className="text-xs text-red-400 text-center">
            All fields must be filled
          </p>
        )}
      </div>

      {/* BUTTON */}
      <button
        disabled={disabled || loading}
        onClick={() => handleAddress()}
        className={`w-full mt-8 py-3 rounded-xl font-semibold uppercase tracking-wide transition-all duration-300 flex items-center justify-center gap-2 ${
          disabled
            ? "bg-gray-500 cursor-not-allowed"
            : "bg-orange-500 hover:bg-orange-600 active:scale-95 shadow-lg shadow-orange-500/30"
        }`}
      >
        {loading ? (
          <>
            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            Saving Address...
          </>
        ) : (
          "Save Address"
        )}
      </button>
    </div>

    {/* RIGHT IMAGE */}
    <div className="w-full md:w-[40%] flex justify-center">
      <Image
        className="rounded-2xl shadow-2xl shadow-orange-500/20 hover:scale-105 transition-transform duration-500"
        src={assets.my_location_image}
        alt="my_location_image"
      />
    </div>

  </div>
</>
  );
};

export default NewAddress;