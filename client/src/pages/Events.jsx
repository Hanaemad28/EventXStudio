import { useEffect, useState } from "react";
import api from "../lib/api";
import { Link } from "react-router-dom";

export default function Events() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    api.get("/api/events").then(res => setEvents(res.data)).catch(() => setEvents([]));
  }, []);

  return (
    <div style={{ maxWidth: 800, margin: "40px auto", fontFamily: "system-ui" }}>
      <h1>Events</h1>
      {events.length === 0 && <p>No events yet.</p>}
      <ul style={{ display: "grid", gap: 8, paddingLeft: 18 }}>
        {events.map(ev => (
          <li key={ev._id}>
            <strong>{ev.title}</strong> — {new Date(ev.date).toLocaleDateString()} — {ev.location}
          </li>
        ))}
      </ul>
      <p style={{ marginTop: 16 }}>
        <Link to="/login">Login</Link> · <Link to="/register">Register</Link> · <Link to="/dashboard">Dashboard</Link>
      </p>
    </div>
  );
}

