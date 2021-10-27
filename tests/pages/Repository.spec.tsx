import React from 'react';
import MockAdapter from 'axios-mock-adapter';
import { render, act } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';

import factory from '../utils/factory';
import api from '../../src/services/api';
import Repository from '../../src/pages/Repository';

interface GitHubRepository {
  full_name: string;
  description: string;
  owner: {
    avatar_url: string;
    login: string;
  };
}

interface Issue {
  html_url: string;
}

describe('Repository page', () => {
  const apiMock = new MockAdapter(api);

  it('should exists a link to go back to dashboard page', async () => {
    const repository: GitHubRepository = await factory.attrs('Repository');
    const issues: Issue[] = await factory.attrsMany('Issue', 3);

    apiMock
      .onGet(`/repos/${repository.full_name}`)
      .reply(200, repository)
      .onGet(`/repos/${repository.full_name}/issues`)
      .reply(200, issues);

    await act(async () => {
      const { getByText } = render(
        <MemoryRouter
          initialEntries={[`/repositories/${repository.full_name}`]}
        >
          <Route path="/repositories/:repository+">
            <Repository />
          </Route>
          ,
        </MemoryRouter>,
      );

      expect(getByText('Voltar')).toBeInTheDocument();
      expect(getByText('Voltar')).toHaveAttribute('href', '/');
    });
  });
});
