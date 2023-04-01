import { Container } from "@mui/material";
import { redirect, useNavigate } from "react-router-dom";
import { useToken } from "../hooks/usetoken";
import LoginForm from "../loginform";

const Login = () => {
  const { isAuthenticated } = useToken();
  const navigate = useNavigate();
  if (isAuthenticated) navigate("/");
  return (
    <Container component="main" maxWidth="sm">
      <LoginForm />
    </Container>
  );
};

export default Login;
