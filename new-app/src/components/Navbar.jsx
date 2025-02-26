import { Link } from "react-router-dom";
import "../styles/Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <h1 className="logo">NutriLife</h1>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/chatbot">Chatbot</Link></li>
        <li><Link to="/daily-log">Daily Log</Link></li>
        <li><Link to="/recipes">Recipes</Link></li>
      </ul>
    </nav>
  );
}
