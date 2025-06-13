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

Cypress.Commands.add('deleteUserAndAssert', (userId, expectedStatus = 204) => {
  cy.request({
    method: 'DELETE',
    url: `https://reqres.in/api/users/${userId}`,
          headers: {
        "x-api-key": "reqres-free-v1",
      },
    failOnStatusCode: false // Let tests handle assertions on status code
  }).then((response) => {
    expect(response.status).to.eq(expectedStatus);
    expect(response.body).to.be.empty;
  });
}); 

