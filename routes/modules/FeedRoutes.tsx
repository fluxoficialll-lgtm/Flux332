
import React, { lazy } from 'react';
import { Route } from 'react-router-dom';
import { ProtectedRoute } from '../../components/auth/ProtectedRoute';

const Feed = lazy(() => import('../../pages/Feed').then(m => ({ default: m.Feed })));
const PostDetails = lazy(() => import('../../pages/PostDetails').then(m => ({ default: m.PostDetails })));
const CreatePost = lazy(() => import('../../pages/CreatePost').then(m => ({ default: m.CreatePost })));
const CreatePoll = lazy(() => import('../../pages/CreatePoll').then(m => ({ default: m.CreatePoll })));
const Reels = lazy(() => import('../../pages/Reels').then(m => ({ default: m.Reels })));
const CreateReel = lazy(() => import('../../pages/CreateReel').then(m => ({ default: m.CreateReel })));
const ReelsSearch = lazy(() => import('../../pages/ReelsSearch').then(m => ({ default: m.ReelsSearch })));
const FeedSearch = lazy(() => import('../../pages/FeedSearch').then(m => ({ default: m.FeedSearch })));

const FeedRoutes = () => (
  <>
    <Route path="/feed" element={<ProtectedRoute><Feed /></ProtectedRoute>} />
    <Route path="/post/:id" element={<ProtectedRoute><PostDetails /></ProtectedRoute>} />
    <Route path="/create-post" element={<ProtectedRoute><CreatePost /></ProtectedRoute>} />
    <Route path="/create-poll" element={<ProtectedRoute><CreatePoll /></ProtectedRoute>} />
    <Route path="/reels" element={<ProtectedRoute><Reels /></ProtectedRoute>} />
    <Route path="/reels/:id" element={<ProtectedRoute><Reels /></ProtectedRoute>} />
    <Route path="/reels-search" element={<ProtectedRoute><ReelsSearch /></ProtectedRoute>} />
    <Route path="/feed-search" element={<ProtectedRoute><FeedSearch /></ProtectedRoute>} />
    <Route path="/create-reel" element={<ProtectedRoute><CreateReel /></ProtectedRoute>} />
  </>
);

export default FeedRoutes;
