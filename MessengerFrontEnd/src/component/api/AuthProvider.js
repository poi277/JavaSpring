import React, { createContext, useContext, useState, useEffect } from "react";
import { LogoutApi, profileApi, LoginApi } from "../api/ApiService";
import { useNavigate } from "react-router-dom";

const UserAuthContext = createContext();
export const useUserAuth  = () => useContext(UserAuthContext);

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLogin, setIsLogin] = useState(false);

  // 로그인
  const login = async (e, id, password) => {
    e.preventDefault();
    try {
      const response = await LoginApi(id, password);
      setIsLogin(true);
      console.log("로그인 성공:", response);
      await fetchProfile();
      navigate("/");
    } catch (error) {
      console.error("로그인 실패:", error);
    }
  };

  // 로그아웃
  const logout = async () => {
    try {
      const res = await LogoutApi();
      console.log("로그아웃 성공", res);
      setUser(null);
      setIsLogin(false);
      navigate("/");
    } catch (error) {
      console.error("로그아웃 실패", error);
    }
  };

  // 프로필 불러오기
  const fetchProfile = async () => {
    try {
      const response = await profileApi();
      setUser(response.data);
      setIsLogin(true);
    } catch (err) {
      setError("비 로그인 상태");
      setIsLogin(false);
    } finally {
      setLoading(false);
    }
  };

  // 페이지 로드 시 자동 로그인 체크
  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <UserAuthContext.Provider value={{ login, user, loading, error, logout, isLogin }}>
      {children}
    </UserAuthContext.Provider>
  );
}

export default AuthProvider;
