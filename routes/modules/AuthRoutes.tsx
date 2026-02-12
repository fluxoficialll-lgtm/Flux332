
import React, { lazy } from 'react';
import { Route } from 'react-router-dom';

const Login = lazy(() => import('../../pages/Login').then(m => ({ default: m.Login })));
const Register = lazy(() => import('../../pages/Register').then(m => ({ default: m.Register })));
const VerifyEmail = lazy(() => import('../../pages/VerifyEmail').then(m => ({ default: m.VerifyEmail })));
const ForgotPassword = lazy(() => import('../../pages/ForgotPassword').then(m => ({ default: m.ForgotPassword })));
const ResetPassword = lazy(() => import('../../pages/ResetPassword').then(m => ({ default: m.ResetPassword })));
const Banned = lazy(() => import('../../pages/Banned').then(m => ({ default: m.Banned })));

const AuthRoutes = () => (
  <>
    <Route path="/" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/verify-email" element={<VerifyEmail />} />
    <Route path="/forgot-password" element={<ForgotPassword />} />
    <Route path="/reset-password" element={<ResetPassword />} />
    <Route path="/banned" element={<Banned />} />
  </>
);

export default AuthRoutes;
