import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user || session.user.role !== "admin") {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "Archivo requerido" }, { status: 400 });
    }

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: "Tipo de archivo no permitido. Use JPG, PNG, WebP o GIF." }, { status: 400 });
    }

    // Validate file size (max 2MB)
    const maxSize = 2 * 1024 * 1024; // 2MB
    if (file.size > maxSize) {
      return NextResponse.json({ error: "Archivo muy grande. Máximo 2MB." }, { status: 400 });
    }

    // Generate unique filename
    const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const filename = `${uuidv4()}.${ext}`;
    
    // Save to public/uploads
    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const filePath = path.join(uploadsDir, filename);
    const buffer = Buffer.from(await file.arrayBuffer());
    fs.writeFileSync(filePath, buffer);

    // Return the public URL
    const publicUrl = `/uploads/${filename}`;
    return NextResponse.json({ url: publicUrl, filename });

  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Error al subir imagen" }, { status: 500 });
  }
}