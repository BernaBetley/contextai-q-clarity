import puppeteer from "puppeteer-core";
import { db } from "../db";
import { reports } from "../db/schema";
import { eq } from "drizzle-orm";

export async function generateReportPdf(auditId: string): Promise<string> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const reportUrl = `${siteUrl}/report/${auditId}?format=pdf`;

  // In production, point to a Chromium binary (e.g. @sparticuz/chromium on Lambda,
  // or the system chromium on Railway/Fly.io).
  const executablePath =
    process.env.CHROMIUM_PATH ?? "/usr/bin/chromium-browser";

  const browser = await puppeteer.launch({
    headless: true,
    executablePath,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  try {
    const page = await browser.newPage();
    await page.goto(reportUrl, { waitUntil: "networkidle0", timeout: 60_000 });

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: { top: "48px", bottom: "48px", left: "48px", right: "48px" },
    });

    // Store PDF URL (in production, upload to S3/Supabase Storage)
    // For now, save to a predictable path
    const pdfPath = `/reports/${auditId}.pdf`;
    const fs = await import("fs/promises");
    const dir = `${process.cwd()}/public/reports`;
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(`${dir}/${auditId}.pdf`, pdfBuffer);

    // Update report record
    await db
      .update(reports)
      .set({ pdfUrl: pdfPath })
      .where(eq(reports.auditId, auditId));

    return pdfPath;
  } finally {
    await browser.close();
  }
}
