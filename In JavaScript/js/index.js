// Função principal para abrir o extrato e processar o arquivo CSV
function abrirExtrato() {
  // Obtém o arquivo selecionado no input
  const arquivoSelecionado = document.getElementById("transacoes").files[0];

  if (arquivoSelecionado) {
    const reader = new FileReader();
    reader.onload = (event) => processarCSV(event.target.result); // Processa o conteúdo CSV após a leitura
    reader.readAsText(arquivoSelecionado); // Lê o arquivo como texto
  } else {
    alert("Nenhum arquivo selecionado."); // Alerta se nenhum arquivo foi selecionado
  }
}

// Função para processar o conteúdo CSV
function processarCSV(conteudoCSV) {
  const linhas = conteudoCSV.split("\n"); // Divide o CSV em linhas
  const tabela = document.querySelector("#tabela-transacao"); // Seleciona a tabela para inserir novas linhas

  linhas.forEach((linha, index) => {
    if (index > 0 && linha.trim()) {
      // Ignora a primeira linha e linhas vazias
      adicionarLinhaTabela(linha, tabela, index); // Adiciona cada linha válida à tabela
    }
  });
}

// Função para adicionar uma linha à tabela
function adicionarLinhaTabela(linhaCSV, tabela, index) {
  const colunas = linhaCSV.split(","); // Divide a linha em colunas
  const linhaTemplate = document
    .getElementById("linha-transacao")
    .cloneNode(true); // Clona o template da linha

  linhaTemplate.style.display = ""; // Exibe a nova linha clonada
  preencherLinha(linhaTemplate, colunas, index); // Preenche a nova linha com os dados

  tabela.appendChild(linhaTemplate); // Adiciona a nova linha à tabela
}

// Função para preencher os campos da linha com os dados
function preencherLinha(linha, colunas, index) {
  linha.querySelector("#numeroLinha").textContent = index; // Preenche o número da linha
  linha.querySelector("#data").textContent = colunas[0]; // Preenche a data
  linha.querySelector("#valor").textContent = colunas[3]; // Preenche o valor
  // Adicione aqui outros campos conforme necessário
}

// Função para cadastrar os dados em CSV
function cadastrarCSV() {
  const tabela = document.querySelector("#tabela-transacao");
  const transacoes = extrairTransacoes(tabela); // Extrai transações da tabela

  const csvContent = converterParaCSV(transacoes); // Converte os dados para CSV
  baixarCSV(csvContent); // Inicia o download do arquivo CSV
}

// Função para extrair transações da tabela
function extrairTransacoes(tabela) {
  const linhas = tabela.querySelectorAll("tr");
  const transacoes = [];

  linhas.forEach((linha) => {
    if (linha.style.display !== "none") {
      // Verifica se a linha está visível
      const transacao = {
        Data: linha.querySelector("#data").textContent,
        Valor: linha.querySelector("#valor").textContent,
        Credor: linha.querySelector("#credor").value,
        "Tipo Transacao": linha.querySelector("#tipo-transacao").value,
      };
      transacoes.push(transacao); // Adiciona a transação ao array
    }
  });

  return transacoes;
}

// Função para baixar o arquivo CSV
function baixarCSV(conteudoCSV) {
  const blob = new Blob([conteudoCSV], { type: "text/csv;charset=utf-8;" }); // Cria um Blob com os dados CSV
  const link = document.createElement("a"); // Cria um link de download
  const url = URL.createObjectURL(blob);

  link.setAttribute("href", url);
  link.setAttribute(
    "download",
    `${document.querySelector("#mes").value}${
      document.querySelector("#ano").value
    }.csv`
  ); // Nome do arquivo
  document.body.appendChild(link);
  link.click(); // Simula o clique para baixar o arquivo
  document.body.removeChild(link); // Remove o link após o download
}

// Função para converter dados em formato CSV
function converterParaCSV(dados) {
  const headers = Object.keys(dados[0]); // Obtém os cabeçalhos
  const linhasCSV = [];

  // Adiciona os cabeçalhos à primeira linha
  linhasCSV.push(headers.join(","));

  // Adiciona cada linha de dados
  dados.forEach((linha) => {
    const valores = headers.map((header) => {
      const valorEscapado = ("" + linha[header]).replace(/"/g, '"$&"'); // Escapa aspas
      return `"${valorEscapado}"`; // Adiciona aspas
    });
    linhasCSV.push(valores.join(",")); // Junta os valores em uma linha CSV
  });

  return linhasCSV.join("\n"); // Junta tudo em uma string
}
