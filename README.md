# back-teste

1. Abra um diretorio e utilize o comando 'git clone https://github.com/Stablest/back-teste.git'.

2. Utilize o comando 'npm install' para instalar as dependências.

3. Crie um arquivo .env na raíz do projeto, como o exemplo a seguir, substituindo o MONGO_URI pela URI do seu bando de dados MONGO:

    PORT=4000

   
    MONGO_URI='mongodb+srv://<username>:<password>@<your-cluster-url>/test?retryWrites=true&w=majority'

   
    JWT_SECRET='eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTY5ODAyMTk1OSwiaWF0IjoxNjk4MDIxOTU5fQ.xw18kvWqTTqCJ0Ssrxq9fyqMRhMxNBfWGxc9rLCsGF4'

4. Importe o arquivo 'CRUD-TESTE.users.json' para seu banco mongo. O nome do banco deve ser CRUD-TESTE e a unica coleção nele deve se chamar users.

5. Agora basta rodar a aplicação com 'npm run dev'.
   
