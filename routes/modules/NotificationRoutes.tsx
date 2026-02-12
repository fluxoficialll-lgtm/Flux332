
import React, { lazy } from 'react';
import { Route } from 'react-router-dom';
import { ProtectedRoute } from '../../components/auth/ProtectedRoute';

const Notifications = lazy(() => import('../../pages/Notifications').then(m => ({ default: m.Notifications })));
const Messages = lazy(() => import('../../pages/Messages').then(m => ({ default: m.Messages })));

const NotificationRoutes = () => (
  <>
    <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
    <Route path="/messages" element={<ProtectedRoute><Messages /></ProtectedRoute>} />
  </>
);

export default NotificationRoutes;
