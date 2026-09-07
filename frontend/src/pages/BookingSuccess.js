import React from "react";
import { Link } from "react-router-dom";
import "../styles/bookingSuccess.css";
import Footer from "../components/Footer";
import logo from "../assets/Logo.png";
import travel from "../assets/travel.jpg";

function BookingSuccess() {
  return (
    <div className="success-page" dir="rtl">

      {/* ================= NAVBAR ================= */}
      <nav className="success-navbar">

        <div className="success-logo">
          <img src={logo} alt="Baladna" />
        </div>

        <div className="success-navbar-links">
          <Link to="/home">الرئيسية</Link>
          <Link to="/Exploration">استكشاف</Link>
          <Link to="/trips" className="active">
            الرحلات
          </Link>
          <Link to="/bookings">حجوزاتي</Link>
          <Link to="/about">من نحن</Link>
        </div>

        <div className="success-navbar-buttons">
          <Link to="/login" className="success-login-btn">
            تسجيل الدخول
          </Link>

          <Link to="/BookingConfirmation" className="success-book-btn">
            احجز رحلتك
          </Link>
        </div>

      </nav>


      {/* ================= STEPS ================= */}

      <div className="success-steps">

        <div className="success-step">
          <span>✓</span>
          <p>تفاصيل الحجز</p>
        </div>

        <div className="success-step">
          <span>✓</span>
          <p>الدفع</p>
        </div>

        <div className="success-step active">
          <span>3</span>
          <p>اكتمال الدفع</p>
        </div>

      </div>


      {/* ================= SUCCESS HEADER ================= */}

      <section className="success-header">

        <div className="success-icon">
          ✓
        </div>

        <h1>تم الحجز بنجاح</h1>

        <p>
          شكراً لك! تم إتمام الدفع وتأكيد حجز رحلتك بنجاح.
          <br />
          سيتم إرسال تفاصيل الحجز إلى بريدك الإلكتروني ورقم هاتفك.
        </p>

        {/* Booking Number */}

        <div className="booking-number-box">

          <span>رقم حجزك</span>

          <strong>
            BND-2024-00046
          </strong>

          <button
            className="copy-booking-number"
            onClick={() =>
              navigator.clipboard.writeText("BND-2024-00046")
            }
            title="نسخ رقم الحجز"
          >
            ⧉
          </button>

        </div>

      </section>


      {/* ================= TRIP SUMMARY ================= */}

      <main className="success-content">

        <section className="success-trip-card">

          <div className="success-trip-image">

            <img
              src={travel}
              alt="رحلة اكتشاف دمشق القديمة"
            />

            <span className="success-status">
              تم الحجز
            </span>

          </div>


          <div className="success-trip-info">

            <h2>
              رحلة اكتشاف دمشق القديمة
            </h2>

            <div className="success-trip-details">

              <div>
                <span>📅</span>
                <p>
                  <small>التاريخ</small>
                  15 يوليو 2026
                </p>
              </div>

              <div>
                <span>⏱</span>
                <p>
                  <small>المدة</small>
                  يوم كامل
                </p>
              </div>

              <div>
                <span>📍</span>
                <p>
                  <small>الموقع</small>
                  دمشق
                </p>
              </div>

              <div>
                <span>👥</span>
                <p>
                  <small>المشاركون</small>
                  2 شخص
                </p>
              </div>

            </div>

          </div>


          <div className="success-rating">
            <strong>4.7</strong>
            <span>⭐</span>
          </div>

        </section>


        {/* ================= DETAILS + PAYMENT ================= */}

        <div className="success-bottom">


          {/* Booking Details */}

          <section className="success-details-card">

            <h3>
              ▣ تفاصيل الحجز
            </h3>

            <div className="success-info-row">
              <span>عدد المشاركين</span>
              <strong>2 أشخاص</strong>
            </div>

            <div className="success-info-row">
              <span>تاريخ الرحلة</span>
              <strong>15 يوليو 2026</strong>
            </div>

            <div className="success-info-row">
              <span>نقطة التجمع</span>
              <strong>ساحة الأمويين - دمشق</strong>
            </div>

            <div className="success-info-row">
              <span>وسيلة النقل</span>
              <strong>حافلة سياحية مكيفة</strong>
            </div>

            <div className="success-info-row">
              <span>ملاحظات</span>
              <strong>لا توجد ملاحظات</strong>
            </div>

          </section>


          {/* Payment Summary */}

          <section className="success-payment-card">

            <h3>
              ▣ ملخص الدفع
            </h3>

            <div className="success-info-row">
              <span>سعر الرحلة للفرد</span>
              <strong>150,000 ل.س</strong>
            </div>

            <div className="success-info-row">
              <span>عدد المشاركين</span>
              <strong>× 2</strong>
            </div>

            <div className="payment-total">

              <span>الإجمالي المدفوع</span>

              <strong>
                300,000 ل.س
              </strong>

            </div>

            <div className="payment-success-message">
              ✓ تم إتمام الدفع بواسطة شام كاش
            </div>

          </section>

        </div>


        {/* ================= ACTIONS ================= */}

        <div className="success-actions">

          <Link
            to="/home"
            className="home-success-btn"
          >
            العودة للرئيسية
          </Link>

          <Link
            to="/bookings"
            className="bookings-success-btn"
          >
            استعراض حجوزاتي
          </Link>

        </div>

      </main>


      {/* ================= FOOTER ================= */}

      <Footer />

    </div>
  );
}

export default BookingSuccess;