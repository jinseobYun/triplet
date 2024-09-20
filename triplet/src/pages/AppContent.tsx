import React, {useState, useEffect} from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled, { createGlobalStyle } from 'styled-components';

// router import
import Navbar from '../components/navigation/Navbar';
import type { RootState } from '../store';
import LoginPage from './user/login/LoginPage';

const AppContent = () => {

    const location = useLocation();
    const [isActive, setIsActive] = useState(true);

    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  
    useEffect(() => {
      const offPages = ["/login", "/signup"];
      if (offPages.includes(location.pathname)) {
        setIsActive(false);
      } else {
        setIsActive(true);
      }
    }, [location.pathname]);  // location.pathname이 변경될 때마다 실행

  return (
    <>
        {!isAuthenticated && <Navigate to="/login"/>}
        {isAuthenticated && <Navigate to="/home"/>}
        {isActive && <Navbar />}  {/* isActive가 true일 때만 Navbar 렌더링 */}
    </>
  );
};

export default AppContent;