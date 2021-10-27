import styled, { css } from 'styled-components';
import { shade } from 'polished';

export const Title = styled.h1`
  color: #3a3a3a;
  font-size: 48px;
  line-height: 56px;
  margin-top: 80px;
  max-width: 450px;
`;

interface FormProps {
  hasError: boolean;
}

export const Form = styled.form<FormProps>`
  display: flex;
  margin-top: 40px;
  max-width: 700px;

  input {
    border: 2px solid #fff;
    border-right: 0px;
    border-radius: 5px 0px 0px 5px;
    color: #3a3a3a;
    flex: 1;
    height: 70px;
    padding: 0px 24px;

    ${(props) =>
      props.hasError &&
      css`
        border-color: #c53030;
      `}

    &::placeholder {
      color: #a8a8b3;
    }
  }

  button {
    background-color: #04d361;
    border: 0px;
    border-radius: 0px 5px 5px 0px;
    color: #fff;
    font-weight: bold;
    height: 70px;
    transition: background 0.2s;
    width: 210px;

    &:hover {
      background-color: ${shade(0.2, '#04d361')};
    }
  }
`;

export const Error = styled.span`
  color: #c53030;
  display: block;
  margin-top: 8px;
`;

export const Repositories = styled.div`
  margin-top: 80px;
  max-width: 700px;

  a {
    align-items: center;
    background-color: #fff;
    border-radius: 5px;
    display: flex;
    padding: 24px;
    text-decoration: none;
    transition: transform 0.2s;
    width: 100%;

    & + a {
      margin-top: 16px;
    }

    &:hover {
      transform: translateX(10px);
    }

    img {
      border-radius: 50%;
      height: 64px;
      width: 64px;
    }

    div {
      flex: 1;
      margin: 0px 16px;

      strong {
        color: #3d3d4d;
        font-size: 20px;
      }

      p {
        color: #a8a8b3;
        font-size: 18px;
        margin-top: 4px;
      }
    }

    svg {
      color: #cbcbd6;
      margin-left: auto;
    }
  }
`;
