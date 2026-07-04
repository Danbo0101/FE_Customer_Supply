const metrics = [
  { label: "New orders", value: "24", note: "Need processing today" },
  { label: "Low-stock items", value: "8", note: "Below minimum stock level" },
  { label: "Revenue", value: "$5.1k", note: "Estimated today" },
];

const tasks = [
  "Review orders waiting for confirmation",
  "Update inventory for best sellers",
  "Approve new supplier requests",
];

export default function AdminPage() {
  return (
    <section className="space-y-6">
      <div className="rounded-lg border border-zinc-200 bg-white p-6">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-sky-700">
          Admin
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-normal">
          Admin dashboard
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-600">
          A workspace for the operations team to track orders, products, and
          Supply Shop performance.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {metrics.map((metric) => (
          <div
            key={metric.label}
            className="rounded-lg border border-zinc-200 bg-white p-5"
          >
            <p className="text-sm font-medium text-zinc-500">{metric.label}</p>
            <p className="mt-3 text-3xl font-bold">{metric.value}</p>
            <p className="mt-2 text-sm text-zinc-600">{metric.note}</p>
          </div>
        ))}
      </div>

      <div className="rounded-lg border border-zinc-200 bg-white p-6">
        <h2 className="text-lg font-semibold">Action items</h2>
        <ul className="mt-4 space-y-3">
          {tasks.map((task) => (
            <li
              key={task}
              className="flex items-center justify-between rounded-md bg-zinc-50 px-4 py-3 text-sm text-zinc-700"
            >
              <span>{task}</span>
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-emerald-700">
                Open
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
