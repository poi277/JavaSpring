import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../UI/Header";
import { AllPostListApi } from "../api/ApiService";

export default function UserHomePage() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    AllPostListApi()
      .then((res) => {
        setPosts(res.data); // 백엔드에서 온 DTO 리스트 저장
      })
      .catch((err) => {
        console.error("게시글 목록 불러오기 실패:", err);
      });
  }, []);

  const handlePostClick = (userUuid, postId) => {
    navigate(`/messenger/${userUuid}/${postId}`);
  };

  return (
    <div>
      <Header />
      <div>
        <h2>전체 게시글</h2>
        {posts.map((post) => (
          <div
            key={post.id}
            onClick={() => handlePostClick(post.userUuid, post.id)}
            style={{
              border: "1px solid #ccc",
              margin: "10px",
              padding: "10px",
              cursor: "pointer"
            }}
          >
            <h3>{post.title}</h3>
            <p>{post.context}</p>
            <small>
              작성일: {new Date(post.createdDate).toLocaleString()} | 좋아요: {post.likeCount}
            </small>
            <br />
            <small>작성자: {post.name}</small>

            {/* 사진 표시 부분 */}
            {post.photoUrls && post.photoUrls.length > 0 && (
              <div style={{ marginTop: "10px" }}>
                {post.photoUrls.map((url, index) => (
                  <img
                    key={index}
                    src={url}
                    alt={`post-${post.id}-photo-${index}`}
                    style={{
                      width: "150px",
                      height: "150px",
                      objectFit: "cover",
                      borderRadius: "8px",
                      marginRight: "8px"
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
