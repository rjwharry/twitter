import { Navigate } from "react-router-dom";
import { auth } from "../firebase";

function ProtectedRoute({
  children,
} : {
  children: React.ReactNode
}) {

  const user = auth.currentUser; // give logined user or null if not logined
  if (user === null) {
    return <Navigate to="/login" />
  }
  return children;
}

export default ProtectedRoute;