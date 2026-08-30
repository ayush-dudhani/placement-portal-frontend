import { Navigate, Outlet } from "react-router-dom";

/**
 * Keeps workspace routes aligned with the role returned by the API at login.
 * This is a client-side convenience layer; the backend must still enforce
 * authorization for every protected API endpoint.
 */
export default function RequireRole({ role }) {
  const sessionRole = sessionStorage.getItem("role")?.toUpperCase();

  if (!sessionStorage.getItem("accessToken")) {
    return <Navigate to="/login" replace />;
  }

  if (!["STUDENT", "ADMIN"].includes(sessionRole)) {
    return <Navigate to="/login" replace />;
  }

  if (sessionRole !== role) {
    return <Navigate to={sessionRole === "ADMIN" ? "/admin/dashboard" : "/student/dashboard"} replace />;
  }

  return <Outlet />;
}
