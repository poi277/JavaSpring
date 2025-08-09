import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from '../Guest/LoginPage';
import UserHomePage from '../User/UserHomePage';

function Navigate() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/homePage" element={<UserHomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Navigate;
