import { NextResponse } from "next/server";
import { createReservation } from "@/lib/booking";

export async function POST(request: Request) {
  const body = await request.json();
  try {
    const reservation = await createReservation({
      staff_id: body.staff_id,
      start: body.start,
      end: body.end,
      customer_email: body.email,
    });
    return NextResponse.json(reservation);
  } catch (error: unknown) {
    console.error(error);
    const message = error instanceof Error ? error.message : "Fehler";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
