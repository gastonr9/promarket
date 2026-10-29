import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type");
  console.log("[TEST-CALLBACK] Content-Type:", contentType);
  
  const body = await request.text();
  console.log("[TEST-CALLBACK] Raw body:", body);
  
  try {
    const parsed = JSON.parse(body);
    console.log("[TEST-CALLBACK] Parsed body:", parsed);
  } catch {
    console.log("[TEST-CALLBACK] Failed to parse as JSON");
  }
  
  return NextResponse.json({ received: true });
}