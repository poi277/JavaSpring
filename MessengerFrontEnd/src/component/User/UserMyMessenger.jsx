import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from '../UI/Header';
import { UserPostListApi } from '../api/ApiService';

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

  const handleWriteClick = () => {
    navigate(`/messenger/${uuid}/write`);
  };

  const handlePostClick = (postId) => {
    navigate(`/messenger/${uuid}/${postId}`);
  };

  return (
    <div>
      <Header />
      <div style={{ padding: "10px", textAlign: "right" }}>
        <button
          onClick={handleWriteClick}
          style={{ padding: "8px 16px", fontSize: "1rem", cursor: "pointer" }}
        >
          글쓰기
        </button>
      </div>

      <div>
        <h2>내 게시글 목록</h2>
        {posts.length === 0 ? (
          <p>게시글이 없습니다.</p>
        ) : (
          posts.map(post => (
            <div
              key={post.id}
              onClick={() => handlePostClick(post.id)}
              style={{
                border: "1px solid #ccc",
                margin: "10px",
                padding: "10px",
                cursor: "pointer"
              }}
            >
              <h3>{post.title}</h3>
              <p>{post.context}</p>
              <small>작성일: {new Date(post.createdDate).toLocaleString()}</small><br />
              <small>좋아요: {post.likeCount}</small>

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
          ))
        )}
      </div>
    </div>
  );
}
