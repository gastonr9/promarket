import type { Product } from "@/types";
import { analytics } from "@/lib/analytics";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

export async function exportProductsToPDF(products: Product[]) {
  const activeProducts = products.filter((p) => p.active);

  // Group products by category
  const grouped: Record<string, Product[]> = {};
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

  // Create a hidden container with the HTML content
  const container = document.createElement("div");
  container.style.position = "absolute";
  container.style.left = "-9999px";
  container.style.top = "0";
  container.style.width = "800px";
  container.style.background = "white";
  container.style.padding = "40px";
  container.style.fontFamily = "system-ui, -apple-system, sans-serif";
  container.style.color = "#1a1a1a";
  container.style.fontSize = "11pt";
  container.style.lineHeight = "1.4";

  container.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #e1251b; padding-bottom: 12px; margin-bottom: 20px;">
      <div>
        <div style="font-size: 20pt; font-weight: 800; color: #e1251b; letter-spacing: -0.5px;">PROMARKET LOGÍSTICA</div>
        <div style="font-size: 10pt; color: #666; margin-top: 2px;">Catálogo de Productos y Hoja de Pedido Mayorista</div>
      </div>
      <div style="text-align: right; font-size: 9pt; color: #555;">
        <div><strong>Fecha:</strong> ${currentDate}</div>
        <div><strong>Contacto:</strong> ventas@promarket.com.ar</div>
      </div>
    </div>

    ${Object.entries(grouped)
      .map(
        ([category, items]) => `
      <div style="margin-top: 18px; margin-bottom: 8px; page-break-after: avoid;">
        <div style="font-size: 13pt; font-weight: 700; color: #1a1a1a; background-color: #f3f4f6; padding: 6px 10px; border-left: 4px solid #e1251b;">${category}</div>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 12px; font-size: 9.5pt;">
          <thead>
            <tr>
              <th style="background-color: #fafafa; color: #444; font-weight: 600; font-size: 9pt; text-transform: uppercase; letter-spacing: 0.5px; text-align: left; padding: 6px 8px; border-bottom: 1px solid #ddd; width: 35%;">Producto</th>
              <th style="background-color: #fafafa; color: #444; font-weight: 600; font-size: 9pt; text-transform: uppercase; letter-spacing: 0.5px; text-align: left; padding: 6px 8px; border-bottom: 1px solid #ddd; width: 15%;">Marca</th>
              <th style="background-color: #fafafa; color: #444; font-weight: 600; font-size: 9pt; text-transform: uppercase; letter-spacing: 0.5px; text-align: left; padding: 6px 8px; border-bottom: 1px solid #ddd; width: 15%;">Presentación</th>
              <th style="background-color: #fafafa; color: #444; font-weight: 600; font-size: 9pt; text-transform: uppercase; letter-spacing: 0.5px; text-align: right; padding: 6px 8px; border-bottom: 1px solid #ddd; width: 15%;">Precio</th>
              <th style="background-color: #fafafa; color: #444; font-weight: 600; font-size: 9pt; text-transform: uppercase; letter-spacing: 0.5px; text-align: center; padding: 6px 8px; border-bottom: 1px solid #ddd; width: 10%;">Pedido</th>
            </tr>
          </thead>
          <tbody>
            ${items
              .map(
                (item) => `
              <tr style="page-break-inside: avoid;">
                <td style="padding: 6px 8px; border-bottom: 1px solid #eee; font-weight: 600;">${item.name}</td>
                <td style="padding: 6px 8px; border-bottom: 1px solid #eee; color: #555;">${typeof item.brand === "string" ? item.brand : item.brand?.name || "General"}</td>
                <td style="padding: 6px 8px; border-bottom: 1px solid #eee; color: #666; font-size: 8.5pt;">${item.detail || "—"}</td>
                <td style="padding: 6px 8px; border-bottom: 1px solid #eee; text-align: right; font-weight: 700;">${item.priceType === "fijo" && item.fixedPrice ? `$${item.fixedPrice.toLocaleString("es-AR")}` : "Consultar"}</td>
                <td style="padding: 6px 8px; border-bottom: 1px solid #eee; text-align: center; border: 1px solid #ccc; background-color: #fafafa;"></td>
              </tr>
            `
              )
              .join("")}
          </tbody>
        </table>
      </div>
    `
      )
      .join("")}

    <div style="margin-top: 30px; border-top: 1px solid #ddd; padding-top: 10px; font-size: 8pt; color: #777; display: flex; justify-content: space-between;">
      <div>ProMarket Logística S.A. — Precios e información sujetos a cambios sin previo aviso.</div>
      <div>Página 1 de 1</div>
    </div>
  `;

  document.body.appendChild(container);

  try {
    // Render the container to canvas
    const canvas = await html2canvas(container, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: "#ffffff",
      width: container.scrollWidth,
      height: container.scrollHeight,
    });

    // Create PDF
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const imgWidth = 210; // A4 width in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;
    const marginTop = 10;
    const marginBottom = 10;
    const pageHeight = 297 - marginTop - marginBottom; // A4 height minus margins

    // Add first page
    pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, marginTop + position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    // Add additional pages if needed
    while (heightLeft > 0) {
      position -= pageHeight;
      pdf.addPage();
      pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, marginTop + position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    // Download the PDF
    const fileName = `Catalogo_Promarket_${new Date().toISOString().split("T")[0]}.pdf`;
    pdf.save(fileName);
  } finally {
    // Clean up
    document.body.removeChild(container);
  }
}