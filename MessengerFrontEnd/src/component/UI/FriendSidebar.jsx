import { useState, useEffect } from "react";
import {
  friendListApi,
  friendrequestListApi,
  sendFriendRequestApi,
  acceptFriendRequestApi,
  rejectFriendRequestApi,
  deleteFriendApi
} from '../api/ApiService';

export default function FriendSidebar() {
  const [mode, setMode] = useState("friends"); // friends | pending | add
  const [friends, setFriends] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [newFriendId, setNewFriendId] = useState("");
  const [openDropdownId, setOpenDropdownId] = useState(null); // 현재 드롭다운 열린 친구 id

  useEffect(() => {
    if (mode === "friends") {
      friendListApi()
        .then(res => {setFriends(res.data)
          console.log(res)})
        .catch(err => console.error("친구 목록 불러오기 실패", err));
      setOpenDropdownId(null); // 친구 목록 바뀌면 드롭다운 닫기
    }
  }, [mode]);

  useEffect(() => {
    if (mode === "pending") {
      friendrequestListApi()
        .then(res => setPendingRequests(res.data))
        .catch(err => console.error("친구 대기 목록 불러오기 실패", err));
    }
  }, [mode]);

  const handleAccept = (requestId) => {
    acceptFriendRequestApi(requestId)
      .then(() => {
        alert("친구 요청을 수락했습니다.");
        setPendingRequests(prev => prev.filter(r => r.id !== requestId));
      })
      .catch(err => {
        console.error("수락 실패", err);
        alert("친구 요청 수락에 실패했습니다.");
      });
  };

  const handleReject = (requestId) => {
    rejectFriendRequestApi(requestId)
      .then(() => {
        alert("친구 요청을 거절했습니다.");
        setPendingRequests(prev => prev.filter(r => r.id !== requestId));
      })
      .catch(err => {
        console.error("거절 실패", err);
        alert("친구 요청 거절에 실패했습니다.");
      });
  };

  const handleSendFriendRequest = () => {
    if (!newFriendId.trim()) {
      alert("친구 ID를 입력해주세요.");
      return;
    }
    sendFriendRequestApi(newFriendId)
      .then(() => {
        alert(`친구 요청을 보냈습니다.`);
        setNewFriendId("");
        setMode("friends"); // 요청 후 목록 화면으로 전환
      })
      .catch(err => {
        console.error("친구 요청 실패", err);
        alert("친구 요청에 실패했습니다.");
      });
  };

  // 삭제 버튼 토글 함수
  const toggleDropdown = (friendId) => {
    setOpenDropdownId(openDropdownId === friendId ? null : friendId);
  };

  // 친구 삭제 함수
  const handleDeleteFriend = (friendUuid) => {
    if (!window.confirm("정말 이 친구를 삭제하시겠습니까?")) return;

    deleteFriendApi(friendUuid)
      .then(() => {
        console.log(friendUuid)
        alert("친구를 삭제했습니다.");
        setFriends(prev => prev.filter(f => f.uuid !== friendUuid));
        setOpenDropdownId(null); // 삭제 후 드롭다운 닫기
      })
      .catch(err => {
        console.error("친구 삭제 실패", err);
        alert("친구 삭제에 실패했습니다.");
      });
  };

  return (
    <div style={{
      width: "300px",
      border: "1px solid #ddd",
      padding: "10px",
      display: "flex",
      flexDirection: "column",
      height: "500px",
    }}>
      {/* 상단 메뉴 */}
      <div style={{ display: "flex", gap: "5px", marginBottom: "10px" }}>
        <button
          style={{
            flex: 1,
            padding: "10px",
            backgroundColor: mode === "friends" ? "#4caf50" : "#ccc",
            color: mode === "friends" ? "white" : "black",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
          onClick={() => setMode("friends")}
        >
          친구 목록
        </button>
        <button
          style={{
            flex: 1,
            padding: "10px",
            backgroundColor: mode === "pending" ? "#4caf50" : "#ccc",
            color: mode === "pending" ? "white" : "black",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
          onClick={() => setMode("pending")}
        >
          친구 대기
        </button>
        <button
          style={{
            flex: 1,
            padding: "10px",
            backgroundColor: mode === "add" ? "#4caf50  " : "#ccc",
            color: mode === "add" ? "white" : "black",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
          onClick={() => setMode("add")}
        >
          친구 추가
        </button>
      </div>

      {/* 메인 내용 */}
      <div style={{
        flex: 1,
        overflowY: "auto",
        borderTop: "1px solid #eee",
        borderBottom: "1px solid #eee",
        padding: "10px"
      }}>
      {mode === "friends" && (
          friends.length === 0 ? (
            <p>친구가 없습니다.</p>
          ) : (
            
    friends.map(friend => (
      <div 
        key={friend.id} 
        style={{ 
          padding: "8px", 
          borderBottom: "1px solid #eee", 
          position: "relative",
          cursor: "pointer",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}
        onClick={() => toggleDropdown(friend.id)}
      >
        {/* 친구 이름과 온라인 상태 아이콘 */}
        <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          {friend.friendname}
          {friend.online && (
            <span style={{
              display: "inline-block",
              width: "10px",
              height: "10px",
              backgroundColor: "green",
              borderRadius: "50%",
            }}></span>
          )}
        </span>

        {/* 드롭다운 메뉴 */}
        {openDropdownId === friend.id && (
          <div style={{
            position: "absolute",
            top: "100%",
            right: 0,
            backgroundColor: "white",
            border: "1px solid #ccc",
            borderRadius: "4px",
            boxShadow: "0 2px 5px rgba(0,0,0,0.15)",
            padding: "5px",
            zIndex: 10,
            minWidth: "120px"
          }}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                window.location.href = `/messenger/${friend.uuid}`;
              }}
              style={{
                backgroundColor: "#2196f3",
                color: "white",
                border: "none",
                borderRadius: "4px",
                padding: "5px 10px",
                cursor: "pointer",
                width: "100%",
                marginBottom: "5px"
              }}
            >
              친구페이지로
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteFriend(friend.uuid);
              }}
              style={{
                backgroundColor: "#f44336",
                color: "white",
                border: "none",
                borderRadius: "4px",
                padding: "5px 10px",
                cursor: "pointer",
                width: "100%"
              }}
            >
              친구 삭제
            </button>
          </div>
        )}
      </div>
    ))
  )
)}

        {mode === "pending" && (
          pendingRequests.length === 0 ? <p>대기 중인 친구 요청이 없습니다.</p> : (
            pendingRequests.map(req => (
              <div 
                key={req.id} 
                style={{ 
                  display: "flex", 
                  justifyContent: "space-between", 
                  alignItems: "center", 
                  padding: "8px", 
                  borderBottom: "1px solid #eee" 
                }}
              >
                <span>{req.senderName} 님이 친구 요청을 보냈습니다.</span>
                <div style={{ display: "flex", gap: "5px" }}>
                  <button
                    onClick={() => handleAccept(req.id)}
                    style={{
                      padding: "5px 10px",
                      backgroundColor: "#4caf50",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",  
                      cursor: "pointer",
                    }}
                  >
                    수락
                  </button>
                  <button
                    onClick={() => handleReject(req.id)}
                    style={{
                      padding: "5px 10px",
                      backgroundColor: "#f44336",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    거절
                  </button>
                </div>
              </div>
            ))
          )
        )}

        {mode === "add" && (
          <div style={{ display: "flex", gap: "10px" }}>
            <input
              type="text"
              placeholder="친구 ID 입력"
              value={newFriendId}
              onChange={(e) => setNewFriendId(e.target.value)}
              style={{
                flex: 1,
                padding: "8px",
                borderRadius: "4px",
                border: "1px solid #ccc",
                fontSize: "1rem",
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSendFriendRequest();
              }}
            />
            <button
              onClick={handleSendFriendRequest}
              style={{
                padding: "8px 15px",
                backgroundColor: "#4caf50",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "1rem",
              }}
            >
              요청
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
