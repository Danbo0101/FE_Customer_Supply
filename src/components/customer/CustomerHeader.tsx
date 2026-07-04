"use client";

import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useState } from "react";
import { CustomerCartDrawer } from "./CustomerCartDrawer";
import { CustomerSearch } from "./CustomerSearch";

const menuColumns = [
  {
    title: "Skincare",
    items: [
      { label: "Face", href: "/customer/categories/skincare/face" },
      { label: "Body", href: "/customer/categories/skincare/body" },
      { label: "Lip", href: "/customer/categories/skincare/lip" },
      { label: "Eye", href: "/customer/categories/skincare/eye" },
    ],
  },
  {
    title: "Face",
    items: [
      { label: "Foundation", href: "/customer/categories/face/foundation" },
      { label: "Powder", href: "/customer/categories/face/powder" },
      { label: "Blush", href: "/customer/categories/face/blush" },
      { label: "Concealer", href: "/customer/categories/face/concealer" },
    ],
  },
  {
    title: "Lash",
    items: [
      { label: "Extensions", href: "/customer/categories/lash/extensions" },
      { label: "Glue", href: "/customer/categories/lash/glue" },
      { label: "Tools", href: "/customer/categories/lash/tools" },
      { label: "Care", href: "/customer/categories/lash/care" },
    ],
  },
  {
    title: "Wax",
    items: [
      { label: "Hard Wax", href: "/customer/categories/wax/hard-wax" },
      { label: "Soft Wax", href: "/customer/categories/wax/soft-wax" },
      { label: "Accessories", href: "/customer/categories/wax/accessories" },
      { label: "After Care", href: "/customer/categories/wax/after-care" },
    ],
  },
];

type ActivePanel = "menu" | "search" | "cart" | null;

export function CustomerHeader() {
  const [activePanel, setActivePanel] = useState<ActivePanel>(null);
  const isMenuOpen = activePanel === "menu";

  return (
    <header className="sticky top-0 z-50 bg-[#294f88] text-white shadow-[0_10px_28px_rgba(18,34,60,0.14)]">
      <div className="relative mx-auto flex h-[92px] w-full max-w-[1680px] items-center px-5 sm:px-10 lg:px-20">
        <button
          type="button"
          aria-expanded={isMenuOpen}
          aria-controls="customer-category-menu"
          onClick={() =>
            setActivePanel((current) => (current === "menu" ? null : "menu"))
          }
          className={`group relative inline-flex items-center gap-1.5 py-2 text-white/86 transition duration-300 hover:text-white ${
            isMenuOpen ? "text-white" : ""
          }`}
        >
          <span className="text-[13px] font-semibold uppercase leading-none tracking-[0.2em] sm:text-[14px]">
            Supply
          </span>

          <ExpandMoreRoundedIcon
            className={`transition duration-300 ${
              isMenuOpen ? "rotate-180" : "rotate-0"
            }`}
            sx={{ fontSize: 20 }}
          />

          <span
            className={`absolute -bottom-0.5 left-0 h-px bg-white transition-all duration-300 ${
              isMenuOpen
                ? "w-full opacity-100"
                : "w-0 opacity-0 group-hover:w-full group-hover:opacity-100"
            }`}
          />
        </button>

        <div className="pointer-events-none absolute left-1/2 top-1/2 h-14 w-60 -translate-x-1/2 -translate-y-1/2" />

        <div className="ml-auto flex items-center gap-3 sm:gap-4">
          <CustomerSearch
            isOpen={activePanel === "search"}
            onOpenChange={(isOpen) => setActivePanel(isOpen ? "search" : null)}
          />

          <CustomerCartDrawer
            isOpen={activePanel === "cart"}
            onOpenChange={(isOpen) => setActivePanel(isOpen ? "cart" : null)}
          />
        </div>
      </div>

      <AnimatePresence initial={false}>
        {isMenuOpen && (
          <motion.div
            id="customer-category-menu"
            initial={{ height: 0, opacity: 0, y: -8 }}
            animate={{ height: "auto", opacity: 1, y: 0 }}
            exit={{ height: 0, opacity: 0, y: -8 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-[#dce7f3] border-b border-[#e6e1d8] bg-[#fcfbf8] text-[#55565a] shadow-[0_18px_44px_rgba(27,42,63,0.1)]"
          >
            <div className="mx-auto w-full max-w-[1120px] px-6 py-8 sm:px-10 lg:px-12">
              <div className="grid gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
                {menuColumns.map((column) => (
                  <motion.div
                    key={column.title}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.28, ease: "easeOut" }}
                    className="text-left lg:border-l lg:border-[#ebe6dd] lg:first:border-l-0 lg:first:pl-0 lg:pl-8"
                  >
                    <div>
                      <h3 className="text-[13px] font-semibold uppercase tracking-[0.18em] text-[#20242b]">
                        {column.title}
                      </h3>
                      <div className="mt-3 h-px w-7 bg-[#93d1c7]" />
                    </div>

                    <ul className="mt-4 space-y-2.5">
                      {column.items.map((item) => (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            onClick={() => setActivePanel(null)}
                            className="inline-block text-[13px] leading-6 text-[#686d75] transition duration-200 hover:translate-x-0.5 hover:text-[#294f88]"
                          >
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
