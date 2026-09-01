import React from "react";
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
          <a href="/">الرئيسية</a>
          <a href="/explore">استكشاف</a>
          <a href="/trips" className="active">
            الرحلات
          </a>
          <a href="/bookings">حجوزاتي</a>
          <a href="/about">من نحن</a>
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
