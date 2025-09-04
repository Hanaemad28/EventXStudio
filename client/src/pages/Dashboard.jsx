import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Dashboard() {
  const { user, logout } = useContext(AuthContext);

  return (
    <div>
      <h2>Dashboard</h2>
      {user ? (
        <>
          <p>Welcome {user.email} 🎉</p>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <p>You are not logged in</p>
      )}
    </div>
  );
}

