// src/components/TripCard.js

import React from 'react';
import { Link } from 'react-router-dom';
import { FiImage, FiCalendar, FiClock, FiUsers, FiMapPin, FiDollarSign } from 'react-icons/fi';
import { FaBus } from 'react-icons/fa6';
import '../styles/Trips.css';

// badgeLabel: نص شارة اختياري يتجاوز النص المشتق تلقائيًا من trip.status (لعرض شارات مثل "الأكثر حجزاً")
// variant="listing": شبكة معلومات أكثف (٦ عناصر تشمل السعر ونقطة التجمع) تُستخدم في صفحة "الرحلات"
const TripCard = ({ trip, badgeLabel, variant = 'default' }) => {

  const formatDate = (date) => {
    if (!date) return 'غير محدد';

    return new Date(date).toLocaleDateString('ar-SY', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const transportation = {
    bus: 'باص',
    mini_bus: 'ميني باص',
    train: 'قطار',
    tour_bus: 'باص سياحي'
  };

  const getBadge = () => {
    if (badgeLabel) return badgeLabel;

    if (trip.status === 'upcoming') return 'جديدة';
    if (trip.status === 'ongoing') return 'متاحة الآن';
    if (trip.status === 'completed') return 'مكتملة';
    if (trip.status === 'cancelled') return 'ملغاة';

    return 'رحلة';
  };

  return (
    <article className="trip-card">

      {/* صورة الرحلة */}
      <div className="card-image-container">

        {trip.cover_image ? (
          <img
            src={trip.cover_image}
            alt={trip.title}
            className="trip-card-img"
          />
        ) : (
          <div className="image-placeholder">
            <FiImage />
          </div>
        )}

        <span className="badge-category">
          {getBadge()}
        </span>

      </div>


      {/* محتوى الكرت */}
      <div className="card-content">

        {/* العنوان والتقييم */}
        <div className="card-header-row">

          <h3 className="trip-card-title">
            {trip.title}
          </h3>

          <div className="trip-rating">
            <span>★</span>
            {trip.rating_avg ?? '0'}
          </div>

        </div>


        {/* الوصف */}
        <p className="trip-card-description">
          {trip.description}
        </p>


        {/* معلومات الرحلة */}
        {variant === 'listing' ? (

          <div className="trip-details-grid trip-details-grid-listing">

            <div className="detail-item">
              <FiUsers className="detail-icon" />
              <span>{trip.available_seats} مقعدًا متاحًا</span>
            </div>

            <div className="detail-item">
              <FiClock className="detail-icon" />
              <span>{trip.duration_hours} ساعات</span>
            </div>

            <div className="detail-item">
              <FiCalendar className="detail-icon" />
              <span>{formatDate(trip.trip_date)}</span>
            </div>

            <div className="detail-item">
              <FiDollarSign className="detail-icon" />
              <span>{trip.price_per_person}$ للشخص</span>
            </div>

            <div className="detail-item">
              <FaBus className="detail-icon" />
              <span>
                {transportation[trip.transportation_type] ||
                  trip.transportation_type}
              </span>
            </div>

            <div className="detail-item">
              <FiMapPin className="detail-icon" />
              <span>{trip.meeting_point}</span>
            </div>

          </div>

        ) : (

          <div className="trip-details-grid">

            <div className="detail-item">
              <span className="detail-icon">📅</span>
              <span>{formatDate(trip.trip_date)}</span>
            </div>

            <div className="detail-item">
              <span className="detail-icon">⏱</span>
              <span>{trip.duration} أيام</span>
            </div>

            <div className="detail-item">
              <span className="detail-icon">👤</span>
              <span>{trip.available_seats} مقاعد متبقية</span>
            </div>

            <div className="detail-item">
              <span className="detail-icon">🚌</span>
              <span>
                {transportation[trip.transportation_type] ||
                  trip.transportation_type}
              </span>
            </div>

          </div>

        )}


        {/* السعر */}
        {variant !== 'listing' && (
          <div className="trip-price">
            <span>سعر الرحلة</span>

            <strong>
              {Number(trip.price).toLocaleString('ar-SY')}
              <small> ل.س</small>
            </strong>
          </div>
        )}


        {/* الأزرار */}
        <div className="card-actions">

          <Link to={`/booking/${trip.id}`} className="btn-book-now">
            احجز الآن
          </Link>

          <Link to={`/trips/${trip.id}`} className="btn-view-trip">
            عرض الرحلة
          </Link>

        </div>

      </div>

    </article>
  );
};

export default TripCard;