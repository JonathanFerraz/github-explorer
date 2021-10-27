import './commands';

beforeEach(() => {
  cy.intercept('/');
});
