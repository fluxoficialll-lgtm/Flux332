
import React, { lazy } from 'react';
import { Route } from 'react-router-dom';
import { ProtectedRoute } from '../../components/auth/ProtectedRoute';

const FinancialPanel = lazy(() => import('../../pages/FinancialPanel').then(m => ({ default: m.FinancialPanel })));
const ProviderConfig = lazy(() => import('../../pages/ProviderConfig').then(m => ({ default: m.ProviderConfig })));
const TransactionHistoryPage = lazy(() => import('../../pages/TransactionHistoryPage').then(m => ({ default: m.TransactionHistoryPage })));

const FinancialRoutes = () => (
  <>
    <Route path="/financial" element={<ProtectedRoute><FinancialPanel /></ProtectedRoute>} />
    <Route path="/financial/providers" element={<ProtectedRoute><ProviderConfig /></ProtectedRoute>} />
    <Route path="/financial/transactions" element={<ProtectedRoute><TransactionHistoryPage /></ProtectedRoute>} />
  </>
);

export default FinancialRoutes;
