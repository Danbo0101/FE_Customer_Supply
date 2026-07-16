import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { catalogCategories, getCatalogCategory } from "@/data/catalog";
import { ProductCard } from "@/components/storefront/ProductCard";

type CategoryPageProps = {
  params: Promise<{
    category: string;
  }>;
};

export function generateStaticParams() {
  return catalogCategories.map((category) => ({
    category: category.slug,
  }));
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: categorySlug } = await params;
  const category = getCatalogCategory(categorySlug);

  if (!category) {
    notFound();
  }

  return (
    <>
      <section className="relative h-70 w-full overflow-hidden bg-[#e9eef5] sm:h-86 lg:h-98">
        <Image
          src={category.image}
          alt={category.label}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[#17233a]/20" />
        <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.34em] text-white/80">
              Category
            </p>
            <h1 className="mt-4 text-[38px] font-semibold uppercase tracking-[0.14em] text-white drop-shadow-sm sm:text-[54px]">
              {category.label}
            </h1>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-250 px-6 py-12 text-center sm:py-14">
        <h2 className="text-[22px] font-semibold uppercase tracking-[0.14em] text-[#16191f]">
          {category.label}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-[13px] leading-6 text-[#74777d]">
          {category.description}
        </p>
      </section>

      <section className="mx-auto w-full max-w-310 space-y-18 px-5 pb-20 sm:px-8 lg:px-10">
        {category.children.map((child) => (
          <section key={child.slug} className="border-t border-[#e7e1d8] pt-9">
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[#9aa3ae]">
                  {category.label}
                </p>
                <h2 className="mt-2 text-[21px] font-semibold uppercase tracking-[0.14em] text-[#20242b]">
                  {child.label}
                </h2>
                <p className="mt-3 max-w-xl text-[13px] leading-6 text-[#74777d]">
                  {child.description}
                </p>
              </div>

              <Link
                href={child.href}
                className="inline-flex w-fit items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.16em] text-[#294f88] transition hover:gap-3"
              >
                View all
                <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-4 lg:gap-x-8">
              {child.products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        ))}
      </section>
    </>
  );
}
