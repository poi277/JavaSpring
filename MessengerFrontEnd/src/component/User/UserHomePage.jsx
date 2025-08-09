import React, { useEffect, useState } from 'react';
import { meApi } from '../api/ApiService'; // 경로 맞게 수정하세요
import { useNavigate } from 'react-router-dom';
import { LogoutApi } from "../api/ApiService";

export default function UserHomePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate('');


  const Logout = async (e) => {
    e.preventDefault();
    try {
      const res = await LogoutApi();
      console.log("로그아웃 성공", res);
      navigate("/"); // 로그아웃 후 이동할 경로
    } catch (error) {
      console.error("로그아웃 실패", error);
    }
  };

  useEffect(() => {
    meApi()
      .then(response => {
        setUser(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError('로그인 필요 또는 에러 발생');
        setLoading(false);
      });
  }, []);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>안녕하세요, {user.id}님!</h1>
      {/* user 객체에 맞게 다른 정보도 보여줄 수 있음 */}
      <button onClick={Logout}>Logout</button>

    </div>
  );
}
