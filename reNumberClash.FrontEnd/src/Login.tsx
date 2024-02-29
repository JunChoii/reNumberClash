// Login.js
import React, { useState } from "react";

function Login({ onLogin }: any) {
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const username = e.target.username.value;

    const response = await fetch("/api/user/login", {
      method: "POST",
      body: JSON.stringify({ username }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      // Call the onLogin function passed from the parent component
      onLogin();
    } else if (response.status === 400) {
      alert("Invalid Username.");
    } else {
      alert(`Unexpected status code: ${response.status}`);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" name="username" />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
