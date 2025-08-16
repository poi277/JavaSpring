import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from '../Guest/LoginPage';
import AuthProvider from '../api/AuthProvider';
import UserHomePage from "../User/UserHomePage"
import UserMyMessenger from "../User/UserMyMessenger"
import UserMyInfomation from "../User/UserMyInfomation"
import UserMessageWrite from "../User/UserMessageWrite"
import UserMyMessengerDetail from "../User/UserMyMessengerDetail"
function Navigate() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<UserHomePage />} />
          <Route path="/messenger/:uuid/info" element={<UserMyInfomation />} />
          <Route path="/messenger/:uuid" element={<UserMyMessenger />} />
          <Route path="/messenger/:uuid/write" element={<UserMessageWrite />} />
          <Route path="/messenger/:uuid/:postid" element={<UserMyMessengerDetail />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/login/register" element={<LoginPage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}


export default Navigate;
