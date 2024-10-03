import { useContext, useEffect } from "react";
import UserContext from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const PrivateRoute = ({ element }) => {
  const { jswToken } = useContext(UserContext);
  console.log(jswToken);

  // const token = jswToken;
  const navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem("token"));

  useEffect(() => {
    if (!token) {
      navigate("/"); // Redirect to login if no token
      console.log("hi");
    }
  }, [token, navigate]);

  return token ? element : null; // Render the element if authenticated
};

export default PrivateRoute;
