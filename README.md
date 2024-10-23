
# CRUD utilizando node.js

Neste projeto temos um CRUD para adicionar produtos usando requisições http para um servidor.

Foi utilizado Node, JavaScript e JSON.

Para funcionar o projeto:

1° Caso o node e o git não esteja instalado na sua máquina instale.

2° Abra o bash do git e clone o projeto:
git clone https://github.com/Cristphe/StackxHTTP.git

3° Instale as dependências necessárias:
npm init
npm install express express-validator

4° Caso o arquivo data.json não esteja disponivel crie ele na pasta raiz e adicione um [] dentro dele.

5° Para iniciar o projeto abra o terminal, CMD ou PowerShell e digite o código:
node SLDados.js
Vai aparecer que ele está aberto na porta 3000

Agora com todos esses passos o servidor está aberto e pronto para o uso, você tem duas formas de utilizar este projeto, a primeira opção seria o Postman e a segunda o cURL.

Caso esteja utilizando o Postman:

Método POST, digite a URL:
localhost:3000/produtos
Na área do Body coloque em raw e escolha o formato JSON
O exemplo de codigo para adicionar o produto seria:
{
    "nome": "lanche",
    "preco": 100,
    "qtd": 10
}
E clique em Send, o código retornado tem que ser o 201, caso retorne outro verifique se falta alguma dependência a ser instalada.

Método GET, digite a URL:
localhost:3000/produtos
Apenas clique no Send e ele já vai retornar os itens existentes.

Método PUT, digite a URL:
localhost:3000/produtos/{id} 
!! O ID VOCÊ COLOCA DE ACORDO COM OS PRODUTOS JÁ EXISTENTES, POR EXEMPLO: 
localhost:3000/produtos/2

No Body selecione o raw e formato JSON
Exemplo de codigo para atualização do produto existente:
{
    "preco": 150,
    "qtd": 7
}

Método DEL, digite a URL:
localhost:3000/produtos/{id}
!! O ID VOCÊ COLOCA DE ACORDO COM OS PRODUTOS JÁ EXISTENTES, POR EXEMPLO: 
localhost:3000/produtos/2
Clique em Send e será apagado o produto escolhido




