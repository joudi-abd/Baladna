import React from "react";
import { Link } from "react-router-dom";
import { FiImage, FiCalendar, FiUsers, FiStar } from "react-icons/fi";

// كرت رحلة يُستخدم في قسم "الرحلات المتاحة" بالصفحة الرئيسية
function HomeTripCard({ trip }) {
  return (
    <article className="home-trip-card">
      <div className="home-card-image">
        {trip.image ? (
          <img src={trip.image} alt={trip.title} />
        ) : (
          <div className="image-placeholder">
            <FiImage />
          </div>
        )}

        <span className={`home-card-badge badge-${trip.badgeType}`}>
          {trip.badge}
        </span>
      </div>

      <div className="home-card-content">
        <div className="trip-title-row">
          <h3>{trip.title}</h3>

          <span className="home-trip-rating">
            <FiStar /> {trip.rating}
          </span>
        </div>

        <p>{trip.description}</p>

        <div className="trip-mini-details">
          <span>
            <FiCalendar /> {trip.duration}
          </span>

          <span>
            <FiUsers /> {trip.seats}
          </span>
        </div>

        <div className="trip-card-bottom">
          <Link to={`/trips/${trip.tripId}`} className="btn-outline-sm">
            عرض الرحلة
          </Link>

          <Link to={`/booking/${trip.tripId}`} className="btn-fill-sm">
            احجز الآن
          </Link>
        </div>
      </div>
    </article>
  );
}

export default HomeTripCard;
