import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./WatchCapsules.css";

export default function WatchCapsules() {
  const [capsules, setCapsules] = useState([]);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.userId;

  useEffect(() => {
    if (!userId) {
      navigate("/login");
      return;
    }

    const loadCapsules = async () => {
      try {
        const response = await fetch(`http://localhost:3000/capsules/user/${userId}`);
        const data = await response.json();
        setCapsules(data);
      } catch (err) {
        console.error("Failed to load capsules:", err);
      }
    };

    loadCapsules();
  }, [userId, navigate]);

  const goToCapsule = (id) => {
    navigate(`/capsule/${id}`);
  };

  return (
    <div className="watch-capsules">
      <h2>My Capsules</h2>

      <div className="capsule-list">
        {capsules.length === 0 ? (
          <p>No capsules available.</p>
        ) : (
          capsules.map((c) => (
            <div
              key={c.id}
              className={`capsule-card ${c.is_unlocked ? "unlocked" : "locked"}`}
              onClick={() => goToCapsule(c.id)}
            >
              <h3>{c.title}</h3>
              <p>{c.is_unlocked ? "Unlocked – click to view" : "Locked – click to view"}</p>
            </div>
          ))
        )}
      </div>

      <button className="back-btn" onClick={() => navigate("/dashboard")}>
        &larr; Back to Dashboard
      </button>
    </div>
  );
}
