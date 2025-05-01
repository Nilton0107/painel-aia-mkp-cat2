import React, { useState } from "react";
export default function AIAMKPCat1Panel() {
  return (
    <div className="p-6 max-w-4xl mx-auto space-y-4 text-gray-800 font-sans">
      <h1 className="text-2xl font-bold">📦 Painel AIA MKP CAT2 - COMPLETO</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input className="border p-2 rounded" placeholder="Nome do produto" />
        <select className="border p-2 rounded">
          <option>Tipo de cabelo</option>
          <option>Liso</option><option>Ondulado</option><option>Cacheado</option>
        </select>
        <select className="border p-2 rounded">
          <option>Cor</option><option>#1</option><option>#2</option><option>#613</option>
        </select>
        <select className="border p-2 rounded">
          <option>Comprimento</option><option>60cm</option><option>75cm</option>
        </select>
        <select className="border p-2 rounded">
          <option>Plataforma</option><option>Amazon</option><option>Shopee</option>
        </select>
        <input className="border p-2 rounded" placeholder="Palavras-chave" />
      </div>
      <textarea className="border w-full p-2 rounded mt-4" rows="6" placeholder="Descrição gerada aqui..." />
      <div className="flex gap-2">
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Gerar Anúncio</button>
        <button className="bg-gray-800 text-white px-4 py-2 rounded">Copiar</button>
        <button className="bg-green-600 text-white px-4 py-2 rounded">Baixar TXT</button>
      </div>
      <div className="pt-6">
        <h2 className="text-lg font-semibold">🖼️ Geração de imagem com IA</h2>
        <input className="border w-full p-2 rounded" placeholder="Prompt da imagem" />
        <button className="mt-2 bg-purple-600 text-white px-4 py-2 rounded">Gerar Imagens</button>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="border p-2"><img src="https://via.placeholder.com/300x300" className="w-full rounded" /><button className="mt-2 w-full bg-black text-white px-2 py-1 rounded">Baixar</button></div>
        </div>
      </div>
      <div className="pt-6">
        <h2 className="text-lg font-semibold">🗂 Histórico de Gerações</h2>
        <input className="border w-full p-2 rounded" placeholder="Buscar no histórico..." />
        <div className="mt-2 border p-2 rounded">Produto: X | Cor: #613 | Plataforma: Amazon<br/><em>Texto gerado aqui...</em></div>
      </div>
    </div>
  );
}
