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
Cypress.Commands.add('registerAndLogin', () => {
    const apiUrl = Cypress.env('apiUrl');
    var userCred;
  
    // Load user data from fixture file
    return cy.fixture('userData').then((data) => {
        userCred = {
        username: `user${Date.now()}`, // Unique username
        email: `user${Date.now()}@example.com`, // Unique email
        password: data.password
      };
  
      // Register the user
      return cy.request({
        method: 'POST',
        url: `${apiUrl}${Cypress.env('registerEndpoint')}`,
        body: userCred,
      }).then((response) => {
        expect(response.status).to.eq(200); // Check for successful registration //should check 201 for creation
        cy.log('User registered:', response.body);
  
        // Log in the user to get the auth token
        return cy.request({
          method: 'POST',
          url: `${apiUrl}${Cypress.env('loginEndpoint')}`,
          body: {
            email: userCred.username,
            password: userCred.password,
          },
        }).then((loginResponse) => {
          expect(loginResponse.status).to.eq(200); // Check for successful login
          const userId = loginResponse.body.user_id;
          cy.log('User signed in:', loginResponse.body);
          return userId;
        });
      });
    });
  });

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