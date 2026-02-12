
import React, { lazy } from 'react';
import { Route } from 'react-router-dom';
import { ProtectedRoute } from '../../components/auth/ProtectedRoute';

const Marketplace = lazy(() => import('../../pages/Marketplace').then(m => ({ default: m.Marketplace })));
const ProductDetails = lazy(() => import('../../pages/ProductDetails').then(m => ({ default: m.ProductDetails })));
const CreateMarketplaceItem = lazy(() => import('../../pages/CreateMarketplaceItem').then(m => ({ default: m.CreateMarketplaceItem })));
const MyStore = lazy(() => import('../../pages/MyStore').then(m => ({ default: m.MyStore })));
const AdPlacementSelector = lazy(() => import('../../pages/AdPlacementSelector').then(m => ({ default: m.AdPlacementSelector })));
const CampaignPerformance = lazy(() => import('../../pages/CampaignPerformance').then(m => ({ default: m.CampaignPerformance })));
const AdCampaignTypeSelector = lazy(() => import('../../pages/AdCampaignTypeSelector').then(m => ({ default: m.AdCampaignTypeSelector })));
const AdContentSelector = lazy(() => import('../../pages/AdContentSelector').then(m => ({ default: m.AdContentSelector })));

const MarketplaceRoutes = () => (
  <>
    <Route path="/marketplace" element={<ProtectedRoute><Marketplace /></ProtectedRoute>} />
    <Route path="/marketplace/product/:id" element={<ProtectedRoute><ProductDetails /></ProtectedRoute>} />
    <Route path="/create-marketplace-item" element={<ProtectedRoute><CreateMarketplaceItem /></ProtectedRoute>} />
    <Route path="/my-store" element={<ProtectedRoute><MyStore /></ProtectedRoute>} />
    <Route path="/ad-placement-selector" element={<ProtectedRoute><AdPlacementSelector /></ProtectedRoute>} />
    <Route path="/campaign-performance/:id" element={<ProtectedRoute><CampaignPerformance /></ProtectedRoute>} />
    <Route path="/ad-type-selector" element={<ProtectedRoute><AdCampaignTypeSelector /></ProtectedRoute>} />
    <Route path="/ad-content-selector" element={<ProtectedRoute><AdContentSelector /></ProtectedRoute>} />
  </>
);

export default MarketplaceRoutes;
