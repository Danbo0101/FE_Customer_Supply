import Link from "next/link";

const flows = [
  {
    title: "Admin",
    href: "/admin",
    description: "Manage products, orders, inventory, and operations reports.",
    tone: "border-slate-200 bg-white hover:border-slate-400",
    badge: "Operations",
  },
  {
    title: "Customer",
    href: "/customer",
    description: "Browse categories, track orders, and manage shopping details.",
    tone: "border-emerald-200 bg-emerald-50 hover:border-emerald-400",
    badge: "Shopping",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-50 px-6 py-10 text-zinc-950">
      <section className="mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-6xl flex-col justify-center gap-10">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">
            Supply Shop
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-normal text-zinc-950 sm:text-6xl">
            Choose your workspace
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-zinc-600 sm:text-lg">
            Admin and customer areas are separated so each role can have its
            own layout, navigation, and access rules.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {flows.map((flow) => (
            <Link
              key={flow.href}
              href={flow.href}
              className={`group flex min-h-56 flex-col justify-between rounded-lg border p-6 shadow-sm transition ${flow.tone}`}
            >
              <div>
                <span className="inline-flex rounded-full bg-zinc-950 px-3 py-1 text-xs font-semibold text-white">
                  {flow.badge}
                </span>
                <h2 className="mt-6 text-3xl font-semibold tracking-normal">
                  {flow.title}
                </h2>
                <p className="mt-3 max-w-md text-sm leading-6 text-zinc-600">
                  {flow.description}
                </p>
              </div>
              <span className="mt-8 text-sm font-semibold text-zinc-950">
                Open {flow.title}
                <span className="ml-2 transition group-hover:translate-x-1">
                  -&gt;
                </span>
              </span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
