import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Pagination } from "@/components/storefront/Pagination";
import { ProductCard } from "@/components/storefront/ProductCard";
import { catalogCategories, getCatalogCategoryChild } from "@/data/catalog";

const productsPerPage = 8;

type ChildCategoryPageProps = {
  params: Promise<{
    category: string;
    child: string;
  }>;
  searchParams: Promise<{
    page?: string | string[];
  }>;
};

export function generateStaticParams() {
  return catalogCategories.flatMap((category) =>
    category.children.map((child) => ({
      category: category.slug,
      child: child.slug,
    })),
  );
}

function getCurrentPage(pageParam: string | string[] | undefined) {
  const rawPage = Array.isArray(pageParam) ? pageParam[0] : pageParam;
  const page = Number(rawPage ?? "1");

  return Number.isInteger(page) && page > 0 ? page : 1;
}

export default async function ChildCategoryPage({
  params,
  searchParams,
}: ChildCategoryPageProps) {
  const { category: categorySlug, child: childSlug } = await params;
  const { page } = await searchParams;
  const result = getCatalogCategoryChild(categorySlug, childSlug);

  if (!result) {
    notFound();
  }

  const { category, childCategory } = result;
  const totalPages = Math.ceil(childCategory.products.length / productsPerPage);
  const currentPage = Math.min(getCurrentPage(page), totalPages);
  const startIndex = (currentPage - 1) * productsPerPage;
  const products = childCategory.products.slice(
    startIndex,
    startIndex + productsPerPage,
  );

  return (
    <>
      <section className="relative h-62 w-full overflow-hidden bg-[#e9eef5] sm:h-76 lg:h-90">
        <Image
          src={category.image}
          alt={childCategory.label}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[#17233a]/25" />
        <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.34em] text-white/80">
              {category.label}
            </p>
            <h1 className="mt-4 text-[34px] font-semibold uppercase tracking-[0.14em] text-white drop-shadow-sm sm:text-[48px]">
              {childCategory.label}
            </h1>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-310 px-5 py-12 sm:px-8 lg:px-10 lg:py-16">
        <div className="mx-auto max-w-2xl text-center">
          <Link
            href={category.href}
            className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#294f88] transition hover:text-[#1f3c68]"
          >
            {category.label}
          </Link>
          <h2 className="mt-4 text-[22px] font-semibold uppercase tracking-[0.14em] text-[#16191f]">
            {childCategory.label}
          </h2>
          <p className="mt-4 text-[13px] leading-6 text-[#74777d]">
            {childCategory.description}
          </p>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-y border-[#e7e1d8] py-4 text-[12px] text-[#74777d] sm:flex-row sm:items-center sm:justify-between">
          <p>
            Showing {startIndex + 1}-{startIndex + products.length} of{" "}
            {childCategory.products.length} products
          </p>
          <p>
            Page {currentPage} of {totalPages}
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-4 lg:gap-x-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          baseHref={childCategory.href}
        />
      </section>
    </>
  );
}
