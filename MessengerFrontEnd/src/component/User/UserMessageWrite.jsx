import React, { useState } from "react";
import Header from '../UI/Header';
import { useNavigate, useParams } from "react-router-dom";
import { writePostApi, PhotoPostApi } from '../api/ApiService';

export default function UserMessageWrite() {
  const { uuid } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [context, setContext] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);  // 사진 파일 배열
  const [photoUrls, setPhotoUrls] = useState([]);  // 업로드된 사진 URL 배열 (선택적)
  const [uploading, setUploading] = useState(false);

  // 사진 선택 시 파일 배열에 추가 (멀티파일도 가능하게)
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(prev => [...prev, ...files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (uploading) return;
    setUploading(true);

    try {
      // 1) 글 작성 API 호출 (uuid 리턴)
      const postUuid = await writePostApi({
        userUuid: uuid,
        title,
        context
      });

      // 2) 사진 업로드 (파일별로 uuid 전송)
      const uploadedUrls = [];
      for (const file of selectedFiles) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("uuid", postUuid);

        const uploadedUrl = await PhotoPostApi(formData);
        uploadedUrls.push(uploadedUrl);
      }

      setPhotoUrls(uploadedUrls);

      alert("글과 사진이 성공적으로 등록되었습니다!");
      navigate(`/messenger/${uuid}`);

    } catch (error) {
      console.error(error);
      alert("등록 중 오류가 발생했습니다.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <Header />
      <div style={{ maxWidth: 600, margin: "20px auto", padding: 20, border: "1px solid #ccc", borderRadius: 8 }}>
        <h2>글쓰기</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 12 }}>
            <label htmlFor="title" style={{ display: "block", marginBottom: 4 }}>제목</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              style={{ width: "100%", padding: 8, fontSize: "1rem" }}
              placeholder="제목을 입력하세요"
            />
          </div>
          <div style={{ marginBottom: 12 }}>
            <label htmlFor="context" style={{ display: "block", marginBottom: 4 }}>내용</label>
            <textarea
              id="context"
              value={context}
              onChange={(e) => setContext(e.target.value)}
              required
              rows={8}
              style={{ width: "100%", padding: 8, fontSize: "1rem" }}
              placeholder="내용을 입력하세요"
            />
          </div>
          <div style={{ marginBottom: 12 }}>
            <label htmlFor="photo" style={{ display: "block", marginBottom: 4 }}>사진 업로드</label>
            <input
              id="photo"
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              disabled={uploading}
            />
            {selectedFiles.length > 0 && (
              <div style={{ marginTop: 8 }}>
                <strong>선택한 사진:</strong>
                <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
                  {selectedFiles.map((file, idx) => (
                    <img
                      key={idx}
                      src={URL.createObjectURL(file)}
                      alt={`preview-${idx}`}
                      style={{ width: 100, height: 'auto', borderRadius: 4 }}
                    />
                  ))}
                </div>
              </div>
            )}
            {uploading && <p>등록 중...</p>}
          </div>
          <button
            type="submit"
            style={{ padding: "10px 20px", fontSize: "1rem", cursor: "pointer" }}
            disabled={uploading}
          >
            등록
          </button>
        </form>
      </div>
    </div>
  );
}
