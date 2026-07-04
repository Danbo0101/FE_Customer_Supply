"use client";

import AddRoundedIcon from "@mui/icons-material/AddRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useEffect } from "react";

type CustomerCartDrawerProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
};

const cartPreviewItems = [
  {
    id: 1,
    name: "Premium Nail Care Set",
    option: "Soft blue",
    price: "$24.00",
    quantity: 1,
  },
  {
    id: 2,
    name: "Travel Beauty Pouch",
    option: "Ivory",
    price: "$18.00",
    quantity: 2,
  },
];

export function CustomerCartDrawer({
  isOpen,
  onOpenChange,
}: CustomerCartDrawerProps) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        aria-label="Cart"
        aria-expanded={isOpen}
        aria-controls="customer-cart-drawer"
        onClick={() => onOpenChange(true)}
        className="grid size-11 place-items-center rounded-full border border-white/15 bg-white/[0.06] text-white/90 transition duration-300 hover:border-white/30 hover:bg-white hover:text-[#2d528c]"
      >
        <ShoppingCartOutlinedIcon sx={{ fontSize: 28 }} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[80]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              type="button"
              aria-label="Close cart"
              onClick={() => onOpenChange(false)}
              className="absolute inset-0 cursor-default bg-[#0d1830]/45 backdrop-blur-[2px]"
            />

            <motion.aside
              id="customer-cart-drawer"
              role="dialog"
              aria-modal="true"
              aria-label="Shopping cart"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
              className="absolute right-0 top-0 flex h-full w-full max-w-[430px] flex-col bg-[#fbfaf7] text-[#272a31] shadow-[-22px_0_55px_rgba(13,24,48,0.2)]"
            >
              <div className="flex items-center justify-between border-b border-[#e6e1d8] px-6 py-5">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#8c8273]">
                    Your Cart
                  </p>
                  <h2 className="mt-1 text-2xl font-semibold text-[#262a31]">
                    Shopping Bag
                  </h2>
                </div>

                <button
                  type="button"
                  aria-label="Close cart"
                  onClick={() => onOpenChange(false)}
                  className="grid size-10 place-items-center rounded-full border border-[#ddd6ca] text-[#55565a] transition hover:border-[#2d528c] hover:text-[#2d528c]"
                >
                  <CloseRoundedIcon sx={{ fontSize: 24 }} />
                </button>
              </div>

              <div className="flex-1 space-y-5 overflow-y-auto px-6 py-6">
                {cartPreviewItems.map((item) => (
                  <div
                    key={item.id}
                    className="grid grid-cols-[92px_1fr] gap-4 rounded-md border border-[#e8e1d7] bg-white p-3 shadow-[0_14px_32px_rgba(39,42,49,0.06)]"
                  >
                    <div className="relative aspect-square overflow-hidden rounded-md bg-[#eef3f7]">
                      <div className="absolute inset-x-3 bottom-3 h-10 rounded-md bg-white/70" />
                      <div className="absolute left-1/2 top-1/2 size-12 -translate-x-1/2 -translate-y-1/2 rounded-md border border-white/80 bg-[#d9e5ee]" />
                    </div>

                    <div className="flex min-w-0 flex-col">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <h3 className="line-clamp-2 text-[15px] font-semibold leading-5 text-[#262a31]">
                            {item.name}
                          </h3>
                          <p className="mt-1 text-[13px] text-[#81796f]">
                            {item.option}
                          </p>
                        </div>

                        <button
                          type="button"
                          aria-label={`Remove ${item.name} from cart`}
                          className="grid size-8 shrink-0 place-items-center rounded-full text-[#9a9186] transition hover:bg-[#f3eee7] hover:text-[#294f88]"
                        >
                          <DeleteOutlineRoundedIcon sx={{ fontSize: 20 }} />
                        </button>
                      </div>

                      <div className="mt-auto flex items-end justify-between gap-3 pt-4">
                        <div className="inline-flex items-center rounded-full border border-[#ddd6ca] bg-[#fbfaf7] p-0.5 text-sm text-[#55565a]">
                          <button
                            type="button"
                            aria-label={`Decrease ${item.name} quantity`}
                            className="grid size-8 place-items-center rounded-full transition hover:bg-white hover:text-[#294f88] hover:shadow-sm"
                          >
                            <RemoveRoundedIcon sx={{ fontSize: 17 }} />
                          </button>

                          <span className="min-w-8 text-center text-sm font-semibold text-[#30333a]">
                            {item.quantity}
                          </span>

                          <button
                            type="button"
                            aria-label={`Increase ${item.name} quantity`}
                            className="grid size-8 place-items-center rounded-full transition hover:bg-white hover:text-[#294f88] hover:shadow-sm"
                          >
                            <AddRoundedIcon sx={{ fontSize: 17 }} />
                          </button>
                        </div>

                        <p className="text-[15px] font-semibold text-[#294f88]">
                          {item.price}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-[#e6e1d8] bg-white px-6 py-5">
                <div className="mb-4 flex items-center justify-between text-base font-semibold text-[#272a31]">
                  <span>Subtotal</span>
                  <span>$60.00</span>
                </div>

                <Link
                  href="/customer/checkout"
                  onClick={() => onOpenChange(false)}
                  className="block rounded-full bg-[#2d528c] px-5 py-3.5 text-center text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-[#243f6d]"
                >
                  Checkout
                </Link>

                <button
                  type="button"
                  onClick={() => onOpenChange(false)}
                  className="mt-3 w-full rounded-full px-5 py-3 text-sm font-semibold text-[#55565a] transition hover:text-[#2d528c]"
                >
                  Continue shopping
                </button>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
