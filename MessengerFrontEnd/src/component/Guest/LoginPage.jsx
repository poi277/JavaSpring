import React, { useState } from "react";
import { useUserAuth } from "../api/AuthProvider";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useUserAuth();

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    login(e, id, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          ID: 
          <input
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Password: 
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
      </div>
      <button type="submit">Login</button>
    </form>
  );
}
