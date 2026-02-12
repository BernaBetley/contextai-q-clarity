import { redirect } from "next/navigation";
import Link from "next/link";
import { isAuthenticated } from "@/lib/auth";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!isAuthenticated()) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <nav className="w-56 bg-surface-900 text-white flex flex-col flex-shrink-0">
        <div className="p-5 border-b border-surface-700">
          <p className="font-semibold text-sm">ContextAI Q</p>
          <p className="text-xs text-surface-400 mt-0.5">Audit Engine</p>
        </div>

        <div className="flex-1 py-4">
          <Link
            href="/admin"
            className="flex items-center gap-3 px-5 py-2.5 text-sm text-surface-300 hover:text-white hover:bg-surface-800 transition-colors"
          >
            Dashboard
          </Link>
          <Link
            href="/admin/new"
            className="flex items-center gap-3 px-5 py-2.5 text-sm text-surface-300 hover:text-white hover:bg-surface-800 transition-colors"
          >
            New Audit
          </Link>
        </div>

        <div className="p-5 border-t border-surface-700">
          <p className="text-xs text-surface-500">v0.1.0</p>
        </div>
      </nav>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-6xl mx-auto p-8">{children}</div>
      </main>
    </div>
  );
}
