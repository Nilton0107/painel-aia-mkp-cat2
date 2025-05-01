import React, { useState } from "react";

export default function AIAMKPCat1Panel() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [nomeProduto, setNomeProduto] = useState("");
  const [tipoCabelo, setTipoCabelo] = useState("");
  const [cor, setCor] = useState("");
  const [comprimento, setComprimento] = useState("");
  const [plataforma, setPlataforma] = useState("");
  const [palavrasChave, setPalavrasChave] = useState("");
  const [concorrentes, setConcorrentes] = useState("");
  const [textoGerado, setTextoGerado] = useState("");
  const [historico, setHistorico] = useState([]);

  const handleLogin = () => {
    if (username === "admin" && password === "donnabella2025") {
      setLoggedIn(true);
    } else {
      alert("Usuário ou senha incorretos.");
    }
  };

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
    setHistorico([...historico, { ...dados, resultado: resultado.resposta }]);
  };

  if (!loggedIn) {
    return (
      <div>
        <h1>Painel AIA MKP CAT1</h1>
        <input placeholder="Usuário" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input placeholder="Senha" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button onClick={handleLogin}>Entrar</button>
      </div>
    );
  }

  return (
    <div>
      <h2>Gerar Anúncio</h2>
      <input placeholder="Nome do produto" value={nomeProduto} onChange={(e) => setNomeProduto(e.target.value)} />
      <input placeholder="Tipo de cabelo" value={tipoCabelo} onChange={(e) => setTipoCabelo(e.target.value)} />
      <input placeholder="Cor" value={cor} onChange={(e) => setCor(e.target.value)} />
      <input placeholder="Comprimento" value={comprimento} onChange={(e) => setComprimento(e.target.value)} />
      <input placeholder="Marketplace" value={plataforma} onChange={(e) => setPlataforma(e.target.value)} />
      <textarea placeholder="Palavras-chave" value={palavrasChave} onChange={(e) => setPalavrasChave(e.target.value)} />
      <textarea placeholder="Concorrentes" value={concorrentes} onChange={(e) => setConcorrentes(e.target.value)} />
      <button onClick={handleGerarAnuncio}>Gerar</button>
      <textarea value={textoGerado} rows={10} readOnly />
    </div>
  );
}
