import React, { useState, FormEvent, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';

import api from '../../services/api';
import Logo from '../../assets/logo.svg';
import { Title, Form, Repositories, Error } from './styles';

interface Repository {
  full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}

const Dashboard: React.FC = () => {
  const [repo, setRepo] = useState('');
  const [repositories, setRepositories] = useState<Repository[]>(() => {
    const storage_repositories = localStorage.getItem(
      '@github_explorer:repositories',
    );
    if (storage_repositories) {
      return JSON.parse(storage_repositories);
    }
    return [];
  });
  const [error, setError] = useState('');

  const handleRepository = async (
    e: FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();

    if (!repo) {
      setError('Type repository author/name');
      return;
    }

    try {
      const response = await api.get<Repository>(`repos/${repo}`);
      setRepositories([...repositories, response.data]);
      setRepo('');
      setError('');
    } catch (err) {
      setError('Error while searching this repository');
    }
  };

  useEffect(() => {
    localStorage.setItem(
      '@github_explorer:repositories',
      JSON.stringify(repositories),
    );
  }, [repositories]);

  return (
    <>
      <img src={Logo} alt="GitHub Explorer" />
      <Title>Explore repositórios no GitHub</Title>

      <Form onSubmit={handleRepository} hasError={!!error}>
        <input
          value={repo}
          onChange={(e) => setRepo(e.target.value)}
          placeholder="Digite o nome do repositório"
        />
        <button data-testid="submit" type="submit">
          Pesquisar
        </button>
      </Form>
      {error && <Error>{error}</Error>}

      <Repositories>
        {repositories.map((repository) => (
          <Link
            key={repository.full_name}
            to={`/repositories/${repository.full_name}`}
            data-testid={repository.full_name}
          >
            <img
              src={repository.owner.avatar_url}
              alt={repository.owner.login}
            />
            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>

            <FiChevronRight size={20} />
          </Link>
        ))}
      </Repositories>
    </>
  );
};

export default Dashboard;
