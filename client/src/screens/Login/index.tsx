import { Button } from "components/Button";
import { Input } from "components/Input";
import React from "react";
import { Link } from "react-router-dom";
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

export const Login = () => {
  return (
    <Wrapper>
      <Header>Login</Header>
      <Input placeholder="Username" />
      <Input placeholder="Password" />
      <ButtonWrapper>
        <Button disabled={true}>Submit</Button>
      </ButtonWrapper>
      <RegisterLink to="/register">I need to create an account</RegisterLink>
    </Wrapper>
  );
};

export const Register = () => {
  return (
    <Wrapper>
      <Header>Register</Header>
      <Input placeholder="Username" />
      <Input placeholder="Password" />
      <ButtonWrapper>
        <Button disabled={true}>Create Account</Button>
      </ButtonWrapper>
    </Wrapper>
  );
};
