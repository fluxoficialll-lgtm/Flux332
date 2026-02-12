
import React, { lazy } from 'react';
import { Route } from 'react-router-dom';
import { ProtectedRoute } from '../../components/auth/ProtectedRoute';

const Profile = lazy(() => import('../../pages/Profile').then(m => ({ default: m.Profile })));
const UserProfile = lazy(() => import('../../pages/UserProfile').then(m => ({ default: m.UserProfile })));
const CompleteProfile = lazy(() => import('../../pages/CompleteProfile').then(m => ({ default: m.CompleteProfile })));
const EditProfile = lazy(() => import('../../pages/EditProfile').then(m => ({ default: m.EditProfile })));
const GlobalSearch = lazy(() => import('../../pages/GlobalSearch').then(m => ({ default: m.GlobalSearch })));
const Leaderboard = lazy(() => import('../../pages/Leaderboard').then(m => ({ default: m.Leaderboard })));
const TopGroups = lazy(() => import('../../pages/TopGroups').then(m => ({ default: m.TopGroups })));

const ProfileRoutes = () => (
  <>
    <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
    <Route path="/user/:username" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
    <Route path="/complete-profile" element={<ProtectedRoute><CompleteProfile /></ProtectedRoute>} />
    <Route path="/edit-profile" element={<ProtectedRoute><EditProfile /></ProtectedRoute>} />
    <Route path="/global-search" element={<ProtectedRoute><GlobalSearch /></ProtectedRoute>} />
    <Route path="/rank" element={<ProtectedRoute><Leaderboard /></ProtectedRoute>} />
    <Route path="/top-groups" element={<ProtectedRoute><TopGroups /></ProtectedRoute>} />
    <Route path="/top-groups/:category" element={<ProtectedRoute><TopGroups /></ProtectedRoute>} />
  </>
);

export default ProfileRoutes;
