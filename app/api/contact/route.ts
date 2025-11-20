import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const formData = await request.formData();
  const payload = Object.fromEntries(formData.entries());
  console.log("Contact request", payload);
  // TODO: integrate Resend in Phase 5
  return NextResponse.json({ ok: true });
}
