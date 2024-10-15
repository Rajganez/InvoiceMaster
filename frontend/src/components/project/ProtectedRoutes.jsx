import { useState, useEffect } from "react";
import { Navigate, useLocation, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import Error401 from "./ErrorPage";

// Helper to simulate fetching auth data from localStorage
const isAuthenticated = () => {
  return localStorage.getItem("auth_token");
};

const getRole = () => {
  return localStorage.getItem("auth_Role");
};

const ProtectedRoutes = ({ children }) => {
  const [loading, setLoading] = useState(true); // Loading state
  const [auth, setAuth] = useState(null); // Authentication state
  const [role, setRole] = useState(null); // Role state

  const location = useLocation(); // Get current route

  const { id } = useParams(); // Extract dynamic `id` from the URL

  // Supplier and retailer access arrays
  const supplierAccess = ["/", "/distributor", "/billing"];
  const retailerAccess = [
    "/",
    "/retailer",
    `/payment/${id}`, 
    `/view/${id}`,    
  ];

  // Function to check if a path matches any dynamic retailer route
  const matchRetailerAccess = (pathname) => {
    // Check if the current pathname matches any retailer routes with dynamic segments
    return retailerAccess.some((path) => {
      const regex = new RegExp(`^${path.replace(":id", "[a-zA-Z0-9]+")}$`);
      return regex.test(pathname);
    });
  };

  // Fetch auth and role on mount
  useEffect(() => {
    const fetchAuthData = () => {
      const authToken = isAuthenticated();
      const authRole = getRole();
      setAuth(authToken); // Set authentication state
      setRole(authRole); // Set role state
      setLoading(false); // Stop loading once data is fetched
    };

    fetchAuthData();
  }, []);

  // Show loading indicator while fetching the auth/role state
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  // If not authenticated, redirect to login
  if (!auth) {
    return <Navigate to="/" replace />;
  }

  // Check if the user is a distributor and has access to the current route
  if (role === "distributor" && supplierAccess.includes(location.pathname)) {
    return children; // Allow access to supplier routes
  }

  // Check if the user is a retailer and has access to the current route
  if (role === "retailer" && matchRetailerAccess(location.pathname)) {
    return children; // Allow access to retailer routes
  }

  // If no valid role or path match, show the Error401 component
  return <Error401 />;
};

export default ProtectedRoutes;

ProtectedRoutes.propTypes = {
  children: PropTypes.node.isRequired,
};
