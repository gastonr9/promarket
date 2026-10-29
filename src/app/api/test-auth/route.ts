import { NextResponse } from "next/server";
import { getSettings } from "@/lib/sanity/index";
import { compare } from "bcryptjs";

export async function GET() {
  const settings = await getSettings();
  
  console.log("[DEBUG] Settings from getSettings:", {
    adminEmail: settings.adminEmail,
    hasHash: !!settings.adminPasswordHash,
    hashPreview: settings.adminPasswordHash?.substring(0, 20)
  });
  
  const isValid = await compare("admin123", settings.adminPasswordHash || "");
  console.log("[DEBUG] Password compare result:", isValid);
  
  return NextResponse.json({
    adminEmail: settings.adminEmail,
    hasHash: !!settings.adminPasswordHash,
    hashPreview: settings.adminPasswordHash?.substring(0, 20),
    compareResult: isValid
  });
}