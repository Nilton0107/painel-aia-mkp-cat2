import React, { useState } from "react";

export default function AIAMKPCat2() {
  const [produto, setProduto] = useState("");
  const [cor, setCor] = useState("#1");
  const [tipoCabelo, setTipoCabelo] = useState("Liso");
  const [comprimento, setComprimento] = useState("75cm");
  const [plataforma, setPlataforma] = useState("Amazon");
  const [roupa, setRoupa] = useState("Fitness");
  const [prompt, setPrompt] = useState("");
  const [texto, setTexto] = useState("");
  const [imagem, setImagem] = useState("");

  const gerarPrompt = () => {
    return `modelo ${plataforma} com cabelo ${tipoCabelo}, cor ${cor}, roupa ${roupa}, usando o produto ${produto}`;
  };

  const gerarTexto = async () => {
    const res = await fetch("https://aia-mkp-cat1.onrender.com/gerar-anuncio", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome: produto, tipo_cabelo: tipoCabelo, cor, comprimento, marketplace: plataforma }),
    });
    const data = await res.json();
    setTexto(data.resposta || "Erro ao gerar");
  };

  const gerarImagem = async () => {
    const promptFinal = gerarPrompt();
    setPrompt(promptFinal);
    const res = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer SUA_API_KEY"
      },
      body: JSON.stringify({ prompt: promptFinal, n: 1, size: "1024x1024", model: "dall-e-3" })
    });
    const data = await res.json();
    if (data?.data?.[0]?.url) setImagem(data.data[0].url);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-4 text-gray-800">
      <h1 className="text-2xl font-bold">Painel AIA MKP CAT2 ✅</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input value={produto} onChange={e => setProduto(e.target.value)} className="border p-2 rounded" placeholder="Nome do produto" />
        <select value={cor} onChange={e => setCor(e.target.value)} className="border p-2 rounded">
          <option>#1</option><option>#2</option><option>#4</option><option>T1B/27</option><option>T2/30</option><option>613</option><option>T2/27/613</option><option>T2/60</option>
        </select>
        <select value={tipoCabelo} onChange={e => setTipoCabelo(e.target.value)} className="border p-2 rounded">
          <option>Liso</option><option>Ondulado</option><option>Cacheado</option><option>Brazilian Wave</option><option>Yaki</option>
        </select>
        <select value={comprimento} onChange={e => setComprimento(e.target.value)} className="border p-2 rounded">
          <option>60cm</option><option>75cm</option>
        </select>
        <select value={plataforma} onChange={e => setPlataforma(e.target.value)} className="border p-2 rounded">
          <option>Amazon</option><option>Shopee</option><option>Mercado Livre</option>
        </select>
        <select value={roupa} onChange={e => setRoupa(e.target.value)} className="border p-2 rounded">
          <option>Fitness</option><option>Casual</option><option>Gala</option><option>Elegante</option>
        </select>
      </div>

      <div className="flex gap-2 pt-4">
        <button onClick={gerarTexto} className="bg-blue-600 text-white px-4 py-2 rounded">Gerar Anúncio</button>
        <button onClick={gerarImagem} className="bg-purple-600 text-white px-4 py-2 rounded">Gerar Imagem</button>
      </div>

      <div className="pt-4">
        <h3 className="font-semibold">🧠 Texto Gerado</h3>
        <textarea value={texto} className="w-full border p-2 rounded" rows={6} readOnly />
      </div>

      {imagem && (
        <div className="pt-4">
          <h3 className="font-semibold">🖼️ Imagem Gerada</h3>
          <img src={imagem} className="w-80 rounded" />
        </div>
      )}

      <div className="pt-4">
        <h3 className="font-semibold">Prompt:</h3>
        <code className="block bg-gray-100 p-2 rounded">{prompt}</code>
      </div>
    </div>
  );
}
