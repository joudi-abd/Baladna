import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../styles/bookingConfirmation.css";
import Footer from "../components/Footer";
import travel from "../assets/travel.jpg";
import logo from "../assets/Logo.png";

function BookingConfirmation() {
  const navigate = useNavigate();

  const [people, setPeople] = useState(2);
  const [notes, setNotes] = useState("");

  const pricePerPerson = 150000;
  const totalPrice = people * pricePerPerson;

  const increasePeople = () => {
    if (people < 20) {
      setPeople(people + 1);
    }
  };

  const decreasePeople = () => {
    if (people > 1) {
      setPeople(people - 1);
    }
  };

  const handleBooking = () => {
    // لاحقاً هون منربط POST Booking API
    navigate("/payment");
  };

  return (
    <div className="booking-page" dir="rtl">

      {/* Navbar */}
      <nav className="booking-navbar">

        <div className="navbar-logo">
         < img src={logo} alt="Logo" className="logo-image" />
        </div>

        <div className="navbar-links">
          <Link to="/home">الرئيسية</Link>
          <Link to="/Exploration">استكشاف</Link>
          <Link to="/trips">الرحلات</Link>
          <Link to="/bookings">حجوزاتي</Link>
          <Link to="/about">من نحن</Link>
        </div>

        <div className="navbar-buttons">
          <Link to="/login" className="login-btn">
            تسجيل الدخول
          </Link>

          <Link to="/BookingConfirmation" className="book-btn">
            احجز رحلتك
          </Link>
        </div>

      </nav>

      {/* Breadcrumb */}
<div className="booking-breadcrumb">

  <Link to="/home">
    الرئيسية
  </Link>

  <Link to="/Trips">
    الرحلات
  </Link>

  <Link to="/TripDetails">
    تفاصيل الرحلة
  </Link>

  <Link to="/BookingConfirmation" className="active">
    تأكيد الحجز
  </Link>

</div>

      {/* Header */}
      <section className="booking-header">
        <h1>تأكيد حجز الرحلة</h1>

        <p>
          أكمل بيانات الحجز وتأكد من تفاصيل رحلتك قبل الانتقال للدفع.
        </p>
      </section>

      {/* Steps */}
      <div className="booking-steps">

        <div className="step active">
          <span>1</span>
          <p>تفاصيل الحجز</p>
        </div>

        <div className="step">
          <span>2</span>
          <p>الدفع</p>
        </div>

        <div className="step">
          <span>✓</span>
          <p>تم الحجز</p>
        </div>

      </div>

      {/* Main Content */}
      <main className="booking-content">

        {/* Booking Information */}
        <section className="booking-info-card">

          <h2>ⓘ معلومات الحجز</h2>

          <label>اسم الرحلة</label>

          <div className="trip-small-card">

            <img src={travel} alt="رحلة دمشق القديمة" />

            <div className="trip-small-info">
              <h3>رحلة اكتشاف دمشق القديمة</h3>

              <div className="trip-details">
                <span>📍 دمشق</span>
                <span>📅 15 يوليو 2026</span>
                <span>⏱ يوم كامل</span>
                <span>👥 {people} أشخاص</span>
              </div>
            </div>

            <div className="trip-rating">
              ⭐ 4.7
            </div>

          </div>

          {/* People */}
          <div className="people-section">

            <label>عدد المشاركين</label>

            <div className="people-counter">

              <button onClick={decreasePeople}>
                −
              </button>

              <div>
                <strong>{people} أشخاص</strong>
              </div>

              <button onClick={increasePeople}>
                +
              </button>

            </div>

            <small>
              الحد الأقصى للمشاركين في الرحلة 20 شخصاً
            </small>

          </div>

          {/* Prices */}
          <div className="price-box">

            <div>
              <span>السعر للفرد</span>
              <strong>150,000 ل.س</strong>
            </div>

            <div>
              <span>السعر الإجمالي</span>
              <strong>{totalPrice.toLocaleString()} ل.س</strong>
            </div>

          </div>

          {/* Notes */}
          <div className="notes-section">

            <label>
              ملاحظات إضافية <small>(اختياري)</small>
            </label>

            <textarea
              placeholder="اكتب الملاحظات التي تود إضافتها مع حجزك"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />

            <small>
              {notes.length}/120
            </small>

          </div>

          <div className="privacy-message">
            🛡 بياناتك محمية ويتم استخدامها للحجز فقط.
          </div>

          <button
            className="confirm-booking-btn"
            onClick={handleBooking}
          >
            تأكيد الحجز والدفع
            <span>←</span>
          </button>

        </section>

        {/* Summary */}
        <aside className="booking-summary">

          <h2>▣ ملخص الحجز</h2>

          <img
            src={travel}
            alt="رحلة اكتشاف دمشق القديمة"
          />

          <h3>رحلة اكتشاف دمشق القديمة</h3>

          <div className="summary-row">
            <span>التاريخ</span>
            <strong>15 يوليو 2026</strong>
          </div>

          <div className="summary-row">
            <span>المدة</span>
            <strong>يوم كامل</strong>
          </div>

          <div className="summary-row">
            <span>المشاركون</span>
            <strong>{people} أشخاص</strong>
          </div>

          <hr />

          <h4>تفاصيل السعر</h4>

          <div className="summary-row">
            <span>سعر الرحلة للفرد</span>
            <strong>150,000 ل.س</strong>
          </div>

          <div className="summary-row">
            <span>عدد المشاركين</span>
            <strong>× {people}</strong>
          </div>

          <hr />

          <div className="total-row">
            <span>السعر الإجمالي</span>
            <strong>
              {totalPrice.toLocaleString()} ل.س
            </strong>
          </div>

          <div className="warning-box">
            <strong>ⓘ مهم</strong>
            <p>
              لن يتم تأكيد حجزك إلا بعد التحقق من الدفع.
            </p>
          </div>

        </aside>

      </main>

      <Footer />

    </div>
  );
}

export default BookingConfirmation;