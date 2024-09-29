function abrirExtrato() {
  // Obtém o arquivo selecionado no input
  let lista = document.getElementById("transacoes").files[0];

  if (lista) {
    const reader = new FileReader();

    // Função de callback para quando a leitura do arquivo for concluída
    reader.onload = function (e) {
      const text = e.target.result;
      processCSV(text); // Processa o conteúdo CSV
    };

    // Lê o arquivo como texto
    reader.readAsText(lista);
  } else {
    alert("Nenhum arquivo selecionado.");
  }
}

function processCSV(text) {
  const linhas = text.split("\n"); // Divide o CSV em linhas
  const tabela = document.querySelector("#tabela-transacao"); // Seleciona a tabela para inserir novas linhas
  let primeiraLinha = true;
  linhas.forEach((linha, index) => {
    if (primeiraLinha === true) {
      primeiraLinha = false;
    } else {
      if (linha.trim()) {
        // Verifica se a linha não está vazia
        const colunas = linha.split(","); // Divide a linha em colunas (valores separados por vírgulas)

        // Clona a linha de transação (template)
        let linhaTag = document.getElementById("linha-transacao");
        let novaLinha = linhaTag.cloneNode(true);
        novaLinha.style.display = ""; // Caso o template esteja oculto, exibe a nova linha clonada
        novaLinha.class = "linhas";
        // Define o conteúdo da nova linha clonada
        let numeroLinha = novaLinha.querySelector("#numeroLinha"); // Seleciona o campo número da linha
        if (numeroLinha) {
          numeroLinha.textContent = index;
        }
        let data = novaLinha.querySelector("#data"); // Seleciona o campo data da linha
        if (data) {
          data.textContent = colunas[0];
        }
        let valor = novaLinha.querySelector("#valor"); // Seleciona o campo data da linha
        if (valor) {
          valor.textContent = colunas[3];
        }

        // Adiciona a nova linha na tabela
        tabela.appendChild(novaLinha);
      }
    }
  });
}

function cadastrarCSV(){
  const tabela = document.querySelector("#tabela-transacao");
  linhas = tabela.querySelectorAll("tr");
  transacoes = [];
  linhas.forEach((linha, index) => {
    if (linha.style.display !="none"){
      transacoes.push({Data: linha.querySelector("#data").textContent,Valor: linha.querySelector("#valor").textContent,Credor: linha.querySelector("#credor").value,'Tipo Transacao': linha.querySelector("#tipo-transacao").value});
    }
  });
  // Converte os dados para CSV
  const csvContent = convertToCSV(transacoes);

  // Cria um Blob com os dados CSV
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

  // Cria um link de download
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', document.querySelector('#mes').value+document.querySelector('#ano').value+'.csv'); // Nome do arquivo

  // Adiciona o link ao corpo do documento
  document.body.appendChild(link);
  link.click(); // Simula o clique para baixar o arquivo

  // Remove o link após o download
  document.body.removeChild(link);
}

function convertToCSV(data) {
  // Obtém os cabeçalhos
  const headers = Object.keys(data[0]);
  const csvRows = [];

  // Adiciona os cabeçalhos à primeira linha
  csvRows.push(headers.join(','));

  // Adiciona cada linha de dados
  data.forEach(row => {
      const values = headers.map(header => {
          const escaped = ('' + row[header]).replace(/"/g, '"$&"'); // Escapa aspas
          return `"${escaped}"`; // Adiciona aspas
      });
      csvRows.push(values.join(','));
  });

  return csvRows.join('\n'); // Junta tudo em uma string
}
