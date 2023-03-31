import { redirect, useNavigate } from "react-router-dom";
import { useToken } from "../hooks/usetoken";
import LoginForm from "../loginform";

const Login = () => {
  const { isAuthenticated } = useToken();
  const navigate = useNavigate();
  if (isAuthenticated) navigate("/");
  return (
    <div>
      <LoginForm />
    </div>
  );
};

export default Login;
