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
import Footer from './components/Footer/Footer';
import ErrorPage from "./pages/ErrorPage/ErrorPage";

function App() {
  return (
   <div>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="menu" element={<Menu />}/>
          <Route path="secret/login" element={<LoginPage />}/>  
          <Route path='*' element={<ErrorPage />}/>      
        </Routes>
        <Footer />
      </AuthProvider>
   </div>
  );
}

export default App;
