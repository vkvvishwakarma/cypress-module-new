
describe('User Registration', () => {
    const apiUrl = Cypress.env('apiUrl');
    console.log("apiUrl=" + apiUrl);
    var userCredential ;
    var email;
    var pwd;
    // Load user data from fixture file before all tests
  before(() => {
    cy.fixture('userData').then((data) => {
        userCredential = data; 
        console.log(data);
    });
  });
  
    it('positive case: should register a new user', () => {
      cy.request({
        method: 'POST',
        url: `${apiUrl}${Cypress.env('registerEndpoint')}`,
        body:  userCredential,
        headers: {
            'accept':`Application/json`,
            'Content-Type': `application/json`,
        }
      }).then((response) => {
        expect(response.status).to.eq(200); // Check for successful registration as schema is showing for 200 status code validating the response of this
        cy.log('User registered:', response.body);
        Cypress.env('userRegistered', true); // global variable will use once its got hit in first time then it should not hit again
      });
    });

    it('negative case: should throw an error for a new user', () => {
        cy.request({
          method: 'POST',
          url: `${apiUrl}${Cypress.env('registerEndpoint')}`,
          body:  userCredential,
          headers: {
              'accept':`Application/json`,
              'Content-Type': `application/json`,
          }
        }).then((response) => {
          expect(response.status).to.eq(422); // Check for successful registration as schema is showing for 200 status code validating the response of this
          cy.log('User is not able to registered:', response.body.detail);
          cy.log('error message is : ', response.body.detail[0].loc.msg);
        });
      });
});