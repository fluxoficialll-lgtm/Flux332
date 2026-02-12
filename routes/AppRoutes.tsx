
import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Módulos de Rotas
import AuthRoutes from './modules/AuthRoutes';
import FeedRoutes from './modules/FeedRoutes';
import GroupRoutes from './modules/GroupRoutes';
import MarketplaceRoutes from './modules/MarketplaceRoutes';
import ProfileRoutes from './modules/ProfileRoutes';
import SettingsRoutes from './modules/SettingsRoutes';
import FinancialRoutes from './modules/FinancialRoutes';
import NotificationRoutes from './modules/NotificationRoutes';

// Componente de Loading
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-[#0c0f14] text-white">
    <i className="fa-solid fa-circle-notch fa-spin text-3xl text-[#00c2ff]"></i>
  </div>
);

const AppRoutes = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        {/* Renderiza os módulos de rotas como componentes */}
        <AuthRoutes />
        <FeedRoutes />
        <GroupRoutes />
        <MarketplaceRoutes />
        <ProfileRoutes />
        <SettingsRoutes />
        <FinancialRoutes />
        <NotificationRoutes />
        
        {/* Rota Fallback: Redireciona para o feed se nenhuma outra rota corresponder */}
        <Route path="*" element={<Navigate to="/feed" replace />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
