import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useStore } from "../store/useStore";
import "./logsign.css";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
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
      const res = await axios.post("${import.meta.env.VITE_API_URL}/api/auth/signup", {
        email: form.email,
        password: form.password,
      });

      if (!res.data.token || !res.data.user) {
        alert("✅ Signup successful! Please login.");
        return navigate("/login");
      }

      localStorage.setItem("token", res.data.token);

      login({
        id: res.data.user.id,
        email: res.data.user.email,
        token: res.data.token,
      });

      await fetchUserData();

      alert("✅ Signup successful!");
      navigate("/"); 
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.msg || "Signup failed");
    }
  };

  return (
    <div className="page auth-page">
      <div className="auth-box">
        <h1>Signup</h1>
        <form onSubmit={handleSubmit} className="auth-form">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
          />
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
            Signup
          </button>
        </form>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}
