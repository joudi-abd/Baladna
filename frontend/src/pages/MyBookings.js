
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/bookings.css";
import Footer from "../components/Footer";
import Booking from "../assets/Booking.jpg";

function MyBookings() {
  const [activeTab, setActiveTab] = useState("upcoming");

  const bookings = [
    {
      id: 1,
      title: "رحلة اكتشاف دمشق القديمة",
      bookingNumber: "BND-2024-00046",
      city: "دمشق",
      date: "15 يوليو 2026",
      people: "2 شخص",
      type: "رحلة ثقافية",
      duration: "يوم كامل",
      price: "300,000 ل.س",
      rating: "4.7",
      status: "upcoming",
    },
    {
      id: 2,
      title: "رحلة اكتشاف دمشق القديمة",
      bookingNumber: "BND-2024-00047",
      city: "دمشق",
      date: "20 يوليو 2026",
      people: "2 شخص",
      type: "رحلة ثقافية",
      duration: "يوم كامل",
      price: "300,000 ل.س",
      rating: "4.7",
      status: "upcoming",
    },
    {
      id: 3,
      title: "رحلة اكتشاف دمشق القديمة",
      bookingNumber: "BND-2024-00048",
      city: "دمشق",
      date: "10 أغسطس 2026",
      people: "2 شخص",
      type: "رحلة ثقافية",
      duration: "يوم كامل",
      price: "300,000 ل.س",
      rating: "4.7",
      status: "upcoming",
    },
    {
      id: 4,
      title: "رحلة اكتشاف دمشق القديمة",
      bookingNumber: "BND-2024-00049",
      city: "دمشق",
      date: "15 أغسطس 2026",
      people: "2 شخص",
      type: "رحلة ثقافية",
      duration: "يوم كامل",
      price: "300,000 ل.س",
      rating: "4.7",
      status: "upcoming",
    },
  ];

  const completedBookings = bookings.map((booking) => ({
    ...booking,
    status: "completed",
  }));

  const cancelledBookings = bookings.map((booking) => ({
    ...booking,
    status: "cancelled",
  }));

  const getBookings = () => {
    if (activeTab === "completed") {
      return completedBookings;
    }

    if (activeTab === "cancelled") {
      return cancelledBookings;
    }

    return bookings;
  };

  const currentBookings = getBookings();

  return (
    <div className="bookings-page">

      {/* Navbar */}
      <nav className="bookings-navbar">

        <div className="navbar-logo">
          <span>بلدنا</span>
        </div>

        <div className="navbar-links">
          <Link to="/home">الرئيسية</Link>
          <Link to="/Exploration">استكشاف</Link>
          <Link to="/Trips">الرحلات</Link>

          <Link to="/bookings" className="active-link">
            حجوزاتي
          </Link>

          <Link to="/about">من نحن</Link>
        </div>

        <div className="navbar-buttons">
          <Link to="/login" className="login-button">
            تسجيل الدخول
          </Link>

          <Link to="/trips" className="book-button">
            احجز رحلتك
          </Link>
        </div>

      </nav>


      {/* Hero */}
      <section className="bookings-hero">

        <div className="hero-overlay"></div>

        <div className="hero-content">
          <h1>حجوزاتي</h1>

          <p>
            تابع حجوزاتك القادمة والسابقة واستمتع برحلاتك معنا
          </p>

          <div className="hero-stats">

            <div className="hero-stat">
              <span className="stat-icon">▣</span>
              <strong>القادمة</strong>
              <span>8 حجوزات</span>
            </div>

            <div className="hero-stat">
              <span className="stat-icon">◷</span>
              <strong>المكتملة</strong>
              <span>8 حجوزات</span>
            </div>

            <div className="hero-stat">
              <span className="stat-icon">⊗</span>
              <strong>ملغاة</strong>
              <span>2 حجوزات</span>
            </div>

          </div>
        </div>

      </section>


      {/* Tabs */}
      <div className="bookings-tabs-container">

        <button
          className={activeTab === "upcoming" ? "booking-tab active" : "booking-tab"}
          onClick={() => setActiveTab("upcoming")}
        >
          <span>▣</span>
          الحجوزات القادمة
        </button>

        <button
          className={activeTab === "completed" ? "booking-tab active" : "booking-tab"}
          onClick={() => setActiveTab("completed")}
        >
          <span>◷</span>
          الحجوزات المكتملة
        </button>

        <button
          className={activeTab === "cancelled" ? "booking-tab active" : "booking-tab"}
          onClick={() => setActiveTab("cancelled")}
        >
          <span>⊗</span>
          الحجوزات الملغاة
        </button>

      </div>


      {/* Content */}
      <main className="bookings-content">

        <div className="bookings-heading">

          <div>
            <h2>
              {activeTab === "upcoming" && "الحجوزات القادمة"}
              {activeTab === "completed" && "الحجوزات المكتملة"}
              {activeTab === "cancelled" && "الحجوزات الملغاة"}
            </h2>

            <p>
              الرحلات التي تم تأكيد حجزها معنا
            </p>
          </div>

          <button className="sort-button">
            ترتيب حسب ▾
          </button>

        </div>


        {/* Booking Cards */}
        <div className="bookings-list">

          {currentBookings.map((booking) => (

            <div className="booking-card" key={booking.id}>

              {/* Image */}
              <div className="booking-image-container">

                <img
                  src={Booking}
                  alt={booking.title}
                  className="booking-image"
                />

                <span
                  className={
                    booking.status === "upcoming"
                      ? "booking-status upcoming-status"
                      : booking.status === "completed"
                      ? "booking-status completed-status"
                      : "booking-status cancelled-status"
                  }
                >
                  {booking.status === "upcoming" && "تم الحجز"}
                  {booking.status === "completed" && "مكتمل"}
                  {booking.status === "cancelled" && "ملغي"}
                </span>

              </div>


              {/* Information */}
              <div className="booking-information">

                <div className="booking-title-row">

                  <div>
                    <h3>{booking.title}</h3>

                    <small>
                      رقم الحجز: {booking.bookingNumber}
                    </small>
                  </div>

                  <div className="rating">
                    {booking.rating} ⭐
                  </div>

                </div>


                <div className="booking-details">

                  <div>
                    <span>⌖</span>
                    {booking.city}
                  </div>

                  <div>
                    <span>▣</span>
                    {booking.date}
                  </div>

                  <div>
                    <span>♧</span>
                    {booking.people}
                  </div>

                  <div>
                    <span>◷</span>
                    {booking.duration}
                  </div>

                  <div>
                    <span>▤</span>
                    {booking.type}
                  </div>

                </div>


                {/* Bottom */}
                <div className="booking-bottom">

                  <div className="price">
                    <small>السعر الإجمالي</small>
                    <strong>{booking.price}</strong>
                  </div>


                  <div className="booking-actions">

                    <button className="details-button">
                      عرض التفاصيل
                    </button>

                    {activeTab === "upcoming" && (
                      <button className="cancel-button">
                        إلغاء الحجز
                      </button>
                    )}

                    {activeTab === "completed" && (
                      <button className="review-button">
                        ⭐ قيّم التجربة
                      </button>
                    )}

                  </div>

                </div>

              </div>

            </div>

          ))}

        </div>


        {/* Pagination */}
        <div className="pagination">

          <button>‹</button>
          <button className="current-page">1</button>
          <button>2</button>
          <button>3</button>
          <button>4</button>
          <button>›</button>

        </div>

      </main>


      {/* Footer */}
      <Footer />

    </div>
  );
}

export default MyBookings;