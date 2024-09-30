// Função principal para abrir o extrato e processar o arquivo CSV
function abrirExtrato() {
  // Obtém o arquivo selecionado no input
  const arquivosSelecionados = document.getElementById("transacoes").files;
  Array.from(arquivosSelecionados).forEach((arquivoSelecionado) => {
    if (arquivoSelecionado) {
      const reader = new FileReader();
      reader.onload = (event) => processarCSV(event.target.result); // Processa o conteúdo CSV após a leitura
      reader.readAsText(arquivoSelecionado); // Lê o arquivo como texto
    } else {
      alert("Nenhum arquivo selecionado."); // Alerta se nenhum arquivo foi selecionado
    }
  });
  somarTotal();
}

// Função para processar o conteúdo CSV
function processarCSV(conteudoCSV) {
  const linhas = conteudoCSV.split("\n"); // Divide o CSV em linhas
  linhas.forEach((linha) => {
    if (linha) {
      // Ignora a primeira linha e linhas vazias
      pegarValores(linha); // Adiciona cada linha válida à tabela
    }
  });
}

// Função para adicionar uma linha à tabela
function pegarValores(linhaCSV) {
  const colunas = linhaCSV.split(","); // Divide a linha em colunas
  let valor = colunas[1];
  let credor = colunas[2];
  let tipoTransacao = colunas[3];
  somarValores(valor, credor, tipoTransacao);
}

function somarValores(valor, credor, tipoTransacao) {
  // Obtém todos os spans com os IDs correspondentes
  const id =
    tipoTransacao.toLowerCase().replaceAll(" ", "-").replaceAll('"', "") +
    "-" +
    credor.toLowerCase().replaceAll(" ", "-").replaceAll('"', "");
  const span = document.getElementById(id);
  if (span) {
    const currentValue = parseInt(span.textContent) || 0; // Pega o valor atual ou 0 se for NaN
    const newValue = parseFloat(valor.replaceAll('"', "")) || 0;
    span.textContent = currentValue + newValue; // Atualiza o valor do span
  } else {
    console.warn(id + " não encontrado");
  }
}

function somarTotal() {
  const totalMeId = "total-me";
  const totalmMotherId = "total-mother";

  tableMe = document.querySelector("#table-me");
  tableMother = document.querySelector("#table-mother");
  spansMe = tableMe.querySelectorAll("span");
  spansMother = tableMother.querySelectorAll("span");
  totalMe = document.getElementById(totalMeId);
  spansMe.forEach((span) => {
    spanValue = parseFloat(span.textContent);
    console.log(spanValue);
    totalMe.textContent = parseFloat(totalMe.textContent) + spanValue;
  });
  totalMother = document.getElementById(totalmMotherId);
  spansMother.forEach((span) => {
    spanValue = parseFloat(span.textContent);
    totalMother.textContent = parseFloat(totalMother.textContent) + spanValue;
  });
}
