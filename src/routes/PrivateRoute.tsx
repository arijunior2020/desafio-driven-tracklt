import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContextBase";
import { ReactElement } from "react";

interface Props {
  children: ReactElement;
}

export default function PrivateRoute({ children }: Props) {
  const { user } = useContext(UserContext);

  if (!user || !user.token) {
    return <Navigate to="/" replace />;
  }

  return children;
}
