import pandas as pd

# Função para perguntar ao usuário sobre a categoria de um pagamento
def obter_categoria(historico):
    categoria = input(f"Qual é a categoria para o pagamento '{historico}'? ")
    return categoria

# Caminho para o arquivo CSV
caminho_arquivo = 'extrato.csv'

# Carregar o arquivo CSV
df = pd.read_csv(caminho_arquivo)

# Verificar as primeiras linhas para entender a estrutura
print("Primeiras linhas do DataFrame:")
print(df.head())

# Adicionar uma nova coluna 'Categoria'
df['Categoria'] = df['Histórico'].apply(obter_categoria)

# Salvar o DataFrame atualizado em um novo arquivo CSV
caminho_arquivo_atualizado = 'extrato_com_categorias.csv'
df.to_csv(caminho_arquivo_atualizado, index=False)

print(f"\nArquivo atualizado salvo como '{caminho_arquivo_atualizado}'.")

