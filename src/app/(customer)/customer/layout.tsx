import { CustomerFooter } from "@/components/customer/CustomerFooter";
import { CustomerHeader } from "@/components/customer/CustomerHeader";

export default function CustomerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-white text-zinc-950">
      <CustomerHeader />
      <main>{children}</main>
      <CustomerFooter />
    </div>
  );
}
