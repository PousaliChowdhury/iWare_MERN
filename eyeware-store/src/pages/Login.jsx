import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useStore } from "../store/useStore";
import "./logsign.css";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const login = useStore((s) => s.login);
  const fetchUserData = useStore((s) => s.fetchUserData);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("http://localhost:7000/api/auth/login", form);

      localStorage.setItem("token", res.data.token);

      login({
        id: res.data.user.id,
        email: res.data.user.email,
        token: res.data.token,
      });

      await fetchUserData();

      alert("✅ Login successful!");
      navigate("/");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.msg || "Login failed");
    }
  };
  

  return (
    <div className="page auth-page">
      <div className="auth-box">
        <h1>Login</h1>
        <form onSubmit={handleSubmit} className="auth-form">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <button type="submit" className="auth-btn">
            Login
          </button>
        </form>

        {error && <p style={{ color: "red" }}>{error}</p>}
        <p><Link to="/forgot-password">Forgot password?</Link></p>

        <p>
          Don’t have an account? <Link to="/signup">Signup</Link>
        </p>
      </div>
    </div>
  );
}
