import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function AIAMKPCat1Panel() {
  const [nomeProduto, setNomeProduto] = useState("");
  const [tipoCabelo, setTipoCabelo] = useState("");
  const [cor, setCor] = useState("");
  const [comprimento, setComprimento] = useState("");
  const [plataforma, setPlataforma] = useState("");
  const [palavrasChave, setPalavrasChave] = useState("");
  const [concorrentes, setConcorrentes] = useState("");
  const [textoGerado, setTextoGerado] = useState("");
  const [historico, setHistorico] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [promptImagem, setPromptImagem] = useState("");
  const [imagensGeradas, setImagensGeradas] = useState([]);

  useEffect(() => {
    if (nomeProduto || tipoCabelo || cor || comprimento) {
      setPromptImagem(`modelo mulher jovem com cabelo ${tipoCabelo} na cor ${cor}, comprimento ${comprimento}, usando o produto ${nomeProduto}, fundo branco estilo catálogo profissional`);
    }
  }, [nomeProduto, tipoCabelo, cor, comprimento]);

  const handleGerarAnuncio = async () => {
    const dados = {
      nome: nomeProduto,
      tipo_cabelo: tipoCabelo,
      cor: cor,
      comprimento: comprimento,
      marketplace: plataforma,
      palavras_chave: palavrasChave,
      concorrentes: concorrentes,
    };

    const response = await fetch("https://aia-mkp-cat1.onrender.com/gerar-anuncio", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dados),
    });

    const resultado = await response.json();
    setTextoGerado(resultado.resposta);
    setHistorico([...historico, { ...dados, resultado: resultado.resposta, imagens: imagensGeradas }]);
  };

  const handleCopiarTexto = () => {
    navigator.clipboard.writeText(textoGerado);
    alert("Texto copiado para a área de transferência!");
  };

  const handleDownload = () => {
    const conteudo = `--- DADOS DO PRODUTO ---\nProduto: ${nomeProduto}\nTipo de cabelo: ${tipoCabelo}\nCor: ${cor}\nComprimento: ${comprimento}\nMarketplace: ${plataforma}\nPalavras-chave: ${palavrasChave}\nConcorrentes: ${concorrentes}\n\n--- TEXTO GERADO ---\n${textoGerado}`;
    const blob = new Blob([conteudo], { type: "text/plain;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${nomeProduto || "anuncio"}.txt`;
    link.click();
  };

  const handleGerarImagemIA = async () => {
    const response = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer SUA_API_KEY"
      },
      body: JSON.stringify({
        model: "dall-e-3",
        prompt: promptImagem,
        n: 3,
        size: "1024x1024"
      })
    });

    const data = await response.json();
    if (data && data.data) {
      const novas = data.data.map(img => img.url);
      setImagensGeradas(novas);
    } else {
      alert("Erro ao gerar imagens.");
    }
  };

  const handleDownloadImagem = (url) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = "imagem_gerada.png";
    link.click();
  };

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
        <h2 className="text-2xl font-semibold">📦 Preencha os dados do produto</h2>
        <input placeholder="Nome do produto" value={nomeProduto} onChange={e => setNomeProduto(e.target.value)} className="w-full p-2 border rounded" />
        <textarea placeholder="Palavras-chave" value={palavrasChave} onChange={e => setPalavrasChave(e.target.value)} className="w-full p-2 border rounded" />
        <textarea placeholder="Concorrentes" value={concorrentes} onChange={e => setConcorrentes(e.target.value)} className="w-full p-2 border rounded" />
        <button className="bg-black text-white px-4 py-2 rounded" onClick={handleGerarAnuncio}>🔍 Gerar Anúncio</button>

        <h3 className="text-lg font-bold mt-6">🧠 Resultado</h3>
        <textarea value={textoGerado} readOnly className="w-full p-2 border rounded mb-2" rows={8} />
        <div className="flex gap-2">
          <button onClick={handleCopiarTexto} className="bg-blue-600 text-white px-4 py-2 rounded">📋 Copiar</button>
          <button onClick={handleDownload} className="bg-green-600 text-white px-4 py-2 rounded">⬇️ Baixar .TXT</button>
        </div>

        <h3 className="text-lg font-bold mt-6">🖼️ Geração de Imagem com IA</h3>
        <textarea value={promptImagem} onChange={e => setPromptImagem(e.target.value)} className="w-full p-2 border rounded mb-2" rows={3} />
        <button onClick={handleGerarImagemIA} className="bg-purple-600 text-white px-4 py-2 rounded">✨ Gerar Imagens</button>
        <div className="grid grid-cols-2 gap-4 mt-4">
          {imagensGeradas.map((url, index) => (
            <div key={index} className="border rounded p-2">
              <img src={url} alt={`Imagem ${index + 1}`} className="rounded" />
              <button onClick={() => handleDownloadImagem(url)} className="mt-2 bg-gray-800 text-white px-2 py-1 rounded w-full">⬇️ Baixar</button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <button onClick={handleExportarPDF} className="px-4 py-2 bg-red-600 text-white rounded">📄 Exportar Tudo em PDF</button>
      </div>
    </div>
  );
}
