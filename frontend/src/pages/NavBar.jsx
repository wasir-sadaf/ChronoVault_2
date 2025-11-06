import { useNavigate } from "react-router-dom";
import "./NavBar.css";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <nav className="navbar">
      <h2 className="nav-logo" onClick={() => navigate("/")}>ChronoVault</h2>
      <button className="logout-btn" onClick={handleLogout}>Logout</button>
    </nav>
  );
}
