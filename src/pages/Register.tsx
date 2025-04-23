import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import LoadingButton from "../components/LoadingButton";
import { api } from "../services/api";
import { SignUpData } from "../types/user";
import logo from "../assets/logo.png";

export default function Register() {
  const [form, setForm] = useState<SignUpData>({
    email: "",
    password: "",
    name: "",
    image: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      api
        .post("/auth/sign-up", form)
        .then(() => navigate("/"))
        .catch((err) => {
          alert("Erro ao cadastrar: " + err.response.data.message);
        })
        .finally(() => setLoading(false));
    }, 3000); // simula 3 segundo de delay
  }

  return (
    <Container>
      <img src={logo} alt="Logo" />
      <form onSubmit={handleSubmit}>
        <input
          name="email"
          type="email"
          placeholder="email"
          value={form.email}
          onChange={handleChange}
          disabled={loading}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="senha"
          value={form.password}
          onChange={handleChange}
          disabled={loading}
          required
        />
        <input
          name="name"
          type="text"
          placeholder="nome"
          value={form.name}
          onChange={handleChange}
          disabled={loading}
          required
        />
        <input
          name="image"
          type="url"
          placeholder="foto (URL)"
          value={form.image}
          onChange={handleChange}
          disabled={loading}
          required
        />
        <LoadingButton text="Cadastrar" loading={loading} disabled={loading} />
      </form>
      <Link to="/">Já tem uma conta? Faça login!</Link>
    </Container>
  );
}

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-top: 68px;
  padding-inline: 36px;
  text-align: center;

  img {
    width: 180px;
    height: 178.38px;
    margin-bottom: 40px;
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;

    input {
      width: 303px;
      height: 45px;
      padding: 0 11px;
      font-size: 20px;
      font-family: "Lexend Deca", sans-serif;
      border: 1px solid #d4d4d4;
      border-radius: 5px;
      color: #666666;

      &::placeholder {
        color: #dbdbdb;
      }
    }

    input:disabled {
      background-color: #f2f2f2;
      border: 1px solid #d4d4d4;
      opacity: 0.7;
    }

    button {
      width: 303px;
      height: 45px;
      background-color: #52b6ff;
      color: white;
      font-size: 21px;
      border: none;
      border-radius: 4.64px;
    }

    button:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }
  }

  a {
    display: inline-block;
    margin-top: 25px;
    font-size: 13.98px;
    font-family: "Lexend Deca", sans-serif;
    color: #52b6ff;
    text-decoration: underline;
  }
`;
