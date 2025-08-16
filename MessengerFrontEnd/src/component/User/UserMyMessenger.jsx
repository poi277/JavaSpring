import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from '../UI/Header';
import { UserPostListApi } from '../api/ApiService';
import FriendSidebar from '../UI/FriendSidebar'; 

export default function UserMyMessenger() {
  const { uuid } = useParams();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (uuid) {
      UserPostListApi(uuid)
        .then(res => setPosts(res.data))
        .catch(err => console.error('게시글 로딩 실패:', err));
    }
  }, [uuid]);

  const handlePostClick = (postId) => {
    navigate(`/messenger/${uuid}/${postId}`);
  };

  return (
  <div>
    <Header />

    {/* flex 컨테이너: 게시글 + 친구사이드바 */}
    <div style={{ display: "flex", gap: "20px", padding: "10px" }}>
      
      {/* 왼쪽: 게시글 리스트 */}
      <div style={{ flex: 1 }}>
        <h2>내 게시글 목록</h2>
        {posts.length === 0 ? (
          <p>게시글이 없습니다.</p>
        ) : (
          posts.map(post => (
            <div
              key={post.id}
              onClick={() => handlePostClick(post.id)}
              style={{
                border: "1px solid #ddd",
                borderRadius: "10px",
                boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                overflow: "hidden",
                cursor: "pointer",
                maxWidth: "400px",
                margin: "20px auto",
                backgroundColor: "#fff",
                display: "flex",
                flexDirection: "column"
              }}
            >
              {/* 사진 영역 */}
              {post.photoUrls && post.photoUrls.length > 0 && (
                <img
                  src={post.photoUrls[0]}
                  alt={post.title}
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover"
                  }}
                />
              )}

              {/* 본문 영역 */}
              <div style={{ padding: "15px", flex: 1, display: "flex", flexDirection: "column" }}>
                <span style={{ fontWeight: "bold", color: "#555" }}>{post.writer}</span>
                <h3 style={{ textAlign: "center", margin: "10px 0", fontSize: "1.2rem", color: "#333" }}>
                  {post.title}
                </h3>
                <p style={{ textAlign: "center", color: "#666", flexGrow: 1 }}>
                  {post.context}
                </p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "10px", fontSize: "0.9rem", color: "#888" }}>
                  <small>{new Date(post.createdDate).toLocaleString()}</small>
                  <small>👍 {post.likeCount}</small>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* 오른쪽: 친구 사이드바 */}
      <div style={{ width: "320px" }}>
        <FriendSidebar />
      </div>

    </div>
  </div>
);
}