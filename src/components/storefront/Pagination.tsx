import Link from "next/link";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  baseHref: string;
};

function pageHref(baseHref: string, page: number) {
  return page === 1 ? baseHref : `${baseHref}?page=${page}`;
}

function getPageNumbers(currentPage: number, totalPages: number) {
  const pages = new Set([
    1,
    totalPages,
    currentPage - 1,
    currentPage,
    currentPage + 1,
  ]);

  return Array.from(pages)
    .filter((page) => page >= 1 && page <= totalPages)
    .sort((a, b) => a - b);
}

export function Pagination({
  currentPage,
  totalPages,
  baseHref,
}: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const pages = getPageNumbers(currentPage, totalPages);
  const previousPage = Math.max(currentPage - 1, 1);
  const nextPage = Math.min(currentPage + 1, totalPages);

  return (
    <nav
      aria-label="Pagination"
      className="mt-12 flex flex-wrap items-center justify-center gap-2"
    >
      <Link
        href={pageHref(baseHref, previousPage)}
        aria-disabled={currentPage === 1}
        className={`rounded-full border px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.14em] transition ${
          currentPage === 1
            ? "pointer-events-none border-[#e6e1d8] text-[#b9b1a7]"
            : "border-[#d8d2c8] text-[#4f555f] hover:border-[#294f88] hover:text-[#294f88]"
        }`}
      >
        Prev
      </Link>

      {pages.map((page, index) => {
        const previous = pages[index - 1];
        const hasGap = previous !== undefined && page - previous > 1;

        return (
          <span key={page} className="inline-flex items-center gap-2">
            {hasGap && (
              <span className="px-1 text-[12px] text-[#9aa3ae]">...</span>
            )}
            <Link
              href={pageHref(baseHref, page)}
              aria-current={currentPage === page ? "page" : undefined}
              className={`grid size-9 place-items-center rounded-full border text-[13px] font-semibold transition ${
                currentPage === page
                  ? "border-[#294f88] bg-[#294f88] text-white"
                  : "border-[#d8d2c8] text-[#4f555f] hover:border-[#294f88] hover:text-[#294f88]"
              }`}
            >
              {page}
            </Link>
          </span>
        );
      })}

      <Link
        href={pageHref(baseHref, nextPage)}
        aria-disabled={currentPage === totalPages}
        className={`rounded-full border px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.14em] transition ${
          currentPage === totalPages
            ? "pointer-events-none border-[#e6e1d8] text-[#b9b1a7]"
            : "border-[#d8d2c8] text-[#4f555f] hover:border-[#294f88] hover:text-[#294f88]"
        }`}
      >
        Next
      </Link>
    </nav>
  );
}
