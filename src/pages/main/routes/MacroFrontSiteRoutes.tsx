import { Routes, Route, Navigate } from 'react-router-dom';
import Auth from 'pages/auth/Auth';
import HomePage from 'pages/home/HomePage';

const MacroFrontSiteRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/auth" element={<Auth />} />
    </Routes>
  );
};

export default MacroFrontSiteRoutes;
