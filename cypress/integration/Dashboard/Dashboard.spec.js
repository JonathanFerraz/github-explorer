/* eslint-disable no-undef */

// Add intellisense
/// <reference types="cypress" />

describe('Cypress Test: Dashboard Component', async () => {
  it('should render the Dashboard page', () => {
    cy.goToHomePage();
    cy.get('.sc-hKFxyN').should('contain', 'Explore repositórios no GitHub');
    cy.get('input').should(
      'have.attr',
      'placeholder',
      'Digite o nome do repositório',
    );
    cy.get('[data-testid=submit]').should('be.visible');
  });

  it('should render empty input error', () => {
    cy.goToHomePage();
    cy.get('[data-testid=submit]').click();
    cy.get('input').should('have.css', 'border-color', 'rgb(197, 48, 48)');
    cy.get('.sc-jSFjdj')
      .contains('Type repository author/name')
      .should('be.visible');
  });

  it('should render searching repository error', () => {
    cy.goToHomePage();
    cy.get('input').type('notfound');
    cy.get('[data-testid=submit]').click();
    cy.get('input').should('have.css', 'border-color', 'rgb(197, 48, 48)');
    cy.get('.sc-jSFjdj')
      .contains('Error while searching this repository')
      .should('be.visible');
  });

  it('should searching github repository', () => {
    cy.goToHomePage();
    cy.get('input').type('facebook/react');
    cy.get('[data-testid=submit]').click();

    cy.get('[data-testid="facebook/react"]').should('be.visible');
  });

  it('should visit repository infos', () => {
    cy.goToHomePage();
    cy.get('input').type('facebook/react');
    cy.get('[data-testid=submit]').click();
    cy.get('[data-testid="facebook/react"]').click();
    cy.location('pathname').should('eq', '/repositories/facebook/react');
  });
});
