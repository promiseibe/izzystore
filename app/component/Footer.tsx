import { assets } from "@/public/assets/assets";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
 return (
  <footer className="bg-black text-white">

    {/* MAIN FOOTER */}
    <div
      className="
        border-b
        border-white/10
        px-6
        py-12
        sm:px-8
        md:px-16
        lg:px-32
        md:py-14
      "
    >

      <div
        className="
          mx-auto
          grid
          max-w-7xl
          grid-cols-1
          gap-10
          md:grid-cols-3
          md:gap-12
        "
      >

        {/* BRAND */}
        <div className="md:col-span-1">

          <Link href="/" className="inline-block">

            <h1
              className="
                max-w-md
                text-xl
                font-bold
                leading-tight
                text-orange-500
                transition-colors
                hover:text-orange-400
                sm:text-2xl
              "
            >
              Izzy Hotel and Home Amenities
            </h1>

          </Link>

          <div className="mt-4 h-1 w-12 rounded-full bg-orange-500" />

          <p
            className="
              mt-5
              max-w-lg
              text-sm
              leading-6
              text-gray-400
            "
          >
            We are dedicated to providing the best service possible.
            Our team is committed to ensuring your satisfaction with
            every interaction. If you have any questions or concerns,
            please don&apos;t hesitate to reach out to us.
          </p>

        </div>


        {/* COMPANY */}
        <div>

          <h2
            className="
              mb-5
              text-sm
              font-semibold
              uppercase
              tracking-wider
              text-orange-500
            "
          >
            Company
          </h2>

          <ul className="space-y-3 text-sm text-gray-400">

            <li>
              <Link
                href="/"
                className="
                  transition-colors
                  hover:text-orange-500
                "
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                href="/about"
                className="
                  transition-colors
                  hover:text-orange-500
                "
              >
                About Us
              </Link>
            </li>

            <li>
              <Link
                href="/contact"
                className="
                  transition-colors
                  hover:text-orange-500
                "
              >
                Contact Us
              </Link>
            </li>

            <li>
              <Link
                href="/privacy"
                className="
                  transition-colors
                  hover:text-orange-500
                "
              >
                Privacy Policy
              </Link>
            </li>

          </ul>

        </div>


        {/* CONTACT */}
        <div>

          <h2
            className="
              mb-5
              text-sm
              font-semibold
              uppercase
              tracking-wider
              text-orange-500
            "
          >
            Get In Touch
          </h2>

          <div className="space-y-4 text-sm text-gray-400">

            {/* WHATSAPP */}
            <div className="flex items-center gap-3">

              <div
                className="
                  flex
                  h-9
                  w-9
                  shrink-0
                  items-center
                  justify-center
                  rounded-lg
                  bg-orange-500/10
                "
              >
                <Image
                  src={assets.whatsapp_icon}
                  alt="WhatsApp"
                  width={18}
                  height={18}
                  className="object-contain"
                />
              </div>

              <p>
                09029129268
              </p>

            </div>


            {/* EMAIL */}
            <div className="flex items-start gap-3">

              <div
                className="
                  flex
                  h-9
                  w-9
                  shrink-0
                  items-center
                  justify-center
                  rounded-lg
                  bg-orange-500/10
                "
              >
                <Image
                  src={assets.email_icon}
                  alt="Email"
                  width={18}
                  height={18}
                  className="object-contain"
                />
              </div>

              <p className="break-all leading-5">
                izzyhotelandhomeamenities@gmail.com
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>


    {/* COPYRIGHT */}
    <div
      className="
        px-6
        py-5
        text-center
      "
    >

      <p className="text-xs text-gray-500 sm:text-sm">
        Copyright 2026 ©{" "}
        <span className="text-orange-500">
          Izzy Hotel and Home Amenities
        </span>{" "}
        — All Rights Reserved.
      </p>

    </div>

  </footer>
);
};

export default Footer;