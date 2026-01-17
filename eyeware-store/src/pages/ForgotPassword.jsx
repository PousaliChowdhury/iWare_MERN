import { useState } from "react";
import axios from "axios";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    const res = await axios.post(
      "http://localhost:7000/api/auth/forgot-password",
      { email }
    );
    setMsg(res.data.msg);
  };

  return (
    <div className="auth-box">
      <h1>Forgot Password</h1>
      <form onSubmit={submit} style={{ padding: "20px" }}>
  <input
    type="email"
    placeholder="Enter your email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    required
    style={{
      padding: "10px 16px",
      width: "315px",
      marginBottom: "12px",
      borderRadius: "5px",
      border: "1px solid #fbe0e0ff",
    }}
  /><br />

  <button
    type="submit"
    style={{
      padding: "10px 16px",
      backgroundColor: "cyan",
      color: "#4049eeff",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      width: "350px",
    }}
  >
    Send Reset Link
  </button>
</form>

      {msg && <p>{msg}</p>}
    </div>
  );
}
