import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "../styles/Auth.css";

export default function Login({ toggle }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("All fields are required!");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/login", { email, password });

      // ✅ Save authentication token
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.userId);
      localStorage.setItem("name", res.data.name);

      // ✅ Update authentication state in App.js
      setIsAuthenticated(true);

      toast.success("Login successful!");
      navigate("/"); // ✅ Redirect to Home
      console.log("Logging in process!")

    } catch (err) {
      toast.error("Invalid credentials! Please try again.");
    }
  };

  return (
    <div className="auth-box">
      <h2>Login</h2>
      <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
      <button onClick={handleLogin}>Login</button>
      <p>Don't have an account? <span onClick={toggle}>Sign up</span></p>
    </div>
  );
}
