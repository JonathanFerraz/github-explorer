import React, { useEffect, useState } from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import { FiChevronsLeft, FiChevronRight } from 'react-icons/fi';

import Logo from '../../assets/logo.svg';
import api from '../../services/api';
import { Header, Details, Issues } from './styles';

interface RepositoryParams {
  repository: string;
}

interface Repository {
  full_name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  owner: {
    login: string;
    avatar_url: string;
  };
}

interface Issue {
  id: number;
  title: string;
  html_url: string;
  user: {
    login: string;
  };
}

const Repository: React.FC = () => {
  const [repo, setRepo] = useState<Repository | null>(null);
  const [issues, setIssues] = useState<Issue[]>([]);
  const { params } = useRouteMatch<RepositoryParams>();

  useEffect(() => {
    (async () => {
      const { data } = await api.get(`/repos/${params.repository}`);
      setRepo(data);
    })();
  }, [params.repository]);

  useEffect(() => {
    (async () => {
      const { data } = await api.get(`/repos/${params.repository}/issues`);
      setIssues(data);
    })();
  }, [params.repository]);

  return (
    <>
      <Header>
        <img src={Logo} alt="GitHub Explorer" />
        <Link to="/">
          <FiChevronsLeft size={16} />
          Voltar
        </Link>
      </Header>
      {repo && (
        <Details>
          <header>
            <img src={repo.owner.avatar_url} alt={repo.owner.login} />
            <div>
              <strong>{repo.full_name}</strong>
              <p>{repo.description}</p>
            </div>
          </header>
          <ul>
            <li>
              <strong>{repo.stargazers_count}</strong>
              <span>Stars</span>
            </li>
            <li>
              <strong>{repo.forks_count}</strong>
              <span>Forks</span>
            </li>
            <li>
              <strong>{repo.open_issues_count}</strong>
              <span>Issues abertas</span>
            </li>
          </ul>
        </Details>
      )}
      <Issues>
        {issues.map((issue) => (
          <a
            key={issue.id}
            href={issue.html_url}
            rel="noopener noreferrer"
            target="_blank"
          >
            <div>
              <strong>{issue.title}</strong>
              <p>{issue.user.login}</p>
            </div>

            <FiChevronRight size={20} />
          </a>
        ))}
      </Issues>
    </>
  );
};

export default Repository;
