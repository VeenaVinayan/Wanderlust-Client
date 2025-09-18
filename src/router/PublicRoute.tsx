import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }: { children: JSX.Element }) => {
  let accessToken: string | null = null;
  let route: string = '/login';
  
  if (localStorage.getItem("accessToken")) {
    accessToken = localStorage.getItem("accessToken");
    route = '/login';
  }
  if (accessToken) {
    return <Navigate to={route} replace />;
  }
  return children;
};

export default PublicRoute;


