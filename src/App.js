import React from "react";
import {
  BrowserRouter, 
  Routes,
  Route
} from 'react-router-dom';
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Menu from './pages/Menu/Menu';
import LoginPage from './pages/Login/Login';
import PrivateRoute from "./utils/PrivateRoute";
import {AuthProvider} from "./context/AuthContext";

function App() {
  return (
   <div>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="menu" element={<Menu />}/>
          <Route path="secret/login" element={<LoginPage />}/>        
        </Routes>
      </AuthProvider>
   </div>
  );
}

export default App;
