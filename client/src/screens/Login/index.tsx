import axios from "axios";
import { Button } from "components/Button";
import { Input } from "components/Input";
import { AuthContext } from "contexts/auth";
import { useInput } from "hooks/useInput";
import React, { useContext } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styling";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-self: center;
  max-width: 500px;

  > * {
    margin-bottom: 20px;
  }
`;

const Header = styled.h2`
  font-size: 30px;
  font-weight: 900;
  text-align: center;
  padding: 5px 0;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const RegisterLink = styled(Link)`
  text-align: center;
  font-weight: bold;
  font-size: 18px;
`;

export const Login = (props: RouteComponentProps) => {
  const { login } = useContext(AuthContext);

  const [userName, setUserName] = useInput("");
  const [password, setPassword] = useInput("");

  const submitLogin = async () => {
    const { result, error } = await login(userName, password);

    if (result) {
      props.history.push("/");
    }
    if (error) {
      toast.error(error);
      setUserName("");
      setPassword("");
    }
  };

  return (
    <Wrapper>
      <Header>Login</Header>
      <Input placeholder="Username" value={userName} onChange={setUserName} />
      <Input placeholder="Password" value={password} onChange={setPassword} />
      <ButtonWrapper>
        <Button disabled={!userName || !password} onClick={submitLogin}>
          Submit
        </Button>
      </ButtonWrapper>
      <RegisterLink to="/register">I need to create an account</RegisterLink>
    </Wrapper>
  );
};

export const Logout = (props: RouteComponentProps) => {
  const { logout } = useContext(AuthContext);
  logout();
  props.history.push("/");
  return null;
};

export const Register = (props: RouteComponentProps) => {
  const [name, setName] = useInput("");
  const [password, setPassword] = useInput("");

  const register = async () => {
    try {
      await axios.post(`${process.env.API}/api/v1/auth/register`, {
        name,
        password,
      });
      toast.success("Account created successfully");
      props.history.push("/login");
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  return (
    <Wrapper>
      <Header>Register</Header>
      <Input placeholder="Username" value={name} onChange={setName} />
      <Input placeholder="Password" value={password} onChange={setPassword} />
      <ButtonWrapper>
        <Button disabled={!name || !password} onClick={register}>
          Create Account
        </Button>
      </ButtonWrapper>
    </Wrapper>
  );
};
