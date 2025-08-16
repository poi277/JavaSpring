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
    const handleGoogleLogin = () => {
      // 브라우저 전체 이동 → Spring Security OAuth2 시작
      window.location.href = "http://localhost:5000/oauth2/authorization/google";
    };

    const handleNaverLogin = () => {
      // Spring Security OAuth2 로그인 시작
      window.location.href = "http://localhost:5000/oauth2/authorization/naver";
    };

    const handleKakaoLogin = () => {
      // Spring Security OAuth2 카카오 로그인 시작
      window.location.href = "http://localhost:5000/oauth2/authorization/kakao";
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
      <button type="submit">로그인</button>
      <button type="button" onClick={handleGoogleLogin}>구글로 로그인</button>
       <button type="button" onClick={handleNaverLogin}>네이버로 로그인</button>
         <button type="button" onClick={handleKakaoLogin}>카카오로 로그인</button>
    </form>

  );
}
