import axios from 'axios';
import { GuestApiClient,UserApiClient} from './ApiClient'
const BASE_URL = process.env.REACT_APP_BASE_URL;
// REACT_APP_BASE_URL=http://localhost:5000

// 로그인 요청
export const LoginApi = async (id, password) => {
  const response = await GuestApiClient.post('/login', { id, password });
  return response.data;
};
// 로그인 사용자 정보 요청
export const profileApi = () => {
  return UserApiClient.get('/profile');
};

// 로그아웃 요청
export const LogoutApi = async () => {
  const response = await UserApiClient.post('/userlogout');
  return response.data;
};

export const writePostApi = async ({ title, context, userUuid }) => {
  const response = await UserApiClient.post('/write', { title, context, userUuid }, {
    headers: { "Content-Type": "application/json" }
  });
  return response.data;
};
export const PhotoPostApi = async (formData) => {
  const response = await UserApiClient.post('/uploadphoto', formData, {
    headers: { "Content-Type": "multipart/form-data" }
  });

  return response.data; // 업로드된 사진 URL
};

export const AllPostListApi = () => {
  return GuestApiClient.get('/allpostlist');
};
export const UserPostListApi = (uuid) => {
  return GuestApiClient.get(`/userpostlist/${uuid}`);
};
export const UserPosttApi = (postid) => {
  return GuestApiClient.get(`/post/${postid}`);
};
