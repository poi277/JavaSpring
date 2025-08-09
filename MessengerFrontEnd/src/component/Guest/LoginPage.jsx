import { useState } from "react";
import { LoginApi } from "../api/ApiService";
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate('');

  const handleSubmit = (e) => {
    e.preventDefault();
    LoginApi(id, password)
      .then((response) => {
        console.log("로그인 성공:", response);
        navigate('/homePage');  // 경로 맞춰서
      })
      .catch((error) => {
        console.error("로그인 실패:", error);
      });
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
