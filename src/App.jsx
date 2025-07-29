import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Outlet } from 'react-router-dom'
import { useDispatch } from "react-redux";
import { login, logout } from "./store/authSlice";
import Header from "./components/header/Header"
import Footer from "./components/footer/Footer"
import ErrorBoundary from "./components/ErrorBoundary"
import ConfigDebug from "./components/ConfigDebug"
import authService from './appwrite/auth'
import Logo from "./components/Logo"

function App() {

  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
      authService
          .getCurrentUser()
          .then((userData) => {
              if (userData) dispatch(login({ userData }));
              else dispatch(logout());
          })
          .finally(() => setLoading(false));
  }, [dispatch]);

  return !loading ? (
    <ErrorBoundary>
      <div className="min-h-screen flex flex-wrap content-between bg-gray-400">
        <div className="w-full block">
          <Header />
          <main>
            <ErrorBoundary>
              <Outlet />
            </ErrorBoundary>
          </main>
        </div>
        <div className="w-full block">
          <Footer />
        </div>
      </div>
      <ConfigDebug />
    </ErrorBoundary>
  ) : null;
}

export default App
