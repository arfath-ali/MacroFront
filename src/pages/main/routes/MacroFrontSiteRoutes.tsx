import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from 'pages/home/HomePage';

const MacroFrontSiteRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="/home" element={<HomePage />} />
    </Routes>
  );
};

export default MacroFrontSiteRoutes;
