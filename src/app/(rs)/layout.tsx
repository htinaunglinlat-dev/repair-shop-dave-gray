import { Header } from "@/components/section/Header";

export default function RSLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="mx-auto w-full max-w-7xl">
      {/* Header */}
      <Header />
      <div className="px-4 py-2">{children}</div>
    </section>
  );
}
