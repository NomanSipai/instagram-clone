import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element }) => {
  const navigate = useNavigate();
  const jswToken = sessionStorage.getItem("jwtToken");

  return jswToken ? element : navigate("/");
};

export default PrivateRoute;
