"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function RunPipelineButton({ auditId }: { auditId: string }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleRun() {
    setLoading(true);
    await fetch(`/api/audit/${auditId}/run`, {
      method: "POST",
      headers: { "x-admin-password": "session" },
    });
    setLoading(false);
    router.refresh();
  }

  return (
    <button
      onClick={handleRun}
      className="btn btn-primary"
      disabled={loading}
    >
      {loading ? "Running..." : "Run pipeline"}
    </button>
  );
}
