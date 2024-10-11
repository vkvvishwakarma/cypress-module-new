describe('User Login', () => {
    const apiUrl = Cypress.env('apiUrl');
    let userCredential;
  
    before(() => {
      // Load user data from fixture file and register the user
      cy.fixture('userData').then((data) => {
        userCredential = {
          username: data.username, // Unique username
          email: data.email, // Unique email
          password: data.password,
        };
        if (!Cypress.env('userRegistered')) { // checking the condition if the user has already register
            // Register the user to ensure they exist for login
            cy.request({
            method: 'POST',
            url: `${apiUrl}${Cypress.env('registerEndpoint')}`,
            body: userCredential,
            }).then((response) => {
            expect(response.status).to.eq(200); // Check for successful registration
            });
        }
      });
    });
  
    it('positive case: should sign in with the newly registered user', () => {
      cy.request({
        method: 'POST',
        url: `${apiUrl}${Cypress.env('loginEndpoint')}`,
        body: {
          email: userCredential.email,
          password: userCredential.password,
        },
      }).then((response) => {
        expect(response.status).to.eq(200); // Check for successful login
        cy.log('User signed in:', response.body);
      });
    });

    it('negative case: should sverify the error message for login', () => {
        cy.request({
          method: 'POST',
          url: `${apiUrl}${Cypress.env('loginEndpoint')}`,
          body: {
            email: userCredential.email,
            password: userCredential.password,
          },
        }).then((response) => {
          expect(response.status).to.eq(200); // Check for successful login
          cy.log('User should have error:', response.body.detail[0].loc.msg);// put the assertion based on error msg
        });
      });
  });