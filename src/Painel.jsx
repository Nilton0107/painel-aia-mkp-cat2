
import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function AIAMKPCat1Panel() {
  // ... (todo o conteúdo anterior permanece igual)

  const handleExportarPDF = () => {
    const input = document.getElementById("bloco-pdf");
    html2canvas(input).then(canvas => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({ orientation: "portrait", unit: "pt", format: "a4" });
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const imgProps = pdf.getImageProperties(imgData);
      const ratio = Math.min(pageWidth / imgProps.width, pageHeight / imgProps.height);
      const imgWidth = imgProps.width * ratio;
      const imgHeight = imgProps.height * ratio;
      pdf.addImage(imgData, "PNG", 20, 20, imgWidth, imgHeight);
      pdf.save(`${nomeProduto || "anuncio"}.pdf`);
    });
  };

  return (
    <div className="p-4 max-w-3xl mx-auto space-y-6">
      <div id="bloco-pdf">
        {/* conteúdo principal do painel (já incluído) */}
        // ...
      </div>
      <div className="flex justify-end">
        <button onClick={handleExportarPDF} className="px-4 py-2 bg-red-600 text-white rounded">📄 Exportar Tudo em PDF</button>
      </div>
    </div>
  );
}
