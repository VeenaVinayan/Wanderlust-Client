import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }: { children: JSX.Element }) => {
  let accessToken: string | null = null;
  let route: string = '/login';
  console.log('In public Route !!');
  if (localStorage.getItem("Admin_accessToken")) {
    accessToken = localStorage.getItem("Admin_accessToken");
    route = '/admin/adminDashboard';
  } else if (localStorage.getItem("Agent_accessToken")) {
    accessToken = localStorage.getItem("Agent_accessToken");
    route = '/agent/agentDashboard';
  } else if (localStorage.getItem("User_accessToken")) {
    accessToken = localStorage.getItem("User_accessToken");
    route = '/user/userProfile';
  }
  if (accessToken) {
    return <Navigate to={route} replace />;
  }
  return children;
};

export default PublicRoute;


