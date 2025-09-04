import React, { useEffect, useState } from "react";

const API = "http://localhost:8080";

function MyTickets() {
  const [tickets, setTickets] = useState([]);

  const fetchTickets = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setTickets([]);
      return;
    }
    try {
      const res = await fetch(`${API}/api/tickets/mine`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setTickets(data);
    } catch (e) {
      console.error(e);
      alert("Failed to fetch tickets");
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  return (
    <div>
      <h2>My Tickets</h2>
      {tickets.length === 0 ? (
        <p>No tickets yet</p>
      ) : (
        <ul>
          {tickets.map(t => (
            <li key={t._id}>
              <div><strong>{t.event?.title || "Event"}</strong></div>
              <div>Ticket: {t.qr}</div>
              <div>Booked at: {new Date(t.createdAt).toLocaleString()}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MyTickets;

