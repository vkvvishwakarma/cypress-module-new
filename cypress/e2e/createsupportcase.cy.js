describe('Create Support Case', () => {
    const apiUrl = Cypress.env('apiUrl');
    let userId;
    var itemId = 0;
    
    before(() => {
        // Use the common command to register and login the user
        cy.registerAndLogin().then((Id) => {
            userId = Id; // Store the token for creating a support case
        });
      });
  
    it('positive case: should create a support case', () => {
      cy.request({
        method: 'POST',
        url: `${apiUrl}${Cypress.env('createCaseEndpoint')}`,
        body: {
            case_name: 'Support Case',
            user_id: `${userId}`,
            item_id: `${itemId}`,
        },
      }).then((response) => {
        expect(response.status).to.eq(200); // Check for successful case creation  it should get validate with 201 status code schema is showing 200.
        cy.log('Support case created:', response.body);
      });
    });

    it('negative case: should create a support case', () => {
        cy.request({
          method: 'POST',
          url: `${apiUrl}${Cypress.env('createCaseEndpoint')}`,
          body: {
              case_name: 'Support Case',
              user_id: `${userId}`,
              item_id: `${itemId}`,
          },
        }).then((response) => {
          expect(response.status).to.eq(422); // Check for successful case creation  it should get validate with 201 status code schema is showing 200.
          cy.log('Support case did not create:', response.body);
          cy.log('User should have error:', response.body.detail[0].loc.msg);// put the assertion based on error msg
        });
      });
  });