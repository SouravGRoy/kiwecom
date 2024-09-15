import db from "@/db/db";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function GET(
  req: NextRequest,
  {
    params: { downloadVerificationId },
  }: { params: { downloadVerificationId: string } }
) {
  try {
    // Find the download verification
    const data = await db.downloadVerification.findUnique({
      where: {
        id: downloadVerificationId,
      },
      select: {
        expiredAt: true,
        product: {
          select: {
            filePath: true,
            name: true,
          },
        },
      },
    });

    // Check if the download verification is expired
    if (!data || new Date(data.expiredAt) <= new Date()) {
      return NextResponse.redirect(new URL("/products/download/expired", req.url));
    }

    // Resolve the absolute path of the file
    const resolvedFilePath = path.resolve(data.product.filePath);
    
    // Get file details
    const fileStats = await fs.stat(resolvedFilePath);
    const file = await fs.readFile(resolvedFilePath);
    const extension = path.extname(data.product.filePath).slice(1);

    // Return the file as a response
    return new NextResponse(file, {
      status: 200,
      headers: {
        "Content-Disposition": `attachment; filename="${data.product.name}.${extension}"`,
        "Content-Length": fileStats.size.toString(),
        "Content-Type": `application/octet-stream`,
      },
    });
  } catch (error) {
    console.error("Error handling download request:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
