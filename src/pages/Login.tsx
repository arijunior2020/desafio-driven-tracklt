import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import { UserContext } from "../contexts/UserContextBase";
import LoadingButton from "../components/LoadingButton";
import { api } from "../services/api";
import { User } from "../types/user";
import logo from "../assets/logo.png";

export default function Login() {
  const { setUser } = useContext(UserContext) as {
    setUser: (user: User) => void;
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const body = { email, password };

    setTimeout(() => {
      api
        .post("/auth/login", body)
        .then((res: { data: User }) => {
          setUser(res.data);
          localStorage.setItem("trackit_user", JSON.stringify(res.data));
          navigate("/habitos");
        })
        .catch((err) => {
          alert("Erro no login: " + err.response.data.message);
        })
        .finally(() => setLoading(false));
    }, 3000);
  }

  return (
    <Container>
      <img src={logo} alt="Logo" />
      <form onSubmit={handleLogin}>
        <input
          data-test="email-input"
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
          required
        />
        <input
          data-test="password-input"
          type="password"
          placeholder="senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
          required
        />
        <LoadingButton
          data-test="login-btn"
          text="Entrar"
          loading={loading}
          disabled={loading}
        />
      </form>
      <Link data-test="signup-link" to="/cadastro">
        Não tem uma conta? Cadastre-se!
      </Link>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px 36px 0;
  text-align: center;

  img {
    width: 180px;
    height: 178px;
    margin-bottom: 40px;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 6px;
    width: 100%;
    max-width: 303px;
  }

  input {
    height: 45px;
    border-radius: 5px;
    border: 1px solid #d5d5d5;
    padding: 0 11px;
    font-size: 20px;
    font-family: "Lexend Deca", sans-serif;
    color: #666666;
  }

  input:disabled {
    background-color: #f2f2f2;
    border: 1px solid #d4d4d4;
    opacity: 0.7;
  }

  button {
    width: 100%;
    height: 45px;
    background-color: #52b6ff;
    border: none;
    border-radius: 5px;
    font-size: 20px;
    color: white;
    font-family: "Lexend Deca", sans-serif;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 10px;
  }

  button:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  a {
    margin-top: 25px;
    font-size: 14px;
    color: #52b6ff;
    text-decoration: underline;
    font-family: "Lexend Deca", sans-serif;
  }
`;
