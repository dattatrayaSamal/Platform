import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const ProtectedRoute = ({ component: Component }) => {
  const { token } = useContext(AuthContext);

  return token ? <Component /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
