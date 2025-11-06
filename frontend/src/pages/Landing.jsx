import { Link } from "react-router-dom";
import "./Landing.css";

export default function Landing() {
  return (
    <div className="landing">
      <div className="landing-card">
        <h1>Welcome to ChronoVault ⏳</h1>
        <p>Your private time capsule app</p>

        <div className="buttons">
          <Link to="/login">
            <button className="btn login-btn">Login</button>
          </Link>
          <Link to="/signup">
            <button className="btn signup-btn">Sign Up</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
