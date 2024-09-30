// Objetos para armazenar os valores de cada categoria
const valuesMe = createValuesObject();
const valuesMother = createValuesObject();

// Função para criar um objeto com categorias iniciais e valores zerados
function createValuesObject() {
  return {
    alimentacao: 0,
    "conta-luz-limão": 0,
    "conta-luz-roca": 0,
    "conta-agua": 0,
    internet: 0,
    aluguel: 0,
    aposentadoria: 0,
    salario: 0,
    itr: 0,
    "iptu-limao": 0,
    "iptu-alameda": 0,
    ipva: 0,
    academia: 0,
    investimentos: 0,
    gasolina: 0,
    juros: 0,
    outros: 0,
    total: 0,
  };
}

// Função principal para abrir o extrato e processar o arquivo CSV
function abrirExtrato() {
  valuesReset(); // Reseta os valores antes de carregar novos dados

  // Obtém os arquivos selecionados no input
  const arquivosSelecionados = document.getElementById("transacoes").files;
  
  // Processa cada arquivo selecionado
  Array.from(arquivosSelecionados).forEach((arquivoSelecionado) => {
    if (arquivoSelecionado) {
      const reader = new FileReader();
      reader.onload = (event) => processarCSV(event.target.result); // Processa o conteúdo CSV após a leitura
      reader.readAsText(arquivoSelecionado); // Lê o arquivo como texto
    } else {
      alert("Nenhum arquivo selecionado."); // Alerta se nenhum arquivo foi selecionado
    }
  });
  somarTotal(); // Calcula o total após o processamento
}

// Função para processar o conteúdo CSV
function processarCSV(conteudoCSV) {
  const linhas = conteudoCSV.split("\n"); // Divide o CSV em linhas
  
  // Itera sobre as linhas, ignorando a primeira e as vazias
  linhas.forEach((linha, index) => {
    if (index > 0 && linha.trim()) {
      pegarValores(linha); // Adiciona cada linha válida à tabela
    }
  });
}

// Função para adicionar valores a partir de uma linha CSV
function pegarValores(linhaCSV) {
  const colunas = linhaCSV.split(","); // Divide a linha em colunas
  const valor = colunas[1]; // Valor da transação
  const credor = colunas[2]; // Credor da transação
  const tipoTransacao = colunas[3]; // Tipo de transação
  
  valueAdd(valor, credor, tipoTransacao); // Adiciona o valor ao objeto correspondente
}

// Função para adicionar valor ao objeto correto com base no credor
function valueAdd(valor, credor, tipoTransacao) {
  // Normaliza a chave do tipo de transação
  const key = tipoTransacao.toLowerCase().replaceAll(" ", "-").replaceAll('"', "");

  // Adiciona valor ao objeto do credor correspondente
  if (credor === "Eu") {
    valuesMe[key] += parseFloat(valor.replaceAll('"', ""));
    document.querySelector("#" + key + "-eu").textContent = valuesMe[key];
  } else if (credor === "Mãe") {
    valuesMother[key] += parseFloat(valor.replaceAll('"', ""));
    document.querySelector("#" + key + "-mae").textContent = valuesMother[key];
  }
}

// Função para somar os totais de cada objeto
function somarTotal() {
  let totalMe = 0; // Inicializa o total para "Eu"
  let totalMother = 0; // Inicializa o total para "Mãe"

  // Soma os valores de "Eu"
  Object.keys(valuesMe).forEach((key) => {
    totalMe += valuesMe[key];
  });
  document.querySelector("#total-eu").textContent = totalMe; // Atualiza o total na interface

  // Soma os valores de "Mãe"
  Object.keys(valuesMother).forEach((key) => {
    totalMother += valuesMother[key];
   
  });
  document.querySelector("#total-mae").textContent = totalMother; // Atualiza o total na interface
}

// Função para resetar os valores dos objetos e atualizar a interface
function valuesReset() {
  // Zera os valores nos objetos e atualiza os spans correspondentes
  console.log(valuesMother);
  console.log(valuesMother['itr']);
  Object.keys(valuesMe).forEach((key) => {
    valuesMe[key] = 0; // Zera o valor
    document.getElementById(`${key}-eu`).textContent = "0"; // Atualiza o span correspondente
  });

  Object.keys(valuesMother).forEach((key) => {
    valuesMother[key] = 0; // Zera o valor
    document.getElementById(`${key}-mae`).textContent = "0"; // Atualiza o span correspondente
  });
}
