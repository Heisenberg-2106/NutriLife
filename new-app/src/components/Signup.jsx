import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "../styles/Auth.css";

export default function Signup({ toggle }) {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    if (!name || !age || !email || !gender || !password) {
      toast.error("All fields are required!");
      return;
    }

    try {
      await axios.post("http://localhost:5000/signup", { name, age, email, gender, password });
      toast.success("Signup successful! Please log in.");
      toggle();
    } catch (err) {
      toast.error("Signup failed!");
    }
  };

  return (
    <>
      <div className="auth-box">
        <h2>Sign Up</h2>
        <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} required />
        <input type="number" placeholder="Age" onChange={(e) => setAge(e.target.value)} required />
        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
        <select onChange={(e) => setGender(e.target.value)} required>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
        <button onClick={handleSignup}>Sign Up</button>
        <p>Already have an account? <span onClick={toggle}>Login</span></p>
      </div>

    </>
  );
}
