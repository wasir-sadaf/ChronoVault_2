import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateCapsule.css";

export default function CreateCapsule() {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [unlockDate, setUnlockDate] = useState("");
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.userId;

  useEffect(() => {
    if (!userId) {
      navigate("/login");
    }
  }, [userId, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/capsules/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId, title, message, unlock_date: unlockDate }),
      });

      const data = await res.json();
      if (res.ok) {
        alert(data.message || "Capsule created successfully");
        navigate("/watch-capsules");
      } else {
        alert(data.message || "Error creating capsule");
      }
    } catch (err) {
      console.error(err);
      alert("Server error while creating capsule");
    }
  };

  return (
    <div className="create-capsule">
      <div className="create-card">
        <h2>Create New Capsule</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Capsule Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="Capsule Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          ></textarea>
          <input
            type="date"
            value={unlockDate}
            onChange={(e) => setUnlockDate(e.target.value)}
            required
          />
          <button type="submit">Create Capsule</button>
        </form>
        <button className="back-btn" onClick={() => navigate("/dashboard")}>
          &larr; Back to Dashboard
        </button>
      </div>
    </div>
  );
}
