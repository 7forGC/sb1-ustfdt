import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthPage } from './pages/AuthPage';
import { RegisterPage } from './pages/RegisterPage';
import { HomePage } from './pages/HomePage';
import { useAuth } from './hooks/useAuth';
import { LoadingScreen } from './components/LoadingScreen';

export default function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Routes>
      <Route 
        path="/register" 
        element={user ? <Navigate to="/" /> : <RegisterPage />} 
      />
      <Route 
        path="/auth" 
        element={user ? <Navigate to="/" /> : <AuthPage />} 
      />
      <Route 
        path="/*" 
        element={user ? <HomePage /> : <Navigate to="/auth" />} 
      />
    </Routes>
  );
}