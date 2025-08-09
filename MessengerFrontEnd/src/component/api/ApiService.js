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
export const meApi = () => {
  return UserApiClient.get('/me');
};

// 로그아웃 요청
export const LogoutApi = async () => {
  const response = await UserApiClient.post('/userlogout');
  return response.data;
};
