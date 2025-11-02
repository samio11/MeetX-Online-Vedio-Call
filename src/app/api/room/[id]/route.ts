// app/api/room/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";

let rooms: Record<string, string> = {};

// ✅ Correct typing for params (wrapped in a Promise)
export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const hostId = rooms[id];
  return NextResponse.json({ hostId: hostId || null });
}

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id: roomId } = await context.params;
  const body = await request.json();
  rooms[roomId] = body.id;
  return NextResponse.json({ success: true });
}
