import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from '../UI/Header';
import { UserPosttApi } from '../api/ApiService';  // 단일 게시글 API 임포트

export default function UserMyMessengerDetail() {
  const { uuid, postid } = useParams();  // postid 파라미터 이름 확인 (라우터에 맞춰서)
  const navigate = useNavigate();
  const [post, setPost] = useState(null);

  useEffect(() => {
    if (postid) {
      UserPosttApi(postid)
        .then(res => setPost(res.data))
        .catch(err => {
          console.error('게시글 불러오기 실패:', err);
          setPost(null);
        });
    }
  }, [postid]);

  const handleWriteClick = () => {
    navigate(`/messenger/${uuid}/write`);
  };

  if (!post) {
    return (
      <div>
        <Header />
        <p>게시글이 없습니다.</p>
      </div>
    );
  }

  return (
    <div>
      <Header />

      <div style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
        <h2>{post.title}</h2>
        <p>{post.context}</p>
        <small>작성일: {new Date(post.createdDate).toLocaleString()}</small><br />
        <small>좋아요: {post.likeCount}</small><br />
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
    </div>
  );
}
