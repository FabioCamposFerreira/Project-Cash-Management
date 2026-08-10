// App Script não retorna codigos 401, 500, etc. Ela só retorna 200. por isso uso só ok e false no retorno
// Json de reposta só pode ser assim:
// {ok:true,message:string,data:string}
// Por segurança a api não pode retornar a causa real do erro, para evitar ataques por tentativa e falha
// pegar os header ta tabela e não a posição ab,c,d... ou 0,1,2,3...
// Planilhas:
// - transactions_types
// --id? uuid (obrigatorio)
// --user_id :uuid (obrigatorio)
// --name: string (obrigatorio)
// --min_value: decimal monetario (so aceita até duas casas decimais depois da virgula) (obrigatorio)
// --max_value: decimal monetario (so aceita até duas casas decimais depois da virgula) (obrigatorio)
// --start_date: datatime (obrigatorio)
// --end_date: datatime (obrigatorio)
// - transactions
// --id? uuid (obrigatorio)
// --user_id :uuid (obrigatorio)
// --type_id :uuid (obrigatorio)
// --value: decimal monetario (so aceita até duas casas decimais depois da virgula) (obrigatorio)
// --date: datatime (obrigatorio)
// --observation: string opcional
// --deleted_at: dsata time opcional
// Sempre valitdar se os dados recebidos não são vazios e se são do tipo certo
// O retorno dever ser true ou false no ok, na mensssagem deve ser: "sucesso", "json invalido" quando algum campo obrigatorio esta errado, "dados invalidos" quando não achou no google sheet
// TODO: validar double click, se uma linha tem o mesmo tipo, valor e data, não criar uma nova para não duplicar. Se ja esta deletado não deletar novamente, etc...


const SPREADSHEET_ID = '1YeW1ZWhj80J-aiJX-27sfal6nvF6U_yObyNpnN-enYU'; // pegue do URL
const SECRET_SALT = "53b61135215a5562569bf1f3b0f6dc27";
const TABLE_TO_SHEET = {
  users: "users",
  transactions: "transactions",
  transactions_types: "transactions_types",
};

// Função para criar Hash SHA-256
function hashPassword(password) {
  const signature = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, password + SECRET_SALT);
  return signature.map(byte => ('0' + (byte & 0xFF).toString(16)).slice(-2)).join('');
}

// Resposta Padrão para evitar vazamento de dados
function apiResponse(ok, message, data) {
  const response = { ok: ok };
  if (message) response.message = message;
  if (data) response.data = typeof data === 'object' ? JSON.stringify(data) : String(data);

  return ContentService.createTextOutput(JSON.stringify(response))
    .setMimeType(ContentService.MimeType.JSON);
}

function generateToken(tamanho) {
  var caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var token = '';
  for (var i = 0; i < tamanho; i++) {
    var indice = Math.floor(Math.random() * caracteres.length);
    token += caracteres.charAt(indice);
  }
  return token;
}

function fixUsersIds() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sh = ss.getSheetByName("users");
  const values = sh.getDataRange().getValues();
  if (values.length < 2) return;

  let maxId = 0;

  // acha maior id existente
  for (let i = 1; i < values.length; i++) {
    const id = Number(values[i][0]);
    if (Number.isFinite(id)) maxId = Math.max(maxId, id);
  }

  // preenche ids vazios
  for (let i = 1; i < values.length; i++) {
    const current = values[i][0];
    if (current === "" || current === null) {
      maxId++;
      sh.getRange(i + 1, 1).setValue(maxId);
    }
  }
}

// função padrão do app scrip quando faz post para esta url
function doPost(e) {
  const jsonOut = (obj) =>
    ContentService.createTextOutput(JSON.stringify(obj))
      .setMimeType(ContentService.MimeType.JSON);
  // pega o corpo da requisição
  let data;
  try {
    data = JSON.parse(e?.postData?.contents || "{}");
  } catch (err) {
    return jsonOut({ ok: false, message: "JSON inválido", details: String(err) });
  }
  //pega a ação
  const action = String(data.action || "").trim();

  switch (action) {
    case 'register':
      return handleRegister(data);
    case 'login':
      return handleLogin(data);
    case 'get_transaction_types':
      return handleGetTransactionType(data);
    case 'post_transaction_types':
      return handleInsertTransactionType(data);
    case 'put_transaction_types':
      return handleUpdateTransactionType(data);
    case 'delete_transaction_types':
      return handleDeleteTransactionType(data);
      case 'get_transaction':
      return handleGetTransaction(data);
    case 'post_transaction':
      return handleInsertTransaction(data);
    case 'put_transaction':
      return handleUpdateTransaction(data);
    case 'delete_transaction':
      return handleDeleteTransaction(data);
    default:
      return jsonOut({ ok: false, message: "Erro Interno" });
  }
}

// função para criar novo usuario
function handleRegister(data) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID)
  const sheet = ss.getSheetByName("users");
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000); // evita duplicidade se dois clicarem ao mesmo tempo
    const newUser = data.user; // json esperado: {email,password,name}
    const nameClean = newUser.name.toLowerCase().trim();
    const emailClean = newUser.email.toLowerCase().trim();
    const passwordClean = newUser.password.trim();

    if (!emailClean || !passwordClean || !nameClean) {
      return ContentService.createTextOutput(JSON.stringify({ ok: false, error: "Erro interno", data: JSON.stringify(data) })).setMimeType(ContentService.MimeType.JSON);
    }
    const values = sheet.getDataRange().getValues();
    // Verifica se existe sem dizer explicitamente "o email já existe"
    const exists = values.some(row => row[2] === emailClean);
    if (exists) {
      return apiResponse(false, "Não foi possível completar o cadastro.");
    }
    // gerar novo id
    const secureId = Utilities.getUuid(); // ID Aleatório (UUID)
    const hashedPw = hashPassword(newUser.password); // Senha Criptografada

    const row = [
      secureId, newUser.name, emailClean, hashedPw
    ];
    sheet.appendRow(row);
    return ContentService.createTextOutput(JSON.stringify({ ok: true, message: "Usuário registrado com sucesso!" })).setMimeType(ContentService.MimeType.JSON);
  } catch (e) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: e.toString() })).setMimeType(ContentService.MimeType.JSON);

  } finally {
    lock.releaseLock()
  }

}

// função para criar o usuario entrar
function handleLogin(data) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID)
  const sheet = ss.getSheetByName("users");
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000); // evita duplicidade se dois clicarem ao mesmo tempo
    const newUser = data.user; // json esperado: {email,password}
    const emailClean = newUser.email.toLowerCase().trim();
    const passwordClean = newUser.password.trim();

    if (!emailClean || !passwordClean) {
      return ContentService.createTextOutput(JSON.stringify({ ok: false, error: "Erro interno", data: JSON.stringify(data) })).setMimeType(ContentService.MimeType.JSON);
    }
    const values = sheet.getDataRange().getValues();
    const userIndex = values.findIndex(row => String(row[2]).toLowerCase().trim() === emailClean);
    if (userIndex === -1) {
      return apiResponse(false, "Não foi possível completar o login." + userIndex + emailClean);
    }
    // 2. Extrair a linha real do usuário encontrado
    const userRow = values[userIndex];


    const hashedPw = hashPassword(newUser.password); // Senha Criptografada
    // acertou a senha?
    if (userRow[3] != hashedPw) {
      return apiResponse(false, "Não foi possível completar login.");
    }
    var newToken = generateToken(64);
    var dateLogin = new Date();
    sheet.getRange(userIndex + 1, 5).setValue(newToken);
    sheet.getRange(userIndex + 1, 6).setValue(dateLogin);

    return ContentService.createTextOutput(JSON.stringify({ ok: true, session: newToken, message: "Usuário logado!" })).setMimeType(ContentService.MimeType.JSON);
  } catch (e) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: e.toString() })).setMimeType(ContentService.MimeType.JSON);

  } finally {
    lock.releaseLock()
  }

}
// recebe post com doby 
//{"action":"get_transaction_types",
//"token":"string"
//}

function handleGetTransactionType(data) {
  const token = String(data.token || "").trim();
  const userUuid = validateToken(token);
  if (!userUuid) {
    return apiResponse(false, "Acesso negado: Token inválido ou expirado.");
  }
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName("transactions_types");
  if (!sheet) return apiResponse(false, "Erro interno");
  const values = sheet.getDataRange().getValues();
  if (values.lenght < 2) {
    return apiResponse(true, "nenhum tipo de transação encontrado", { types: [] });
  }
  const headers = values[0].map(h => String(h).trim().toLowerCase());
  const userIdx = headers.indexOf("user"); // coluna foreign Key (FK)
  const deletedAtIdx = headers.indexOf("deleted_at"); // Procura a coluna de deletado
  if (userIdx === -1) return apiResponse(false, "Erro interno");
  const userTypes = values.slice(1).filter(row =>{ 
    // Regra 1: Tem que ser dono (mesmo UUID)
    const isOwner = String(row[userIdx]).trim() === userUuid;
    // Regra 2: A coluna deleted_at tem que estar vazia (Soft delete)
      const isNotDeleted = deletedAtIdx === -1 || row[deletedAtIdx] === "" || row[deletedAtIdx] === null;
      return isOwner && isNotDeleted;
    }).map(row => {
    let obj = {};
    headers.forEach((headerName, index) => {
      // Ignora a coluna 'user' e a coluna 'deleted_at' no retorno pro Frontend
      if (headerName !== "user"  && headerName !== "deleted_at") {
        obj[headerName] = row[index] !== "" ? row[index] : null;
      }
    });
    return obj;
  })
  return apiResponse(true, "Dados recuperados", { types: userTypes });
}


function validateToken(token) {
  if (!token) return false;
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName("users");
  const values = sheet.getDataRange().getValues();
  const todayString = new Date().toDateString();
  const userRow = values.find((row, index) => index > 0 && String(row[4]).trim() === token);
  if (userRow) {
    const dbDate = userRow[5];
    if (dbDate && new Date(dbDate).toDateString() === todayString) {
      return String(userRow[0]).trim();
    }
  }
  return null;
}

function handleInsertTransactionType(data) {
  const userUuid = validateToken(data.token);
  if (!userUuid) return apiResponse(false, "Acesso negado: Token inválido ou expirado.", 401);

  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName("transactions_types");
  const lock = LockService.getScriptLock();

  try {
    lock.waitLock(10000);
    const newType = data.data; // O objeto com os dados da nova categoria

    if (!newType || !newType.name) {
      return apiResponse(false, "Erro interno.");
    }

    // Pega o cabeçalho para montar a linha na ordem correta, dinamicamente
    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0].map(h => String(h).trim().toLowerCase());

    // Gera um UUID para este tipo de transação
    const typeId = Utilities.getUuid();

    const row = headers.map(h => {
      if (h === 'id') return typeId;
      if (h === 'user') return userUuid; // Força a Foreign Key ser do dono do Token
      if (newType[h] !== undefined) return newType[h]; // Preenche o resto
      return "";
    });

    sheet.appendRow(row);

    return apiResponse(true, "Criado com sucesso!");
  } catch (e) {
    return apiResponse(false, "Erro interno: " + e.toString());
  } finally {
    lock.releaseLock();
  }
}

function handleUpdateTransactionType(data) {
  const userUuid = validateToken(data.token);
  if (!userUuid) return apiResponse(false, "Acesso negado.");

  const typeId = String(data.data.id || "").trim();
  const updatedType = data.data; // Objeto com os campos que devem ser alterados

  if (!typeId || !updatedType) {
    return apiResponse(false, "ID da transação e dados são obrigatórios.");
  }
  // Todo: validar se o transaction_type existe

  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName("transactions_types");
  const lock = LockService.getScriptLock();

  try {
    lock.waitLock(10000);
    const values = sheet.getDataRange().getValues();
    const headers = values[0].map(h => String(h).trim().toLowerCase());

    const idIdx = headers.indexOf("id");
    const userIdx = headers.indexOf("user");

    // Procura a linha que tem esse ID E que pertence a este usuário
    const rowIndex = values.findIndex((row, index) =>
      index > 0 && String(row[idIdx]).trim() === typeId && String(row[userIdx]).trim() === userUuid
    );

    if (rowIndex === -1) {
      return apiResponse(false, "Transação não encontrada ou permissão negada.");
    }

    // Altera os dados no array (na memória)
    let rowData = values[rowIndex];
    headers.forEach((h, colIndex) => {
      // Bloqueia a edição do ID e do Dono. Atualiza o resto se foi enviado.
      if (h !== 'id' && h !== 'user' && updatedType[h] !== undefined) {
        rowData[colIndex] = updatedType[h] !== null ? updatedType[h] : "";
      }
    });

    // Salva a linha inteira de volta na planilha (rowIndex + 1 porque a planilha começa no 1)
    sheet.getRange(rowIndex + 1, 1, 1, rowData.length).setValues([rowData]);

    return apiResponse(true, "Atualizado com sucesso!");
  } catch (e) {
    return apiResponse(false, "Erro interno: " + e.toString(), 500);
  } finally {
    lock.releaseLock();
  }
}

function handleDeleteTransactionType(data) {
  const userUuid = validateToken(data.token);
  if (!userUuid) return apiResponse(false, "Acesso negado.");

  const typeId = String(data.data.id || "").trim();
  if (!typeId) return apiResponse(false, "O ID é obrigatório para deletar.");

  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName("transactions_types");
  const lock = LockService.getScriptLock();

  try {
    lock.waitLock(10000);
    const values = sheet.getDataRange().getValues();
    const headers = values[0].map(h => String(h).trim().toLowerCase());

    const idIdx = headers.indexOf("id");
    const userIdx = headers.indexOf("user");

 // Procura a coluna deleted_at. Se não existir, o código cria ela no final!
    let deletedAtIdx = headers.indexOf("deleted_at");
    if (deletedAtIdx === -1) {
      deletedAtIdx = headers.length;
      sheet.getRange(1, deletedAtIdx + 1).setValue("deleted_at");
    }

    const rowIndex = values.findIndex((row, index) =>
      index > 0 && String(row[idIdx]).trim() === typeId && String(row[userIdx]).trim() === userUuid
    );

    if (rowIndex === -1) {
      return apiResponse(false, "Registro não encontrado ou permissão negada.");
    }

    // SOFT DELETE: Em vez de usar sheet.deleteRow(), marcamos a data de exclusão
    sheet.getRange(rowIndex + 1, deletedAtIdx + 1).setValue(new Date());

    

    return apiResponse(true, "Deletado com sucesso!");
  } catch (e) {
    return apiResponse(false, "Erro interno: " + e.toString(), 500);
  } finally {
    lock.releaseLock();
  }
}

function handleGetTransaction(data) {
  const token = String(data.token || "").trim();
  const userUuid = validateToken(token);
  if (!userUuid) {
    return apiResponse(false, "Acesso negado: Token inválido ou expirado.");
  }
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName("transactions");
  if (!sheet) return apiResponse(false, "Erro interno");
  const values = sheet.getDataRange().getValues();
  if (values.lenght < 2) {
    return apiResponse(true, "Dados recuperados", { types: [] });
  }
  const headers = values[0].map(h => String(h).trim().toLowerCase());
  const userIdx = headers.indexOf("user_id"); // coluna foreign Key (FK)
  const deletedAtIdx = headers.indexOf("deleted_at"); // Procura a coluna de deletado
  if (userIdx === -1) return apiResponse(false, "Erro interno");
  const userTransactions  = values.slice(1).filter(row =>{ 
    // Regra 1: Tem que ser dono (mesmo UUID)
    const isOwner = String(row[userIdx]).trim() === userUuid;
    // Regra 2: A coluna deleted_at tem que estar vazia (Soft delete)
      const isNotDeleted = deletedAtIdx === -1 || row[deletedAtIdx] === "" || row[deletedAtIdx] === null;
      return isOwner && isNotDeleted;
    }).map(row => {
    let obj = {};
    headers.forEach((headerName, index) => {
      // Ignora a coluna 'user' e a coluna 'deleted_at' no retorno pro Frontend
      if (headerName !== "user_id"  && headerName !== "deleted_at") {
        obj[headerName] = row[index] !== "" ? row[index] : null;
      }
    });
    return obj;
  })
  return apiResponse(true, "Dados recuperados", { types: userTransactions  });
}


function handleInsertTransaction(data) {
  const userUuid = validateToken(data.token);
  if (!userUuid) return apiResponse(false, "Acesso negado: Token inválido ou expirado.", 401);

  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName("transactions");
  const lock = LockService.getScriptLock();

  try {
    lock.waitLock(10000);
    const newType = data.data; // O objeto com os dados da nova categoria

    if (!newType || !newType.value || !newType.date || !newType.type_id || !newType.id   ) { // todo: melhorar esta validação colocando mais validações
      return apiResponse(false, "Erro interno. aaa");
    }

    // Pega o cabeçalho para montar a linha na ordem correta, dinamicamente
    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0].map(h => String(h).trim().toLowerCase());

    // Gera um UUID para este tipo de transação
    const typeId = Utilities.getUuid();

    const row = headers.map(h => {
      if (h === 'id') return typeId;
      if (h === 'user_id') return userUuid; // Força a Foreign Key ser do dono do Token
      if (newType[h] !== undefined) return newType[h]; // Preenche o resto
      return "";
    });

    sheet.appendRow(row);

    return apiResponse(true, "Criado com sucesso!");
  } catch (e) {
    return apiResponse(false, "Erro interno: " + e.toString());
  } finally {
    lock.releaseLock();
  }
}

function handleUpdateTransaction(data) {
  const userUuid = validateToken(data.token);
  if (!userUuid) return apiResponse(false, "Acesso negado.");

  const typeId = String(data.data.id || "").trim();
  const updatedType = data.data; // Objeto com os campos que devem ser alterados

  if (!typeId || !updatedType) {
    return apiResponse(false, "Erro interno.");
  }

  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName("transactions");
  const lock = LockService.getScriptLock();

  try {
    lock.waitLock(10000);
    const values = sheet.getDataRange().getValues();
    const headers = values[0].map(h => String(h).trim().toLowerCase());

    const idIdx = headers.indexOf("id");
    const userIdx = headers.indexOf("user_id");

    // Procura a linha que tem esse ID E que pertence a este usuário
    const rowIndex = values.findIndex((row, index) =>
      index > 0 && String(row[idIdx]).trim() === typeId && String(row[userIdx]).trim() === userUuid
    );

    if (rowIndex === -1) {
      return apiResponse(false, "Erro interno.");
    }

    // Altera os dados no array (na memória)
    let rowData = values[rowIndex];
    headers.forEach((h, colIndex) => {
      // Bloqueia a edição do ID e do Dono. Atualiza o resto se foi enviado.
      if (h !== 'id' && h !== 'user_id' && updatedType[h] !== undefined) {
        rowData[colIndex] = updatedType[h] !== null ? updatedType[h] : "";
      }
    });

    // Salva a linha inteira de volta na planilha (rowIndex + 1 porque a planilha começa no 1)
    sheet.getRange(rowIndex + 1, 1, 1, rowData.length).setValues([rowData]);

    return apiResponse(true, "Atualizado com sucesso!");
  } catch (e) {
    return apiResponse(false, "Erro interno: " + e.toString(), 500);
  } finally {
    lock.releaseLock();
  }
}

function handleDeleteTransaction(data) {
  const userUuid = validateToken(data.token);
  if (!userUuid) return apiResponse(false, "Acesso negado.");

  const typeId = String(data.data.id || "").trim();
  if (!typeId) return apiResponse(false, "Erro interno.");

  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName("transactions");
  const lock = LockService.getScriptLock();

  try {
    lock.waitLock(10000);
    const values = sheet.getDataRange().getValues();
    const headers = values[0].map(h => String(h).trim().toLowerCase());

    const idIdx = headers.indexOf("id");
    const userIdx = headers.indexOf("user_id");

 // Procura a coluna deleted_at. Se não existir, o código cria ela no final!
    let deletedAtIdx = headers.indexOf("deleted_at");
    if (deletedAtIdx === -1) {
      deletedAtIdx = headers.length;
      sheet.getRange(1, deletedAtIdx + 1).setValue("deleted_at");
    }

    const rowIndex = values.findIndex((row, index) =>
      index > 0 && String(row[idIdx]).trim() === typeId && String(row[userIdx]).trim() === userUuid
    );

    if (rowIndex === -1) {
      return apiResponse(false, "Registro não encontrado ou permissão negada.");
    }

    // SOFT DELETE: Em vez de usar sheet.deleteRow(), marcamos a data de exclusão
    sheet.getRange(rowIndex + 1, deletedAtIdx + 1).setValue(new Date());

    

    return apiResponse(true, "Deletado com sucesso!");
  } catch (e) {
    return apiResponse(false, "Erro interno: " + e.toString(), 500);
  } finally {
    lock.releaseLock();
  }
}