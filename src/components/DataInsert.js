import React, { useState } from 'react';

const NovaLinhaForm = ({ onAdicionarNovaLinha, onUploadArquivo }) => {
  const [campo1, setCampo1] = useState('');
  const [campo2, setCampo2] = useState('');
  const [arquivo, setArquivo] = useState(null);

  const handleAdicionarNovaLinha = () => {
    const novaLinha = `|0150|24|${campo1}|${campo2}||...|`; // Substitua ... pelos outros campos
    onAdicionarNovaLinha(novaLinha);
    // Limpe os campos após adicionar a nova linha
    setCampo1('');
    setCampo2('');
    // ... Limpe os outros campos
  };

  const handleUploadArquivo = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const conteudoArquivo = e.target.result;
        onUploadArquivo(conteudoArquivo);
      };

      reader.readAsText(file);
    }
  };

  return (
    <div>
      <h2>Adicionar Nova Linha</h2>
      <label>
        Nome do Clente:
        <input type="text" value={campo1} onChange={(e) => setCampo1(e.target.value)} />
      </label>
      <br />
      <label>
        Código da Nota :
        <input type="text" value={campo2} onChange={(e) => setCampo2(e.target.value)} />
      </label>
      <br />
      <label>
        Upload de Arquivo:
        <input type="file" accept=".txt" onChange={handleUploadArquivo} />
      </label>
      <br />
      <button onClick={handleAdicionarNovaLinha}>Adicionar Nova Linha</button>
    </div>
  );
};

const DadosClientes = () => {
  const [estruturaDados, setEstruturaDados] = useState([]);

  const adicionarNovaLinha = (novaLinha) => {
    setEstruturaDados([...estruturaDados, novaLinha]);
  };

  const uploadArquivo = (conteudoArquivo) => {
    // Aqui você pode processar o conteúdo do arquivo como quiser.
    // Por exemplo, você pode dividir o conteúdo em linhas e adicionar cada linha aos dados existentes.
    const linhasArquivo = conteudoArquivo.split('\n');
    setEstruturaDados([...estruturaDados, ...linhasArquivo]);
  };

  return (
    <div>
      <NovaLinhaForm onAdicionarNovaLinha={adicionarNovaLinha} onUploadArquivo={uploadArquivo} />
      <h2>Estrutura de Dados</h2>
      <pre>
        {estruturaDados.map((linha, index) => (
          <div key={index}>{linha}</div>
        ))}
      </pre>
    </div>
  );
};

export default DadosClientes;
