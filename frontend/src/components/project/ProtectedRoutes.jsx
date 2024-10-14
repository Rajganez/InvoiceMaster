import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import Error401 from "./ErrorPage";

const isAuthenticated = () => {
  return localStorage.getItem("auth_token");
};

const roleAuth = localStorage.getItem("auth_Role");
console.log(roleAuth);

const supplierAccess = ["/", "/distributor", "/billing"];
const retailerAccess = ["/", "/retailer"];

const ProtectedRoutes = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/" />;
  }
  if (roleAuth === "distributor") {
    if (supplierAccess.includes(window.location.pathname)) {
      return children;
    } else {
      return <Error401 />;
    }
  } else if (roleAuth === "retailer") {
    if (retailerAccess.includes(window.location.pathname)) {
      return children;
    } else {
      return <Error401 />;
    }
  }
};

export default ProtectedRoutes;

ProtectedRoutes.propTypes = {
  children: PropTypes.node,
};
