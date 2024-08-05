import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../storage/store.ts";
import { useNavigate } from "react-router-dom";

export default function RequireAuth({ children }: { children: ReactNode }) {
  const auth = useSelector((state: RootState) => state.user.auth);
  const navigate = useNavigate();

  if (auth) {
    return children;
  } else {
    navigate("/auth");
    return;
  }
}
