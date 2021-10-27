/* eslint-disable no-undef */

// Add intellisense
/// <reference types="cypress" />

import repo from '../../fixtures/repo.json';
import issue from '../../fixtures/issues.json';

beforeEach(() => {
  cy.intercept('GET', 'https://api.github.com/repos/facebook/react', {
    fixture: 'repo.json',
  });
  cy.intercept('GET', 'https://api.github.com/repos/facebook/react/issues', {
    fixture: 'issues.json',
  });
  cy.visit('/repositories/facebook/react');
});

describe('Cypress Test: Dashboard Component', async () => {
  it('should show correct repo data in the Repository page', () => {
    cy.get('[data-cy=owner-avatar]').should(
      'have.attr',
      'src',
      repo.owner.avatar_url,
    );

    cy.get('[data-cy=repo-full-name]').should('contain', repo.full_name);
    cy.get('[data-cy=repo-description]').should('contain', repo.description);
    cy.get('[data-cy=starts-count]').should('contain', repo.stargazers_count);
    cy.get('[data-cy=forks-count]').should('contain', repo.forks_count);
    cy.get('[data-cy=issues-count]').should('contain', repo.open_issues_count);
  });

  it('should show correct issues data in the Repository page', () => {
    cy.get('[data-cy=repo-issues] > a').each(($cyIssue, index) => {
      cy.wrap($cyIssue).should('have.attr', 'href', issue[index].html_url);
      cy.wrap($cyIssue)
        .get('[data-cy=issue-info] > [data-cy=issue-title]')
        .should('contain', issue[index].title);
      cy.wrap($cyIssue)
        .get('[data-cy=issue-info] > [data-cy=user-login]')
        .should('contain', issue[index].user.login);
    });
  });

  it('should redirect to github issue when click a issue', () => {
    cy.get('[data-cy=repo-issues] > a').each(($cyIssue) => {
      cy.wrap($cyIssue).click();
    });
  });

  it('should go back to Home page', () => {
    cy.get('[data-cy=back-button]').click();
    cy.location('pathname').should('eq', '/');
  });
});
