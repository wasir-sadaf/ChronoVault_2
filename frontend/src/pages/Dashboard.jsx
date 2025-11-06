import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

export default function Dashboard() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.userId;

  useEffect(() => {
    if (!userId) {
      navigate("/login");
      return;
    }
  }, [userId, navigate]);

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>

      <div className="dashboard-card">
        <h3>Welcome, {user?.username || "User"}!</h3>
        <p>
          Step into your ChronoVault — where memories are locked in time.
          Manage your personal time capsules with full control and security.
        </p>

        <div className="tabs">
          <button onClick={() => navigate("/watch-capsules")}>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="black">
              <path d="M8 5v14l11-7z" />
            </svg>
            <span>Watch Capsules</span>
          </button>
          <button onClick={() => navigate("/create-capsule")}>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="black">
              <path d="M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
            </svg>
            <span>Create Capsule</span>
          </button>
        </div>
      </div>
    </div>
  );
}
