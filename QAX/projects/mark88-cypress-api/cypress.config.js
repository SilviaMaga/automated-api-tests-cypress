const { defineConfig } = require("cypress");
// Importa a função 'defineConfig' do Cypress. Essa função é usada para definir e exportar as configurações do Cypress de forma padronizada.

const { connect } = require('./cypress/support/mongo');
// Importa a função 'connect' do arquivo 'mongo.js' localizado em 'cypress/support'. 
// Essa função será usada para conectar ao banco de dados MongoDB.

module.exports = defineConfig({
  e2e: {
    async setupNodeEvents(on, config) {
      // Esta função 'setupNodeEvents' é assíncrona e é usada para configurar eventos do Cypress. 
      // Ela é chamada antes da execução dos testes.

      // Conectar ao banco de dados
      const db = await connect();
      // Chama a função 'connect' para estabelecer uma conexão com o banco de dados. 
      // A conexão resultante é armazenada na constante 'db'.

      // Definir a task para deletar o usuário
      on('task', {
        async deleteUser(email) {
          const users = db.collection('users');
          const result = await users.deleteMany({ email: email }); // Corrigido o nome do campo para 'email'
          console.log(`Deleted ${result.deletedCount} user(s) with email ${email}`);
          return result.deletedCount; // Retorne o número de usuários deletados
        }
      });
    },
    baseUrl: 'http://localhost:3333'
    // Define a URL base para a execução dos testes end-to-end (e2e). 
    // Neste caso, o Cypress irá direcionar as requisições para 'http://localhost:3333'.
  },
});
