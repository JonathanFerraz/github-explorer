import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import MockAdapter from 'axios-mock-adapter';

import factory from '../utils/factory';
import Dashboard from '../../src/pages/Dashboard';
import api from '../../src/services/api';

interface GitHubRepository {
  full_name: string;
  description: string;
  owner: {
    avatar_url: string;
    login: string;
  };
}

describe('Dashboard', () => {
  const apiMock = new MockAdapter(api);

  beforeEach(async () => {
    await act(async () => {
      localStorage.clear();
    });
  });

  it('should exists a link to repository page', async () => {
    const repository: GitHubRepository = await factory.attrs('Repository');
    localStorage.setItem(
      '@github_explorer:repositories',
      JSON.stringify([repository]),
    );

    const { getByTestId } = render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>,
    );

    expect(getByTestId(repository.full_name)).toBeInTheDocument();
    expect(getByTestId(repository.full_name)).toHaveAttribute(
      'href',
      `/repositories/${repository.full_name}`,
    );
  });

  it('should be able to add a repository', async () => {
    const repository: GitHubRepository = await factory.attrs('Repository');

    apiMock.onGet(`repos/${repository.full_name}`).reply(200, repository);

    const { getByPlaceholderText, getByTestId } = render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>,
    );

    const input = getByPlaceholderText('Digite o nome do repositório');
    await act(async () => {
      fireEvent.change(input, {
        target: { value: repository.full_name },
      });
    });

    await act(async () => {
      fireEvent.submit(getByTestId('submit'));
    });

    const repositories = localStorage.getItem('@github_explorer:repositories');

    expect(input).toHaveValue('');
    expect(repositories).toBe(JSON.stringify([repository]));
  });

  it('should not be able to add a repository without name', async () => {
    const repository: GitHubRepository = await factory.attrs('Repository');
    localStorage.setItem(
      '@github_explorer:repositories',
      JSON.stringify([repository]),
    );

    const { getByTestId, getByText } = render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>,
    );

    await act(async () => {
      fireEvent.submit(getByTestId('submit'));
    });

    expect(getByText('Type repository author/name')).toBeInTheDocument();
  });

  it("should not be able to add a repository not fetched in GitHub's API", async () => {
    const repository: GitHubRepository = await factory.attrs('Repository');

    apiMock.onGet(`repos/${repository.full_name}`).reply(404);

    const { getByPlaceholderText, getByTestId, getByText } = render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>,
    );

    const input = getByPlaceholderText('Digite o nome do repositório');
    await act(async () => {
      fireEvent.change(input, {
        target: { value: repository.full_name },
      });
    });

    await act(async () => {
      fireEvent.submit(getByTestId('submit'));
    });

    expect(
      getByText('Error while searching this repository'),
    ).toBeInTheDocument();
  });
});
