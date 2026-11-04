import { NextResponse } from "next/server";
import { validateInquiry, type InquiryInput } from "@/lib/validation";

export async function POST(req: Request) {
  let body: InquiryInput;
  try { body = await req.json(); } catch { return NextResponse.json({ error: "invalid_json" }, { status: 400 }); }
  if (body.website) return NextResponse.json({ ok: true }); // honeypot: silently drop bots
  const errors = validateInquiry(body);
  if (Object.keys(errors).length) return NextResponse.json({ error: "validation", errors }, { status: 422 });

  const hook = process.env.INQUIRY_WEBHOOK_URL;
  if (!hook) return NextResponse.json({ error: "not_configured" }, { status: 503 }); // never pretend it was delivered
  try {
    const r = await fetch(hook, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...body, receivedAt: new Date().toISOString() }) });
    if (!r.ok) throw new Error(String(r.status));
    return NextResponse.json({ ok: true });
  } catch { return NextResponse.json({ error: "delivery_failed" }, { status: 502 }); }
}
