import { useEffect } from "react";
import { getUser } from "../services/apiAuth";
import useUser from "../feature/authentication/useUser";
import Spinner from "./Spinner";
import { useNavigate } from "react-router";

function ProtectedRoute({ children }) {
  const { user = { user: "" }, isLoading } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user && !isLoading) navigate("/login");
  }, [user, navigate, isLoading]);

  if (isLoading)
    return (
      <div className="bg-primary flex h-screen w-screen items-center justify-center overflow-hidden">
        <Spinner />
      </div>
    );

  if (user) return children;
}

export default ProtectedRoute;
