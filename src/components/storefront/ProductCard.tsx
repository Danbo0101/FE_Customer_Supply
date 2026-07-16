import Image from "next/image";
import Link from "next/link";
import type { CatalogProduct } from "@/data/catalog";

export function ProductCard({ product }: { product: CatalogProduct }) {
  return (
    <Link href={`/products/${product.id}`} className="group block">
      <div className="border border-[#e7e1d8] bg-white p-2 transition duration-300 group-hover:border-[#cdd9e8] group-hover:shadow-[0_16px_38px_rgba(31,42,58,0.08)]">
        <div className="relative aspect-[0.86/1] overflow-hidden bg-[#f1f4f7]">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 260px, (min-width: 640px) 30vw, 48vw"
            className="object-cover transition duration-700 group-hover:scale-[1.04]"
          />
        </div>
      </div>

      <div className="mt-3 text-center">
        <h3 className="mx-auto max-w-55 text-[13px] font-semibold leading-5 text-[#20242b]">
          {product.name}
        </h3>
        <p className="mt-1 text-[13px] text-[#6f737a]">{product.price}</p>
      </div>
    </Link>
  );
}
