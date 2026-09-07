import React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/Logo.png";
import "../styles/Header.css";

const Header = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  // صفحة تفاصيل المكان (places/:id) جزء من مسار الاستكشاف
  // لذلك يبقى تبويب "استكشاف" فعّالاً فيها رغم اختلاف المسار
  const isExplorationActive = pathname.startsWith("/places/");

  // تدفّق الحجز (booking/:tripId والدفع) يبدأ من صفحة الرحلات
  // لذلك يبقى تبويب "الرحلات" فعّالاً فيه رغم اختلاف المسار
  // (يُشترط الشرطة المائلة بعد "booking" لتفادي تطابق جزئي مع "/bookings" الخاص بصفحة حجوزاتي)
  const isTripsActive = pathname.startsWith("/booking/");

  return (
    <header className="main-header">
      <div className="header-container">
        {/* Logo */}
        <div className="header-logo">
          <img src={logo} alt="Baladna" />
        </div>

        {/* Navigation */}
        <nav className="header-nav">
          <NavLink to="/home">الرئيسية</NavLink>

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

          <NavLink to="/bookings">حجوزاتي</NavLink>

          <NavLink to="/about">من نحن</NavLink>
        </nav>

        {/* Actions */}
        <div className="header-actions">
          <button
            type="button"
            className="book-trip-btn"
            onClick={() => navigate("/trips")}
          >
            احجز رحلتك
          </button>

          <button
            type="button"
            className="login-btn"
            onClick={() => navigate("/login")}
          >
            تسجيل الدخول
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
