import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import Login from "./Login.tsx";
import "./index.css";

function Main() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  const handleLogin = async (username: any) => {
    setUsername(username);
    setIsLoggedIn(true);
  };
  console.log("this is username from main: ");
  console.log( username);

  return (
    <React.StrictMode>
      {isLoggedIn ? <App username={username} /> : <Login onLogin={handleLogin} />}
    </React.StrictMode>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(<Main />);
