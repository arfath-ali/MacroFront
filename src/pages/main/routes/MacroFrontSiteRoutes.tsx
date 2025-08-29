import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from 'pages/home/HomePage';
import Auth from 'pages/auth/Auth';
import ForgotPassword from 'pages/auth/ForgotPassword';
import ResetLinkSent from '@/pages/auth/ResetLinkSent';
import ResetPassword from 'pages/auth/ResetPassword';
import PasswordResetSuccess from 'pages/auth/PasswordResetSuccess';

const MacroFrontSiteRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/auth/forgot-password" element={<ForgotPassword />} />
      <Route path="/auth/forgot-password/sent" element={<ResetLinkSent />} />
      <Route path="/auth/reset-password" element={<ResetPassword />} />
      <Route
        path="/auth/password-reset-success"
        element={<PasswordResetSuccess />}
      />
    </Routes>
  );
};

export default MacroFrontSiteRoutes;
