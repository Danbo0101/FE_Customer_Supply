"use client";

import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import Link from "next/link";

const supportLinks = [
  { label: "Contact Us", href: "/customer/contact" },
  { label: "Privacy Policy", href: "/customer/privacy-policy" },
  { label: "Terms of Service", href: "/customer/terms-of-service" },
  { label: "Return Policy", href: "/customer/return-policy" },
  { label: "Store Locator", href: "/customer/store-locator" },
];

const legalLinks = [
  { label: "Privacy policy", href: "/customer/privacy-policy" },
  { label: "Terms of service", href: "/customer/terms-of-service" },
  { label: "Refund policy", href: "/customer/refund-policy" },
];

const socialLinks = [
  {
    label: "Facebook",
    href: "https://facebook.com",
    icon: <FacebookRoundedIcon sx={{ fontSize: 18 }} />,
  },
  {
    label: "Instagram",
    href: "https://instagram.com",
    icon: <InstagramIcon sx={{ fontSize: 18 }} />,
  },
  {
    label: "YouTube",
    href: "https://youtube.com",
    icon: <YouTubeIcon sx={{ fontSize: 21 }} />,
  },
];

export function CustomerFooter() {
  return (
    <footer className="mt-14 border-t border-[#eee9e2] bg-[#fcfbf8] text-[#66656a]">
      <section className="mx-auto flex w-full max-w-5xl flex-col items-center px-6 py-12 text-center sm:py-14">
        <h2 className="text-[13px] font-semibold uppercase tracking-[0.24em] text-[#17191f]">
          Support
        </h2>

        <nav
          aria-label="Support links"
          className="mt-7 flex flex-wrap items-center justify-center gap-x-7 gap-y-3 text-[13px] font-medium tracking-[0.03em] sm:text-[14px]"
        >
          {supportLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition duration-200 hover:text-[#294f88]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="mt-10 flex items-center justify-center gap-3">
          {socialLinks.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              aria-label={item.label}
              className="grid size-9 place-items-center rounded-full border border-[#e2ddd5] bg-white text-[#22242a] transition duration-200 hover:-translate-y-0.5 hover:border-[#294f88] hover:text-[#294f88] hover:shadow-[0_10px_24px_rgba(31,42,58,0.08)]"
            >
              {item.icon}
            </Link>
          ))}
        </div>
      </section>

      <section className="border-t border-[#e7e3dd]">
        <div className="mx-auto flex min-h-[76px] w-full max-w-5xl flex-wrap items-center justify-center gap-x-2.5 gap-y-2 px-6 py-5 text-[11px] tracking-[0.04em] text-[#77757a] sm:justify-start sm:text-[12px]">
          <span>© 2026, Supply</span>
          <span aria-hidden="true">·</span>
          <span>Powered by Shopify</span>

          {legalLinks.map((item) => (
            <span key={item.href} className="inline-flex items-center gap-x-2.5">
              <span aria-hidden="true">·</span>
              <Link
                href={item.href}
                className="transition duration-200 hover:text-[#294f88]"
              >
                {item.label}
              </Link>
            </span>
          ))}
        </div>
      </section>
    </footer>
  );
}
