import React from 'react'
import "./App.css"
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import { ThemeProvider } from "./context/ThemeContext";
import { UserProvider } from './context/UserContext'

const App = () => {
  return (
    <UserProvider>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </UserProvider>
  );
};

export default App