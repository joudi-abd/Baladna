import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FiCheck,
  FiCalendar,
  FiUsers,
  FiCreditCard,
  FiMapPin,
  FiArrowLeft,
  FiHome,
  FiShield,
} from "react-icons/fi";

import Header from "../components/Header";
import Footer from "../components/Footer";

import { formatSYP } from "../utils/formatCurrency";
import { formatBookingDate } from "../utils/formatBookingDate";

import "../styles/BookingSuccess.css";

const BookingSuccess = () => {
  const location = useLocation();

  const {
    booking,
    bookingId,
    trip,
    participantCount,
    totalPrice,
  } = location.state || {};

  const finalBookingId =
    booking?.id || bookingId;

  const tripTitle =
    trip?.title || "الرحلة السياحية";

  const tripDate =
    trip?.tripDate ||
    trip?.trip_date ||
    booking?.trip?.trip_date ||
    null;

  const formattedDate = tripDate
    ? formatBookingDate(tripDate)
    : "غير محدد";

  return (
    <>
      <Header />

      <main className="booking-success-page">

        {/* =========================
            BACKGROUND DECORATION
        ========================= */}

        <div
          className="booking-success-decoration booking-success-decoration-1"
          aria-hidden="true"
        />

        <div
          className="booking-success-decoration booking-success-decoration-2"
          aria-hidden="true"
        />

        <section className="booking-success-container">

          {/* =========================
              SUCCESS ICON
          ========================= */}

          <div className="booking-success-icon-wrapper">
            <div className="booking-success-icon">
              <FiCheck />
            </div>
          </div>

          {/* =========================
              TITLE
          ========================= */}

          <div className="booking-success-heading">

            <span className="booking-success-eyebrow">
              تمت العملية بنجاح
            </span>

            <h1>
              تم إرسال حجزك بنجاح
            </h1>

            <p>
              تم استلام طلب الحجز والدفع بنجاح،
              وسيتم التحقق من عملية الدفع قبل تأكيد الحجز النهائي.
            </p>

          </div>

          {/* =========================
              BOOKING CARD
          ========================= */}

          <div className="booking-success-card">

            <div className="booking-success-card-header">

              <div>
                <span>
                  تفاصيل الحجز
                </span>

                <h2>
                  {tripTitle}
                </h2>
              </div>

              {finalBookingId && (
                <div className="booking-success-number">
                  <span>
                    رقم الحجز
                  </span>

                  <strong>
                    #{finalBookingId}
                  </strong>
                </div>
              )}

            </div>

            <div className="booking-success-divider" />

            {/* =========================
                INFO GRID
            ========================= */}

            <div className="booking-success-info-grid">

              {/* DATE */}

              <div className="booking-success-info-item">

                <div className="booking-success-info-icon">
                  <FiCalendar />
                </div>

                <div>
                  <span>
                    تاريخ الرحلة
                  </span>

                  <strong>
                    {formattedDate}
                  </strong>
                </div>

              </div>

              {/* PARTICIPANTS */}

              <div className="booking-success-info-item">

                <div className="booking-success-info-icon">
                  <FiUsers />
                </div>

                <div>
                  <span>
                    عدد المشاركين
                  </span>

                  <strong>
                    {participantCount || 1}
                  </strong>
                </div>

              </div>

              {/* LOCATION */}

              <div className="booking-success-info-item">

                <div className="booking-success-info-icon">
                  <FiMapPin />
                </div>

                <div>
                  <span>
                    نقطة التجمع
                  </span>

                  <strong>
                    {trip?.meetingPoint ||
                      trip?.meeting_point ||
                      "غير محددة"}
                  </strong>
                </div>

              </div>

              {/* PAYMENT */}

              <div className="booking-success-info-item">

                <div className="booking-success-info-icon">
                  <FiCreditCard />
                </div>

                <div>
                  <span>
                    المبلغ الإجمالي
                  </span>

                  <strong>
                    {formatSYP(
                      Number(totalPrice || 0)
                    )}
                  </strong>
                </div>

              </div>

            </div>

            {/* =========================
                PAYMENT NOTICE
            ========================= */}

            <div className="booking-success-verification">

              <div className="booking-success-verification-icon">
                <FiShield />
              </div>

              <div>
                <strong>
                  ماذا يحدث الآن؟
                </strong>

                <p>
                  سيتم التحقق من عملية الدفع
                  يدويًا خلال 24 ساعة عمل،
                  وبعدها سيتم تأكيد الحجز
                  وإبلاغك بحالة الحجز.
                </p>
              </div>

            </div>

          </div>

          {/* =========================
              ACTIONS
          ========================= */}

          <div className="booking-success-actions">

            <Link
              to="/bookings"
              className="booking-success-primary-btn"
            >
              عرض حجوزاتي
              <FiArrowLeft />
            </Link>

            <Link
              to="/trips"
              className="booking-success-secondary-btn"
            >
              <FiHome />
              العودة إلى الرحلات
            </Link>

          </div>

          {/* =========================
              FOOT NOTE
          ========================= */}

          <p className="booking-success-footer-note">
            شكرًا لاختيارك بلادنا ❤️
          </p>

        </section>

      </main>

      <Footer />
    </>
  );
};

export default BookingSuccess;