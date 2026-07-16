"use client";

import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

type SearchControlProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
};

export function SearchControl({ isOpen, onOpenChange }: SearchControlProps) {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <form
      role="search"
      onSubmit={(event) => event.preventDefault()}
      className="flex items-center gap-2"
    >
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ width: 0, opacity: 0, x: 16 }}
            animate={{ width: 240, opacity: 1, x: 0 }}
            exit={{ width: 0, opacity: 0, x: 16 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <input
              autoFocus
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search products"
              className="h-11 w-60 rounded-full border border-white/20 bg-white px-4 text-sm font-medium text-[#263247] outline-none transition placeholder:text-[#8b93a2] focus:border-white focus:ring-4 focus:ring-white/20"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        aria-label="Search"
        aria-expanded={isOpen}
        onClick={() => onOpenChange(!isOpen)}
        className={`grid size-11 place-items-center rounded-full border text-white/90 transition duration-300 hover:border-white/30 hover:bg-white hover:text-[#2d528c] ${
          isOpen
            ? "border-white/30 bg-white text-[#2d528c]"
            : "border-white/15 bg-white/6"
        }`}
      >
        <SearchOutlinedIcon sx={{ fontSize: 28 }} />
      </button>
    </form>
  );
}
