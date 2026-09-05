import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/Header.css";

const Header = () => {
  return (
    <header className="main-header">
      <div className="header-container">
        {/* Logo */}
        <div className="header-logo">
          <img src="/logo.png" alt="Baladna" />
        </div>

        {/* Navigation */}
        <nav className="header-nav">
          <NavLink to="/home">الرئيسية</NavLink>

          <NavLink to="/exploration">استكشاف</NavLink>

          <NavLink to="/trips">الرحلات</NavLink>

          <NavLink to="/bookings">حجوزاتي</NavLink>

          <NavLink to="/about">من نحن</NavLink>
        </nav>

        {/* Actions */}
        <div className="header-actions">
          <button className="book-trip-btn">احجز رحلتك</button>

          <button className="login-btn">تسجيل الدخول</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
