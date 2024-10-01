// Objetos para armazenar os valores de cada categoria
const valuesMe = createValuesObject();
const valuesMother = createValuesObject();

// Função para criar um objeto com categorias iniciais e valores zerados
function createValuesObject() {
  return {
    alimentação: 0,
    "conta-luz-limão": 0,
    "conta-luz-roça": 0,
    "conta-água": 0,
    internet: 0,
    aluguel: 0,
    aposentadoria: 0,
    salário: 0,
    itr: 0,
    "iptu-limão": 0,
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
  somarTotal(); // Calcula o total após o processamento
  desenharGrafico();
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
  const key = tipoTransacao
    .toLowerCase()
    .replaceAll(" ", "-")
    .replaceAll('"', "");

  // Adiciona valor ao objeto do credor correspondente
  if (credor === "Eu") {
    valuesMe[key] += parseFloat(valor.replaceAll('"', ""));
    console.log(key);
    document.querySelector("#" + key + "-eu").textContent = valuesMe[key].toFixed(2);
  } else if (credor === "Mãe") {
    valuesMother[key] += parseFloat(valor.replaceAll('"', ""));
    document.querySelector("#" + key + "-mae").textContent = valuesMother[key].toFixed(2);
  }
}

// Função para somar os totais de cada objeto
function somarTotal() {
  let totalMe = 0; // Inicializa o total para "Eu"
  let totalMother = 0; // Inicializa o total para "Mãe"

  // Soma os valores de "Eu"
  Object.keys(valuesMe).forEach((key) => {
    totalMe += valuesMe[key]  ;
  });
  document.querySelector("#total-eu").textContent = totalMe.toFixed(2); // Atualiza o total na interface

  // Soma os valores de "Mãe"
  Object.keys(valuesMother).forEach((key) => {
    totalMother += valuesMother[key];
  });
  document.querySelector("#total-mae").textContent = totalMother.toFixed(2); // Atualiza o total na interface
}

// Função para resetar os valores dos objetos e atualizar a interface
function valuesReset() {
  // Zera os valores nos objetos e atualiza os spans correspondentes

  Object.keys(valuesMe).forEach((key) => {
    valuesMe[key] = 0; // Zera o valor
    document.getElementById(`${key}-eu`).textContent = "0"; // Atualiza o span correspondente
  });

  Object.keys(valuesMother).forEach((key) => {
    valuesMother[key] = 0; // Zera o valor
    document.getElementById(`${key}-mae`).textContent = "0"; // Atualiza o span correspondente
  });
}

// Função para desenhar gráficos de pizza
function desenharGrafico() {
  // Dados para o gráfico de "Eu"
  const ctxEu = document.getElementById("grafico-eu").getContext("2d");
  const graficoEu = new Chart(ctxEu, {
    type: "pie",
    data: {
      labels: Object.keys(valuesMe).filter((key) => key !== "total"), // Filtra 'total'
      datasets: [
        {
          label: "Valores - Eu",
          data: Object.values(valuesMe).filter((value) => value > 0), // Filtra valores maiores que zero
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
            "rgba(201, 203, 207, 0.2)",
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
            "rgba(201, 203, 207, 1)",
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "Distribuição de Gastos - Eu",
        },
      },
    },
  });

  // Dados para o gráfico de "Mãe"
  const ctxMae = document.getElementById("grafico-mae").getContext("2d");
  const graficoMae = new Chart(ctxMae, {
    type: "pie",
    data: {
      labels: Object.keys(valuesMother).filter((key) => key !== "total"), // Filtra 'total'
      datasets: [
        {
          label: "Valores - Mãe",
          data: Object.values(valuesMother).filter((value) => value > 0), // Filtra valores maiores que zero
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
            "rgba(201, 203, 207, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
            "rgba(201, 203, 207, 1)",
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "Distribuição de Gastos - Mãe",
        },
      },
    },
  });
}

// Chame a função para desenhar o gráfico após os valores serem processados
// Adicione isso na função 'abrirExtrato' após chamar 'somarTotal()'
