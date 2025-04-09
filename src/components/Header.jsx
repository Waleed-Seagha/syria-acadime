import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import '../styles/Header.css';
import logo from '../styles/img/logo.png';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const userType = localStorage.getItem('userType');

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userType');
    navigate('/login');
    closeMenu();
  };

  return (
    <header className={`header ${theme}`}>
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <Link to="/" onClick={closeMenu}>
              <img src={logo} alt="Syria Acadime Logo" className="logo-img" />
            </Link>
          </div>

          <nav className={`nav ${isMenuOpen ? 'active' : ''}`}>
            <ul>
              <li><Link to="/" onClick={closeMenu}>الرئيسية</Link></li>
              <li><Link to="/courses" onClick={closeMenu}>الدورات</Link></li>
              <li><Link to="/question-bank" onClick={closeMenu}>بنك الأسئلة</Link></li>
              <li><Link to="/exams" onClick={closeMenu}>الاختبارات</Link></li>
              <li><Link to="/forum" onClick={closeMenu}>المنتدى</Link></li>
              <li><Link to="/learning" onClick={closeMenu}>المحتوى التعليمي</Link></li>
              {isLoggedIn ? (
                <>
                  <li><Link to={`/${userType}-dashboard`} onClick={closeMenu}>لوحة التحكم</Link></li>
                  <li><button onClick={handleLogout} className="logout-btn">تسجيل الخروج</button></li>
                </>
              ) : (
                <>
                  <li><Link to="/login" className="btn btn-secondary" onClick={closeMenu}>تسجيل الدخول</Link></li>
                  <li><Link to="/register" className="btn btn-primary" onClick={closeMenu}>إنشاء حساب</Link></li>
                </>
              )}
              <li className="theme-toggle">
                <button onClick={toggleTheme} className="theme-btn">
                  {theme === 'light' ? (
                    <i className="fas fa-moon"></i>
                  ) : (
                    <i className="fas fa-sun"></i>
                  )}
                </button>
              </li>
            </ul>
          </nav>

          <button className={`menu-toggle ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header; 