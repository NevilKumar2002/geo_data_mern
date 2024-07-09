import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import { ChakraProvider } from '@chakra-ui/react';
import DashboardPage from './components/DashBoard';

const App = () => {
  

  return (
    <ChakraProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          
          <Route path="/*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
};

export default App;
