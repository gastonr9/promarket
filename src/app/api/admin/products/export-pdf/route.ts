import { NextRequest, NextResponse } from "next/server";
import { getCatalogData } from "@/lib/data";
import { analytics } from "@/lib/analytics";
import { jsPDF } from "jspdf";

// Dynamic import for html2canvas (server-side only - will use a different approach)
// Since html2canvas doesn't work on server, we'll generate PDF directly with jsPDF

export async function POST(request: NextRequest) {
  try {
    const { products } = await request.json();
    
    if (!products || !Array.isArray(products)) {
      return NextResponse.json({ error: "Invalid products data" }, { status: 400 });
    }

    const activeProducts = products.filter((p) => p.active);

    // Group products by category
    const grouped: Record<string, typeof activeProducts> = {};
    activeProducts.forEach((product) => {
      const cat = product.category || "General";
      if (!grouped[cat]) grouped[cat] = [];
      grouped[cat].push(product);
    });

    // Track analytics event
    analytics.pdfExport(activeProducts.length, Object.keys(grouped).length);

    const currentDate = new Date().toLocaleDateString("es-AR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    // Create PDF
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const pageWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const margin = 15;
    const contentWidth = pageWidth - margin * 2;
    let y = margin;

    // Helper function to add text
    const addText = (text: string, x: number, yPos: number, options: {
      fontSize?: number;
      fontStyle?: string;
      color?: [number, number, number];
      maxWidth?: number;
    } = {}) => {
      const { fontSize = 10, fontStyle = "normal", color = [0, 0, 0], maxWidth } = options;
      pdf.setFontSize(fontSize);
      pdf.setFont("helvetica", fontStyle);
      pdf.setTextColor(...color);
      if (maxWidth) {
        const lines = pdf.splitTextToSize(text, maxWidth);
        pdf.text(lines, x, yPos);
        return yPos + lines.length * (fontSize * 0.4);
      }
      pdf.text(text, x, yPos);
      return yPos + fontSize * 0.4;
    };

    // Header
    pdf.setFillColor(225, 37, 27); // #e1251b
    pdf.rect(0, 0, pageWidth, 25, "F");
    
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(18);
    pdf.setFont("helvetica", "bold");
    pdf.text("PROMARKET LOGÍSTICA", margin, 15);
    
    pdf.setFontSize(8);
    pdf.setFont("helvetica", "normal");
    pdf.text("Catálogo de Productos y Hoja de Pedido Mayorista", margin, 21);

    pdf.setFontSize(7);
    pdf.setTextColor(200, 200, 200);
    pdf.text(`Fecha: ${currentDate}`, pageWidth - margin, 15, { align: "right" });
    pdf.text("Contacto: ventas@promarket.com.ar", pageWidth - margin, 20, { align: "right" });

    y = 32;

    // Products by category
    Object.entries(grouped).forEach(([category, items], catIndex) => {
      // Check if we need a new page
      if (y > pageHeight - 30) {
        pdf.addPage();
        y = margin;
      }

      // Category header
      pdf.setFillColor(243, 244, 246); // #f3f4f6
      pdf.rect(margin, y, contentWidth, 8, "F");
      pdf.setDrawColor(225, 37, 27);
      pdf.setLineWidth(0.5);
      pdf.line(margin, y, margin, y + 8);

      pdf.setTextColor(26, 26, 26);
      pdf.setFontSize(10);
      pdf.setFont("helvetica", "bold");
      pdf.text(category, margin + 3, y + 5.5);
      y += 10;

      // Table header
      const colWidths = [contentWidth * 0.35, contentWidth * 0.15, contentWidth * 0.15, contentWidth * 0.2, contentWidth * 0.15];
      const colX = [margin];
      for (let i = 1; i < colWidths.length; i++) {
        colX.push(colX[i - 1] + colWidths[i - 1]);
      }
      const headers = ["Producto", "Marca", "Presentación", "Precio", "Pedido"];

      pdf.setFillColor(250, 250, 250); // #fafafa
      pdf.rect(margin, y, contentWidth, 7, "F");
      pdf.setDrawColor(221, 221, 221); // #ddd
      pdf.line(margin, y + 7, margin + contentWidth, y + 7);

      pdf.setTextColor(68, 68, 68); // #444
      pdf.setFontSize(7);
      pdf.setFont("helvetica", "bold");
      headers.forEach((header, i) => {
        const align = i === 3 ? "right" : i === 4 ? "center" : "left";
        const x = align === "right" ? colX[i] + colWidths[i] - 2 : align === "center" ? colX[i] + colWidths[i] / 2 : colX[i] + 2;
        pdf.text(header, x, y + 4.5, { align });
      });
      y += 7;

      // Table rows
      pdf.setFont("helvetica", "normal");
      items.forEach((item, itemIndex) => {
        if (y > pageHeight - 20) {
          pdf.addPage();
          y = margin;
          
          // Redraw header on new page
          pdf.setFillColor(250, 250, 250);
          pdf.rect(margin, y, contentWidth, 7, "F");
          pdf.setDrawColor(221, 221, 221);
          pdf.line(margin, y + 7, margin + contentWidth, y + 7);
          pdf.setTextColor(68, 68, 68);
          pdf.setFontSize(7);
          pdf.setFont("helvetica", "bold");
          headers.forEach((header, i) => {
            const align = i === 3 ? "right" : i === 4 ? "center" : "left";
            const x = align === "right" ? colX[i] + colWidths[i] - 2 : align === "center" ? colX[i] + colWidths[i] / 2 : colX[i] + 2;
            pdf.text(header, x, y + 4.5, { align });
          });
          y += 7;
          pdf.setFont("helvetica", "normal");
        }

        // Alternate row colors
        if (itemIndex % 2 === 0) {
          pdf.setFillColor(250, 250, 250);
        } else {
          pdf.setFillColor(255, 255, 255);
        }
        pdf.rect(margin, y, contentWidth, 6, "F");
        pdf.setDrawColor(238, 238, 238); // #eee
        pdf.line(margin, y + 6, margin + contentWidth, y + 6);

        const rowData = [
          item.name,
          typeof item.brand === "string" ? item.brand : item.brand?.name || "General",
          item.detail || "—",
          item.priceType === "fijo" && item.fixedPrice ? `$${item.fixedPrice.toLocaleString("es-AR")}` : "Consultar",
          "" // Empty for Pedido column
        ];

        pdf.setTextColor(26, 26, 26);
        pdf.setFontSize(7);
        rowData.forEach((cell, i) => {
          const align = i === 3 ? "right" : i === 4 ? "center" : "left";
          const x = align === "right" ? colX[i] + colWidths[i] - 2 : align === "center" ? colX[i] + colWidths[i] / 2 : colX[i] + 2;
          if (i === 0) {
            pdf.setFont("helvetica", "bold");
          } else {
            pdf.setFont("helvetica", "normal");
          }
          if (i === 2) {
            pdf.setTextColor(102, 102, 102); // #666
            pdf.setFontSize(6.5);
          } else {
            pdf.setTextColor(26, 26, 26);
            pdf.setFontSize(7);
          }
          pdf.text(cell, x, y + 3.8, { align });
        });
        y += 6;
      });

      y += 4; // Space between categories
    });

    // Footer
    if (y > pageHeight - 20) {
      pdf.addPage();
      y = margin;
    }
    
    pdf.setDrawColor(221, 221, 221);
    pdf.line(margin, y, margin + contentWidth, y);
    y += 3;
    
    pdf.setTextColor(119, 119, 119); // #777
    pdf.setFontSize(6);
    pdf.setFont("helvetica", "normal");
    pdf.text("ProMarket Logística S.A. — Precios e información sujetos a cambios sin previo aviso.", margin, y);
    pdf.text("Página 1 de 1", margin + contentWidth, y, { align: "right" });

    // Generate PDF buffer
    const pdfBuffer = Buffer.from(pdf.output("arraybuffer"));
    
    return new NextResponse(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="Catalogo_Promarket_${new Date().toISOString().split("T")[0]}.pdf"`,
        "Content-Length": pdfBuffer.length.toString(),
      },
    });
  } catch (error) {
    console.error("PDF generation error:", error);
    return NextResponse.json({ error: "Failed to generate PDF" }, { status: 500 });
  }
}