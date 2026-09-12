import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

import logo from "../assets/Logo.png";
import "../styles/Header.css";

import { apiRequest, getToken } from "../api/api";

const Header = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  // حالة تسجيل الدخول
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // ==========================================================
  // CHECK LOGIN STATUS
  // ==========================================================

  useEffect(() => {
    const token = getToken();

    setIsLoggedIn(!!token);
  }, [pathname]);

  // ==========================================================
  // ACTIVE NAVIGATION
  // ==========================================================

  // صفحة تفاصيل المكان جزء من الاستكشاف
  const isExplorationActive = pathname.startsWith("/places/");

  // تدفق الحجز يبدأ من صفحة الرحلات
  const isTripsActive = pathname.startsWith("/booking/");

  // ==========================================================
  // LOGOUT
  // ==========================================================

  const handleLogout = async () => {
    try {
      // إرسال طلب تسجيل الخروج للـ Backend
      const response = await apiRequest("/logout", {
        method: "POST",
      });

      console.log("LOGOUT RESPONSE:", response);
    } catch (error) {
      console.error("LOGOUT ERROR:", error);
    } finally {
      // حذف التوكن من المتصفح مهما كانت نتيجة الـ API
      localStorage.removeItem("token");

      // إذا كنت تخزن بيانات المستخدم
      localStorage.removeItem("user");

      // تحديث حالة تسجيل الدخول
      setIsLoggedIn(false);

      // العودة إلى صفحة تسجيل الدخول
      navigate("/login");
    }
  };

  // ==========================================================
  // RENDER
  // ==========================================================

  return (
    <header className="main-header">
      <div className="header-container">

        {/* Logo */}
        <div
          className="header-logo"
          onClick={() => navigate("/home")}
          style={{ cursor: "pointer" }}
        >
          <img src={logo} alt="Baladna" />
        </div>

        {/* Navigation */}
        <nav className="header-nav">

          <NavLink to="/home">
            الرئيسية
          </NavLink>

          <NavLink
            to="/exploration"
            className={({ isActive }) =>
              isActive || isExplorationActive ? "active" : ""
            }
          >
            استكشاف
          </NavLink>

          <NavLink
            to="/trips"
            className={({ isActive }) =>
              isActive || isTripsActive ? "active" : ""
            }
          >
            الرحلات
          </NavLink>

          <NavLink to="/bookings">
            حجوزاتي
          </NavLink>

          <NavLink to="/about">
            من نحن
          </NavLink>

        </nav>

        {/* Actions */}
        <div className="header-actions">

          {/* احجز رحلتك */}
          <button
            type="button"
            className="book-trip-btn"
            onClick={() => navigate("/trips")}
          >
            احجز رحلتك
          </button>
          <button type="button" className="profile-btn" onClick={() => navigate("/Profile")}>
            الملف الشخصي
          </button>

          {/* تسجيل الدخول / تسجيل الخروج */}
          {isLoggedIn ? (
            <button
              type="button"
              className="login-btn"
              onClick={handleLogout}
            >
              تسجيل الخروج
            </button>
          ) : (
            <button
              type="button"
              className="login-btn"
              onClick={() => navigate("/login")}
            >
              تسجيل الدخول
            </button>
          )}

        </div>

      </div>
    </header>
  );
};

export default Header;