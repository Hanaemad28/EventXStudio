import { useEffect, useState } from "react";
import axios from "axios";

function EventList() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/api/events")
      .then(res => setEvents(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Events</h1>
      <ul>
        {events.map(event => (
          <li key={event._id} className="border p-3 mb-2 rounded">
            <h2 className="text-xl">{event.title}</h2>
            <p>{event.description}</p>
            <p><b>Date:</b> {new Date(event.date).toLocaleDateString()}</p>
            <p><b>Location:</b> {event.location}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EventList;

