import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./CapsuleDetail.css";

export default function CapsuleDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [capsule, setCapsule] = useState(null);
  const [timeLeft, setTimeLeft] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.userId;

  useEffect(() => {
    if (!userId) {
      navigate("/login");
      return;
    }

    async function fetchCapsule() {
      try {
        const res = await fetch(`http://localhost:3000/capsules/user/${userId}`);
        const data = await res.json();
        const found = data.find(c => c.id === parseInt(id));
        setCapsule(found);
      } catch (err) {
        console.error(err);
      }
    }

    fetchCapsule();
  }, [id, userId, navigate]);

  useEffect(() => {
    if (!capsule) return;
    const interval = setInterval(() => {
      const now = new Date();
      const unlock = new Date(capsule.unlock_date);
      const diff = unlock - now;

      if (diff <= 0) {
        setTimeLeft("Ready to unlock");
        clearInterval(interval);
        return;
      }

      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diff / (1000 * 60)) % 60);
      const s = Math.floor((diff / 1000) % 60);

      setTimeLeft(`${d}d ${h}h ${m}m ${s}s`);
    }, 1000);

    return () => clearInterval(interval);
  }, [capsule]);

  const handleUnlock = async () => {
    try {
      const res = await fetch(`http://localhost:3000/capsules/unlock/${capsule.id}`, {
        method: "PUT",
      });
      const data = await res.json();
      if (res.ok) {
        setCapsule({ ...capsule, is_unlocked: true });
        alert("Capsule unlocked successfully!");
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  if (!capsule) return <p>Loading capsule...</p>;

  return (
    <div className="capsule-detail">
      <div className="capsule-card">
        <h2>{capsule.title}</h2>

        <p><strong>Created on:</strong> {new Date(capsule.created_at).toLocaleString()}</p>
        <p><strong>Unlocks on:</strong> {new Date(capsule.unlock_date).toLocaleString()}</p>

        {!capsule.is_unlocked ? (
          <>
            <p className="timer">Time Remaining: {timeLeft}</p>
            <button onClick={handleUnlock} disabled={new Date(capsule.unlock_date) > new Date()}>
              Unlock Capsule
            </button>
          </>
        ) : (
          <>
            <p className="message">{capsule.message}</p>
            <p>Status: Unlocked ✅</p>
          </>
        )}

        <button className="back-btn" onClick={() => navigate("/watch-capsules")}>
          &larr; Back
        </button>
      </div>
    </div>
  );
}
