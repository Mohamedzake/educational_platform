import styled from "styled-components";

import Logo from "../ui/Logo";
import Heading from "../ui/Heading";
import LoginForm from "../features/authentication/LoginForm";

const LoginLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 40rem;
  align-content: center;
  justify-content: center;
  gap: 2rem;
  background-color: #f9fafb;
  /* background-image: url("/cabin-002.jpg"); */
`;

function Login() {
  return (
    <LoginLayout>
      <Logo />
      <Heading as="h4">Log in to your account</Heading>
      <LoginForm />
    </LoginLayout>
  );
}

export default Login;
