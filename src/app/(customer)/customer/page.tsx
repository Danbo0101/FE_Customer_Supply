import Image from "next/image";
import Link from "next/link";

const categories = [
  {
    label: "Skincare",
    href: "/customer/categories/skincare",
    image: "/category-skincare-tools.png",
  },
  {
    label: "Face",
    href: "/customer/categories/face",
    image: "/category-face.png",
  },
  {
    label: "Lash",
    href: "/customer/categories/lash",
    image: "/category-lashes.png",
  },
  {
    label: "Wax",
    href: "/customer/categories/wax",
    image: "/category-body-feet.png",
  },
];

export default function CustomerPage() {
  return (
    <>
      <section className="relative h-[320px] w-full overflow-hidden bg-[#e8eef5] sm:h-[420px] lg:h-[520px]">
        <Image
          src="/customer-hero.png"
          alt="Curated beauty supply products"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </section>

      <section className="mx-auto w-full max-w-[1240px] px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
        <div className="mx-auto max-w-xl text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#8792a1]">
            Curated edit
          </p>
          <h2 className="mt-3 text-[22px] font-semibold uppercase leading-none tracking-[0.14em] text-[#16191f] sm:text-[26px]">
            View By Category
          </h2>
        </div>

        <div className="mt-11 grid gap-x-8 gap-y-12 sm:grid-cols-2">
          {categories.map((category) => (
            <Link
              key={category.href}
              href={category.href}
              className="group block"
            >
              <div className="border border-[#e5e0d7] bg-[#fbfaf7] p-2 transition duration-300 group-hover:border-[#cdd9e8] group-hover:shadow-[0_18px_44px_rgba(31,42,58,0.08)]">
                <div className="relative aspect-[1.12/1] w-full overflow-hidden bg-[#eef3f7]">
                  <Image
                    src={category.image}
                    alt={category.label}
                    fill
                    sizes="(min-width: 1024px) 560px, (min-width: 640px) 44vw, 100vw"
                    className="object-cover transition duration-700 ease-out group-hover:scale-[1.04]"
                  />
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between gap-4 border-b border-[#e5e0d7] pb-3 transition duration-300 group-hover:border-[#294f88]">
                <span className="text-[13px] font-semibold uppercase tracking-[0.18em] text-[#1e2229] transition group-hover:text-[#294f88] sm:text-[14px]">
                  {category.label}
                </span>
                <span
                  aria-hidden="true"
                  className="grid size-8 shrink-0 place-items-center rounded-full border border-[#d8d2c8] text-[17px] leading-none text-[#1e2229] transition duration-300 group-hover:translate-x-1 group-hover:border-[#294f88] group-hover:bg-[#294f88] group-hover:text-white"
                >
                  &rarr;
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
