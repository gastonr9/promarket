import type { Product } from "@/types";
import { analytics } from "@/lib/analytics";

export function exportProductsToPDF(products: Product[]) {
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

  const htmlContent = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <title>Catálogo y Hoja de Pedido - ProMarket Logística</title>
      <style>
        @page {
          size: A4;
          margin: 15mm;
        }
        body {
          font-family: system-ui, -apple-system, sans-serif;
          color: #1a1a1a;
          line-height: 1.4;
          margin: 0;
          padding: 0;
          font-size: 11pt;
        }
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-b: 2px solid #e1251b;
          padding-bottom: 12px;
          margin-bottom: 20px;
        }
        .brand {
          font-size: 20pt;
          font-weight: 800;
          color: #e1251b;
          letter-spacing: -0.5px;
        }
        .subtitle {
          font-size: 10pt;
          color: #666;
          margin-top: 2px;
        }
        .meta-info {
          text-align: right;
          font-size: 9pt;
          color: #555;
        }
        .category-title {
          font-size: 13pt;
          font-weight: 700;
          color: #1a1a1a;
          background-color: #f3f4f6;
          padding: 6px 10px;
          margin-top: 18px;
          margin-bottom: 8px;
          border-left: 4px solid #e1251b;
          page-break-after: avoid;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 12px;
          page-break-inside: auto;
        }
        tr {
          page-break-inside: avoid;
          page-break-after: auto;
        }
        th {
          background-color: #fafafa;
          color: #444;
          font-weight: 600;
          font-size: 9pt;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          text-align: left;
          padding: 6px 8px;
          border-bottom: 1px solid #ddd;
        }
        td {
          padding: 6px 8px;
          border-bottom: 1px solid #eee;
          font-size: 9.5pt;
        }
        .col-code { width: 10%; font-family: monospace; font-size: 8.5pt; color: #666; }
        .col-name { width: 35%; font-weight: 600; }
        .col-brand { width: 15%; color: #555; }
        .col-detail { width: 15%; color: #666; font-size: 8.5pt; }
        .col-price { width: 15%; text-align: right; font-weight: 700; }
        .col-qty { width: 10%; text-align: center; border: 1px solid #ccc; background-color: #fafafa; }
        .footer {
          margin-top: 30px;
          border-top: 1px solid #ddd;
          padding-top: 10px;
          font-size: 8pt;
          color: #777;
          display: flex;
          justify-content: space-between;
        }
        @media print {
          .no-print { display: none; }
          body { padding: 0; }
        }
      </style>
    </head>
    <body>
      <div class="header">
        <div>
          <div class="brand">PROMARKET LOGÍSTICA</div>
          <div class="subtitle">Catálogo de Productos y Hoja de Pedido Mayorista</div>
        </div>
        <div class="meta-info">
          <div><strong>Fecha:</strong> ${currentDate}</div>
          <div><strong>Contacto:</strong> ventas@promarket.com.ar</div>
        </div>
      </div>

      ${Object.entries(grouped)
        .map(
          ([category, items]) => `
        <div class="category-section">
          <div class="category-title">${category}</div>
          <table>
            <thead>
              <tr>
                <th class="col-name">Producto</th>
                <th class="col-brand">Marca</th>
                <th class="col-detail">Presentación</th>
                <th class="col-price">Precio</th>
                <th class="col-qty">Pedido</th>
              </tr>
            </thead>
            <tbody>
              ${items
                .map(
                  (item) => `
                <tr>
                  <td class="col-name">${item.name}</td>
                  <td class="col-brand">${
                    typeof item.brand === "string" ? item.brand : item.brand?.name || "General"
                  }</td>
                  <td class="col-detail">${item.detail || "—"}</td>
                  <td class="col-price">${
                    item.priceType === "fijo" && item.fixedPrice
                      ? `$${item.fixedPrice.toLocaleString("es-AR")}`
                      : "Consultar"
                  }</td>
                  <td class="col-qty"></td>
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

      <div class="footer">
        <div>ProMarket Logística S.A. — Precios e información sujetos a cambios sin previo aviso.</div>
        <div>Página 1 de 1</div>
      </div>

      <script>
        window.onload = function() {
          window.print();
        };
      </script>
    </body>
    </html>
  `;

  const printWindow = window.open("", "_blank", "noopener,noreferrer");
  if (!printWindow) {
    alert("El navegador bloqueó la ventana emergente. Permití ventanas emergentes para este sitio y volvé a intentarlo.");
    return;
  }
  printWindow.document.write(htmlContent);
  printWindow.document.close();
}
