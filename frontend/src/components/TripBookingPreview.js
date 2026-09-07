import React from "react";
import { FiImage, FiMapPin, FiCalendar, FiClock, FiUsers, FiStar } from "react-icons/fi";

// معاينة مصغّرة للرحلة المختارة، تُستخدم داخل بطاقة "معلومات الحجز"
// لا تُعيد استخدام TripCard الكاملة لأن هذا السياق يحتاج تخطيطًا مضغوطًا فقط
function TripBookingPreview({ trip, formattedDate }) {
  return (
    <div className="trip-booking-preview">
      <div className="trip-booking-preview-info">
        <div className="trip-booking-preview-rating">
          <FiStar /> {trip.rating}
        </div>

        <h3>{trip.heroTitle}</h3>

        <div className="trip-booking-preview-meta">
          <span>
            <FiMapPin /> {trip.city}
          </span>

          <span>
            <FiCalendar /> {formattedDate}
          </span>

          <span>
            <FiClock /> {trip.durationLabel}
          </span>

          <span>
            <FiUsers /> {trip.availableSeats} مقعدًا متاحًا
          </span>
        </div>
      </div>

      <div className="trip-booking-preview-image">
        {trip.image ? (
          <img src={trip.image} alt={trip.heroTitle} />
        ) : (
          <div className="image-placeholder">
            <FiImage />
          </div>
        )}
      </div>
    </div>
  );
}

export default TripBookingPreview;
