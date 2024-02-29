// Main.tsx
import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import Login from "./Login";
import "./index.css";

function Main() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  const handleLogin = async (username: string) => {
    setUsername(username);
    setIsLoggedIn(true);
  };

  return (
    <React.StrictMode>
      {isLoggedIn ? <App username={username} /> : <Login onLogin={handleLogin} />}
    </React.StrictMode>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(<Main />);
