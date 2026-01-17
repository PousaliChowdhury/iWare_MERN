import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../store/useStore";
import "./logsign.css";

export default function Logout() {
  const logout = useStore((s) => s.logout);
  const navigate = useNavigate();

  useEffect(() => {
    logout();
    navigate("/login");
  }, [logout, navigate]);

  return (
    <div className="auth-page">
      <div className="auth-box">
        <h1>Logging out...</h1>
        <p>Redirecting to login page.</p>
      </div>
    </div>
  );
}
