import React from "react";
import { Link } from "react-router-dom";
import {
  FiImage,
  FiCopy,
  FiMapPin,
  FiCalendar,
  FiClock,
  FiTag,
  FiUsers,
  FiStar,
  FiCheck,
} from "react-icons/fi";
import { FaBus } from "react-icons/fa6";
import { bookingStatusLabels } from "../data/bookingsMockData";

// كرت حجز واحد، يُستخدم في صفحة "حجوزاتي" لعرض بيانات الحجز القادمة كانت أم مكتملة أم ملغاة
// onRate: يُستدعى عند الضغط على "تقييم الرحلة" لفتح نافذة التقييم من الصفحة الأم
// onCancel: يُستدعى عند الضغط على "إلغاء الحجز"
// isReviewed: إن كان هذا الحجز قد قُيِّم مسبقًا خلال هذه الجلسة
function BookingCard({ booking, onRate, onCancel, isReviewed }) {
  const pillLabel = bookingStatusLabels[booking.status]?.pill || booking.status;

  return (
    <article className="booking-card">
      <div className="booking-card-media">
        <div className="booking-card-image">
          {booking.image ? (
            <img src={booking.image} alt={booking.title} />
          ) : (
            <div className="image-placeholder">
              <FiImage />
            </div>
          )}

          <span className={`booking-status-pill pill-${booking.status}`}>
            {pillLabel}
          </span>
        </div>

        <div className="booking-card-price">
          <span>السعر الإجمالي</span>
          <strong>{booking.totalPrice} ل.س</strong>
        </div>
      </div>

      <div className="booking-card-body">
        <div className="booking-card-toprow">
          <div className="booking-card-info">
            <h3 className="booking-card-title">{booking.title}</h3>

            <div className="booking-card-reference">
              <FiCopy />
              رقم الحجز: {booking.reference}
            </div>

            <div className="booking-meta-grid">
              <span>
                <FiMapPin /> {booking.location}
              </span>

              <span>
                <FiCalendar /> {booking.date}
              </span>

              <span>
                <FiClock /> {booking.duration}
              </span>

              <span>
                <FiTag /> {booking.type}
              </span>

              <span>
                <FaBus /> {booking.transportation}
              </span>
            </div>
          </div>

          <div className="booking-card-side">
            <div className="booking-rating">
              {booking.rating}
              <FiStar />
            </div>

            <div className="booking-people">
              <FiUsers /> {booking.people} شخص
            </div>
          </div>
        </div>

        <div className="booking-card-actions">
          <Link to={`/trips/${booking.tripId}`} className="btn-view-details">
            عرض التفاصيل
          </Link>

          {booking.status === "upcoming" && (
            <button
              type="button"
              className="btn-cancel-booking"
              onClick={() => onCancel(booking)}
            >
              إلغاء الحجز
            </button>
          )}

          {booking.status === "completed" && (
            isReviewed ? (
              <button
                type="button"
                className="btn-rate-trip is-reviewed"
                aria-disabled="true"
                onClick={(event) => event.preventDefault()}
              >
                <FiCheck /> تم التقييم
              </button>
            ) : (
              <button
                type="button"
                className="btn-rate-trip"
                onClick={(event) => onRate(booking, event)}
              >
                تقييم الرحلة
              </button>
            )
          )}

          {booking.status === "cancelled" && (
            <Link to={`/booking/${booking.tripId}`} className="btn-rate-trip">
              حجز مرة أخرى
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}

export default BookingCard;
