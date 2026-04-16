# Cash Manager 

## Arquivos
index.html - Interface do usuário para cadastro de usuários, tipos de transações e transações financeiras.
dashboard.html - Interface para visualização de transações e tipos de transações cadastrados.
cadastro.js - Lógica para lidar com o cadastro de usuários, tipos de transações e transações financeiras.
types.js - Lógica para lidar com a ex
transactions.js - Lógica para lidar com a exibição de transações e tipos de transações no dashboard.
settingspopup.js - Lógica para lidar com as configurações do usuário, como edição de perfil e exclusão de conta.
newtypepopup.js - Lógica para lidar com o cadastro de novos tipos de transações.
newtransactionpopup.js - Lógica para lidar com o cadastro de novas transações financeiras.
styles.css - Estilos para as interfaces do usuário.

## Tecnologias
- React
- GoogleSheets

## Ferramentas
- Figma
- stitch.withgoogle.com

## Regras de CSS
- Text normal: size 14, font inter,
- Spacing max: 24px
- Spacing min: 8px
- KPI text: 24px
- KPI text: extra bold
- text placeholder cor: #BDBDBD
- cor principal: #0BCA93
- cor secundaria: #31EF8D
- cor texto: #000000
- cor butão: #1A1B1F
- cor borda: #353945

## API

## Endpoint

```text
https://script.google.com/macros/s/AKfycbyO14asrrrZes_25QGzw1AfRK5q-E4tNgfzksg1ytYzb1O5Pf6Btg_cJP99qmdTm545/exec
```

## Criar Usuário

**Descrição:** Cria um novo usuário no sistema.

**Request body:**

```json
{
  "table": "users",
  "email": "maria@empresa.com",
  "password": "123456"
}
```

---

## Criar Tipo de Transação

**Descrição:** Cria um novo tipo de transação com limites de valor e intervalo de datas.

**Request body:**

```json
{
  "table": "transactions_types",
  "name": "Alimentação",
  "user": 1,
  "min_value": 10,
  "max_value": 200,
  "start_date": "2026-03-01",
  "end_date": "2026-12-31"
}
```

---

## Criar Transação

**Descrição:** Registra uma nova transação financeira.

**Request body:**

```json
{
  "table": "transactions",
  "user_id": 1,
  "type_id": 1,
  "value": 59.9,
  "date": "2026-03-12"
}
```
