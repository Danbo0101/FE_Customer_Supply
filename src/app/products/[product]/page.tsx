import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/storefront/ProductCard";
import {
  getAllCatalogProducts,
  getCatalogProduct,
  getRelatedCatalogProducts,
} from "@/data/catalog";

type ProductPageProps = {
  params: Promise<{
    product: string;
  }>;
};

export function generateStaticParams() {
  return getAllCatalogProducts().map((product) => ({
    product: product.id,
  }));
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { product: productId } = await params;
  const product = getCatalogProduct(productId);

  if (!product) {
    notFound();
  }

  const relatedProducts = getRelatedCatalogProducts(product.id);
  const galleryImages = [product.image, product.image, product.image];

  return (
    <>
      <section className="mx-auto grid w-full max-w-300 gap-12 px-6 py-12 sm:px-8 lg:grid-cols-[1.06fr_0.94fr] lg:px-10 lg:py-18">
        <div>
          <div className="relative mx-auto aspect-[0.72/1] w-full max-w-145 overflow-hidden bg-[#f6f7f8]">
            <Image
              src={product.image}
              alt={product.name}
              fill
              priority
              sizes="(min-width: 1024px) 520px, 90vw"
              className="object-cover"
            />
          </div>

          <div className="mt-8 grid grid-cols-3 gap-5 sm:max-w-120">
            {galleryImages.map((image, index) => (
              <button
                key={`${image}-${index}`}
                type="button"
                aria-label={`View product image ${index + 1}`}
                className={`relative aspect-square overflow-hidden bg-[#f6f7f8] ${
                  index === 0 ? "border border-[#20242b]" : ""
                }`}
              >
                <Image
                  src={image}
                  alt=""
                  fill
                  sizes="120px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        <div className="mx-auto w-full max-w-92 lg:pt-2">
          <Link
            href="/categories"
            className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#294f88] transition hover:text-[#1f3c68]"
          >
            Supply Shop
          </Link>

          <h1 className="mt-5 text-[34px] font-semibold leading-tight tracking-normal text-[#111318] sm:text-[44px] lg:text-[48px]">
            {product.name}
          </h1>

          <p className="mt-7 max-w-md text-[15px] leading-7 text-[#686d75]">
            {product.description}
          </p>

          <p className="mt-7 text-[18px] font-medium text-[#20242b]">
            {product.price}
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              className="rounded-full bg-[#294f88] px-7 py-3.5 text-[12px] font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-[#1f3c68]"
            >
              Add to bag
            </button>
            <button
              type="button"
              className="rounded-full border border-[#d8d2c8] px-7 py-3.5 text-[12px] font-semibold uppercase tracking-[0.18em] text-[#3f444d] transition hover:border-[#294f88] hover:text-[#294f88]"
            >
              Add to wishlist
            </button>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-300 px-6 pb-20 sm:px-8 lg:px-10">
        <h2 className="text-center text-[22px] font-semibold tracking-normal text-[#111318] sm:text-[26px]">
          You may also like
        </h2>

        <div className="mt-10 grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-4 lg:gap-x-8">
          {relatedProducts.map((relatedProduct) => (
            <ProductCard key={relatedProduct.id} product={relatedProduct} />
          ))}
        </div>
      </section>
    </>
  );
}
