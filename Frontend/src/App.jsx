// import { useState } from 'react';
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import "./App.css";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import ChatPage from "./pages/ChatPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import PageLoader from "./components/PageLoader";


function App() {
  const {checkAuth, isCheckingAuth, authUser} = useAuthStore();
  const location = useLocation();
  const routes = [
    {pattern: /^\/login$/, title: "Sodhify login"},
    {pattern: /^\/signup$/, title: "Sodhify signup"},
    {pattern: /.*/, title: "Sodhify"},
  ];

  useEffect(() => {
    const match = routes.find((route) => route.pattern.test(location.pathname));
    document.title = match.title;
  }, [location]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) return <PageLoader />
  return (
    <div className="min-h-screen bg-slate-900 relative flex items-center justify-center p-4 overflow-hidden">
      {/* DECORATORS - GRID BG & GLOW SHAPES */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]" />
      <div className="absolute top-0 -left-4 size-96 bg-pink-500 opacity-20 blur-[100px]" />
      <div className="absolute bottom-0 -right-4 size-96 bg-cyan-500 opacity-20 blur-[100px]" />
      {/* Routes */}
      <Routes>
        <Route path="/" element={authUser ? <ChatPage /> : <Navigate to={'/login'} />} />
        <Route path="/login" element={authUser? <Navigate to={'/'}/> : <LoginPage />} />
        <Route path="/signup" element={authUser ? <Navigate to={'/'}/> : <SignupPage />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
