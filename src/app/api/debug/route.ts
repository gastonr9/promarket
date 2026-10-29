import { NextResponse } from "next/server";
import * as path from "path";
import * as fs from "fs";

export async function GET() {
  const cwd = process.cwd();
  const dataFile = path.join(cwd, "src", "data", "products.json");
  
  return NextResponse.json({
    cwd,
    dataFile,
    exists: fs.existsSync(dataFile),
    content: fs.existsSync(dataFile) ? fs.readFileSync(dataFile, "utf-8").substring(0, 500) : "NOT FOUND"
  });
}