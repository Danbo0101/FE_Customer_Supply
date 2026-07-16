import Image from "next/image";
import Link from "next/link";
import { catalogCategories } from "@/data/catalog";

export default function CategoriesPage() {
  return (
    <>
      <section className="mx-auto w-full max-w-250 px-6 py-14 text-center sm:py-18">
        <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#8792a1]">
          Supply Shop
        </p>
        <h1 className="mt-3 text-[28px] font-semibold uppercase tracking-[0.14em] text-[#16191f] sm:text-[38px]">
          Categories
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-[13px] leading-6 text-[#74777d]">
          Browse every product family from skincare and face essentials to lash
          supplies and waxing tools.
        </p>
      </section>

      <section className="mx-auto grid w-full max-w-310 gap-x-8 gap-y-12 px-5 pb-20 sm:grid-cols-2 sm:px-8 lg:px-10">
        {catalogCategories.map((category) => (
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

            <div className="mt-4 border-b border-[#e5e0d7] pb-4 transition duration-300 group-hover:border-[#294f88]">
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-[13px] font-semibold uppercase tracking-[0.18em] text-[#1e2229] transition group-hover:text-[#294f88] sm:text-[14px]">
                  {category.label}
                </h2>
                <span
                  aria-hidden="true"
                  className="grid size-8 shrink-0 place-items-center rounded-full border border-[#d8d2c8] text-[17px] leading-none text-[#1e2229] transition duration-300 group-hover:translate-x-1 group-hover:border-[#294f88] group-hover:bg-[#294f88] group-hover:text-white"
                >
                  &rarr;
                </span>
              </div>
              <p className="mt-3 text-[13px] leading-6 text-[#74777d]">
                {category.description}
              </p>
            </div>
          </Link>
        ))}
      </section>
    </>
  );
}
