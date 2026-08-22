"use client";

import { useState } from "react";
import toast from "react-hot-toast";

export default function ContactForm() {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    const { name, email, message } = formData;

    // Basic validation
    if (!name.trim()) {
      toast.error("Please enter your name");
      return;
    }

    if (!email.trim()) {
      toast.error("Please enter your email");
      return;
    }

    if (!message.trim()) {
      toast.error("Please enter your message");
      return;
    }

    setLoading(true);

    // Your WhatsApp number
    const phoneNumber = "2349029129268";

    // Automatic WhatsApp message
    const whatsappMessage = `Hello Izzy Hotel and Home Amenities 👋

My name is ${name}.

Email: ${email}

I would like to make an enquiry.

Message:
${message}

Thank you.`;

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      whatsappMessage
    )}`;

    // Open WhatsApp
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");

    toast.success("Opening WhatsApp...");

    // Clear form
    setFormData({
      name: "",
      email: "",
      message: "",
    });

    setLoading(false);
  };

  return (
    <div className="w-full flex justify-center px-4 py-8 sm:px-6 lg:px-8">
      <div
        className="
          w-full
          max-w-2xl
          rounded-3xl
          border
          border-orange-100
          bg-white
          p-5
          sm:p-7
          md:p-9
          shadow-[0_20px_60px_rgba(0,0,0,0.08)]
          transition-shadow
          duration-300
          hover:shadow-[0_25px_70px_rgba(0,0,0,0.11)]
        "
      >
        {/* Header */}
        <div className="mb-8 flex flex-col items-center text-center">
          <div
            className="
              relative
              mb-5
              flex
              h-16
              w-16
              items-center
              justify-center
              rounded-2xl
              bg-orange-500
              shadow-lg
              shadow-orange-500/25
              transition-transform
              duration-300
              hover:-translate-y-1
            "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="h-8 w-8 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733C11.285 4.876 9.623 3.75 7.688 3.75 5.099 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
              />
            </svg>
          </div>

          <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Contact Us
          </h2>

          <p className="mt-2 max-w-md text-sm leading-relaxed text-gray-500">
            Have a question or need assistance? Send us a message directly on
            WhatsApp and we will get back to you.
          </p>
        </div>

        {/* Form */}
        <div className="space-y-5">

          {/* Name */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Your Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="
                w-full
                rounded-xl
                border
                border-gray-200
                bg-gray-50/70
                px-4
                py-3.5
                text-sm
                text-gray-900
                outline-none
                transition-all
                duration-200
                placeholder:text-gray-400
                hover:border-orange-300
                focus:border-orange-500
                focus:bg-white
                focus:ring-4
                focus:ring-orange-500/10
              "
            />
          </div>

          {/* Email */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Your Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="
                w-full
                rounded-xl
                border
                border-gray-200
                bg-gray-50/70
                px-4
                py-3.5
                text-sm
                text-gray-900
                outline-none
                transition-all
                duration-200
                placeholder:text-gray-400
                hover:border-orange-300
                focus:border-orange-500
                focus:bg-white
                focus:ring-4
                focus:ring-orange-500/10
              "
            />
          </div>

          {/* Message */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Your Message
            </label>

            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="How can we help you?"
              rows={5}
              className="
                w-full
                resize-none
                rounded-xl
                border
                border-gray-200
                bg-gray-50/70
                px-4
                py-3.5
                text-sm
                text-gray-900
                outline-none
                transition-all
                duration-200
                placeholder:text-gray-400
                hover:border-orange-300
                focus:border-orange-500
                focus:bg-white
                focus:ring-4
                focus:ring-orange-500/10
              "
            />
          </div>

          {/* WhatsApp Button */}
          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className="
              group
              relative
              mt-2
              flex
              w-full
              items-center
              justify-center
              gap-3
              overflow-hidden
              rounded-xl
              bg-[#25D366]
              px-5
              py-3.5
              text-sm
              font-semibold
              text-white
              shadow-lg
              shadow-green-500/20
              transition-all
              duration-300
              hover:-translate-y-0.5
              hover:bg-[#20bd5a]
              hover:shadow-xl
              hover:shadow-green-500/25
              active:translate-y-0
              disabled:cursor-not-allowed
              disabled:opacity-70
            "
          >
            {loading ? (
              <>
                <span
                  className="
                    h-5
                    w-5
                    animate-spin
                    rounded-full
                    border-2
                    border-white/30
                    border-t-white
                  "
                />

                <span>Opening WhatsApp...</span>
              </>
            ) : (
              <>
                {/* WhatsApp Icon */}
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="
                    h-5
                    w-5
                    transition-transform
                    duration-300
                    group-hover:scale-110
                  "
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.149-.669-1.611-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.372-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347Z" />
                  <path
                    fillRule="evenodd"
                    d="M12 2a10 10 0 0 0-8.944 14.472L2 22l5.528-1.056A10 10 0 1 0 12 2Zm0 18a8 8 0 0 1-4.088-1.12l-.292-.174-3.28.627.62-3.194-.19-.3A8 8 0 1 1 12 20Z"
                    clipRule="evenodd"
                  />
                </svg>

                <span>Send Message on WhatsApp</span>
              </>
            )}
          </button>

          <p className="text-center text-xs text-gray-400">
            Your message will open directly in WhatsApp.
          </p>
        </div>
      </div>
    </div>
  );
}