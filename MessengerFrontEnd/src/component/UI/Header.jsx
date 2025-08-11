import React, { useState, useEffect, useRef } from "react";
import { useUserAuth } from "../api/AuthProvider";
import { useNavigate,useLocation } from "react-router-dom";

export default function Header() {
  const { user, loading, logout } = useUserAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const location = useLocation();

  const handleLoginClick = () => {
    navigate("/login");
  };

  const isMyPageOrMessenger = () => {
    // 내 정보 페이지: /[uuid] 또는 /profile/[uuid]
    // 내 메신저 페이지: /messenger/[uuid] 또는 /messages/[uuid]
    const myInfoPattern = new RegExp(`^/(profile/)?${user?.uuid}$`);
    const myMessengerPattern = new RegExp(`^/(messenger|messages)/${user?.uuid}$`);
    return myInfoPattern.test(location.pathname) || myMessengerPattern.test(location.pathname);
  };
  const handleLogout = async (e) => {
    e.preventDefault();
    await logout();

    if (isMyPageOrMessenger()) {
      navigate("/"); // 홈으로
    }

    setIsMenuOpen(false);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log("검색어:", searchTerm);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (loading) {
    return <header>로딩 중...</header>;
  }

  return (
    <header
      style={{
        padding: "10px",
        borderBottom: "1px solid #ccc",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {/* 왼쪽 로고/메신저 */}
      <div
        style={{
          flex: 1,
          fontWeight: "bold",
          fontSize: "1.2rem",
          cursor: "pointer",
        }}
        onClick={() => navigate("/")}
      >
        메신저
      </div>

      {/* 가운데 검색창 */}
      <form
        onSubmit={handleSearchSubmit}
        style={{
          flex: 2,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <input
          type="text"
          placeholder="유저 입력"
          value={searchTerm}
          onChange={handleSearchChange}
          style={{ padding: "5px", fontSize: "1rem", width: "60%" }}
        />
        <button type="submit" style={{ marginLeft: "5px", padding: "5px 10px" }}>
          검색
        </button>
      </form>

      {/* 오른쪽 유저 메뉴 */}
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          position: "relative",
        }}
        ref={menuRef}
      >
        {user ? (
          <>
            <img
              src={user.photoURL || "/default-profile.png"}
              alt="프로필"
              onClick={() => setIsMenuOpen((prev) => !prev)}
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                cursor: "pointer",
              }}
            />
            {isMenuOpen && (
              <div
                style={{
                  position: "absolute",
                  top: "calc(100% + 5px)",
                  right: 0,
                  backgroundColor: "white",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                  borderRadius: "4px",
                  padding: "5px 0",
                  width: 140,
                  zIndex: 1000,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <button
                  onClick={() => {
                    navigate(`/${user.uuid}`);
                    setIsMenuOpen(false);
                  }}
                  style={menuButtonStyle}
                >
                  내 정보
                </button>
                <button
                  onClick={() => {
                    navigate(`/messenger/${user.uuid}`);
                    setIsMenuOpen(false);
                  }}
                  style={menuButtonStyle}
                >
                  내 메신저
                </button>
                <hr style={{ margin: "5px 0", borderColor: "#eee" }} />
                <button onClick={handleLogout} style={menuButtonStyle}>
                    로그아웃
                  </button>
              </div>
            )}
          </>
        ) : (
          <button onClick={handleLoginClick}>로그인</button>
        )}
      </div>
    </header>
  );
}

const menuButtonStyle = {
  background: "none",
  border: "none",
  padding: "10px 15px",
  textAlign: "left",
  cursor: "pointer",
  fontSize: "1rem",
  width: "100%",
  outline: "none",
};
