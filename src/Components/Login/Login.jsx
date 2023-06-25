import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  async function handleLogin() {
    if (email && password) {
      try {
        const response = await fetch("https://localhost:44367/api/Auth/login", {
          method: "POST",
          headers: {
            headers: {'Content-Type': 'application/json'}
        },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
          credentials: "include",
        });

        if (response.ok) {
          setStatus("Login successful. Redirecting...");
          navigate("/");
        } else if (response.status === 404) {
          setStatus("Wrong credentials");
        } else {
          setStatus("Error occurred during login");
        }
      } catch (error) {
        setStatus("Error occurred during login");
        console.error(error);
      }
    }
  }

  return (
    <>
      <span onClick={() => navigate("/")} className="gotohome">
        Informations
      </span>
      <div className="register_container">
        <div className="field">
          <label htmlFor="email">Email:</label>
          <input type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="field">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <span>{status}</span>
        <button onClick={handleLogin}>Login</button>
      </div>
    </>
  );
}

export default Login;
