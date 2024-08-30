// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// Definir o comando Cypress personalizado para 'postUser'
Cypress.Commands.add('postUser', (user) => {
    cy.api({
      url: '/users',         // Endpoint da API onde o usuário será registrado        
      method: 'POST',        // Método HTTP utilizado para a requisição        
      body: user,            // Dados do usuário que serão enviados no corpo da requisição
      failOnStatusCode: false // Configuração para não falhar o teste automaticamente caso o status da resposta seja diferente de 2xx
    }).then(response => {  
      return response; // Retorna a resposta para que possa ser usada nos testes
    });
  });