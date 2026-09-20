import { assets } from "@/public/assets/assets";
import Image from "next/image";

const HospitalitySolutions = () => {
  const solutions = [
    {
      title: "Hotel Amenities",
      description:
        "Quality essentials designed to help hotels, guest houses and hospitality businesses create a comfortable experience for every guest.",
      image: assets.hotel
    },
    {
      title: "Home Essentials",
      description:
        "Practical and quality amenities for everyday living, helping you create a more comfortable and welcoming home.",
      image: assets.home
    },
    {
      title: "Bedroom Essentials",
      description:
        "Comfortable bedding, towels, linens and other essentials designed for bedrooms in both hotels and homes.",
      image: assets.bedroom
    },
    {
      title: "Bathroom Amenities",
      description:
        "Quality towels and bathroom essentials that bring comfort, convenience and a better experience to every space.",
      image: assets.bathroom
    },
  ];

  return (
    <section className="w-full bg-white px-4 py-16 sm:px-6 sm:py-20 md:px-10 lg:px-16 xl:px-24">
      
      {/* Header */}
      <div className="mx-auto max-w-3xl text-center">

        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-orange-500">
          What We Provide
        </p>

        <h2 className="text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl lg:text-5xl">
          Hotel & Home Amenities
        </h2>

        <div className="mx-auto mt-4 h-1 w-12 rounded-full bg-orange-500" />

        <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-gray-500 sm:text-base">
          Quality amenities carefully selected to bring comfort, convenience
          and style to hotels, homes and everyday spaces.
        </p>

      </div>

      {/* Solutions Grid */}
      <div className="mx-auto mt-10 grid max-w-[1400px] grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">

        {solutions.map((solution, index) => (
          <div
            key={solution.title}
            className="
              group
              overflow-hidden
              rounded-3xl
              border
              border-gray-100
              bg-white
              shadow-sm
              transition-all
              duration-500
              hover:-translate-y-2
              hover:border-orange-100
              hover:shadow-xl
              hover:shadow-orange-500/10
            "
          >

            {/* Image */}
            <div className="relative h-56 w-full overflow-hidden bg-gray-100 sm:h-60">

              <Image
                src={solution.image}
                alt={solution.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="
                  object-cover
                  transition-transform
                  duration-700
                  group-hover:scale-110
                "
              />

              {/* Image overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

              {/* Number */}
              <div className="
                absolute
                left-4
                top-4
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-full
                border
                border-white/30
                bg-black/20
                text-xs
                font-semibold
                text-white
                backdrop-blur-md
              ">
                {String(index + 1).padStart(2, "0")}
              </div>

            </div>

            {/* Content */}
            <div className="p-6">

              <h3 className="
                text-lg
                font-bold
                tracking-tight
                text-gray-950
                transition-colors
                duration-300
                group-hover:text-orange-500
              ">
                {solution.title}
              </h3>

              <p className="
                mt-3
                text-sm
                leading-6
                text-gray-500
              ">
                {solution.description}
              </p>

              <div className="
                mt-5
                flex
                items-center
                gap-2
                text-sm
                font-semibold
                text-orange-500
              ">
                <span>Explore</span>

                <span className="
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                ">
                  →
                </span>
              </div>

            </div>

          </div>
        ))}

      </div>

      {/* Bottom CTA */}
      <div className="
        mx-auto
        mt-10
        max-w-[1400px]
        overflow-hidden
        rounded-3xl
        bg-[#0b0b0b]
        px-6
        py-10
        text-white
        sm:px-10
        sm:py-12
        lg:px-14
      ">

        <div className="
          flex
          flex-col
          gap-6
          lg:flex-row
          lg:items-center
          lg:justify-between
        ">

          <div className="max-w-2xl">

            <p className="
              text-xs
              font-semibold
              uppercase
              tracking-[0.2em]
              text-orange-400
            ">
              Comfort For Every Space
            </p>

            <h3 className="
              mt-2
              text-2xl
              font-bold
              tracking-tight
              sm:text-3xl
            ">
              Quality amenities for hotels and homes.
            </h3>

            <p className="
              mt-3
              max-w-xl
              text-sm
              leading-6
              text-gray-400
              sm:text-base
            ">
              Whether you are creating a comfortable home or managing a
              hospitality space, we have the essentials you need.
            </p>

          </div>

          <button
            type="button"
            className="
              inline-flex
              w-fit
              items-center
              gap-2
              rounded-xl
              bg-orange-500
              px-6
              py-3.5
              text-sm
              font-semibold
              text-white
              shadow-lg
              shadow-orange-500/20
              transition-all
              duration-300
              hover:-translate-y-1
              hover:bg-orange-600
              hover:shadow-xl
              hover:shadow-orange-500/30
            "
          >
            Shop Amenities

            <span className="text-lg">
              →
            </span>
          </button>

        </div>

      </div>

    </section>
  );
};

export default HospitalitySolutions;