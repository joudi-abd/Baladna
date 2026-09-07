// src/components/TripCard.js

import React from 'react';
import '../styles/Trips.css';

const TripCard = ({ trip }) => {

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

        <img
          src={trip.cover_image}
          alt={trip.title}
          className="trip-card-img"
        />

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


        {/* السعر */}
        <div className="trip-price">
          <span>سعر الرحلة</span>

          <strong>
            {Number(trip.price).toLocaleString('ar-SY')}
            <small> ل.س</small>
          </strong>
        </div>


        {/* الأزرار */}
        <div className="card-actions">

          <button className="btn-book-now">
            احجز الآن
          </button>

          <button className="btn-view-trip">
            عرض الرحلة
          </button>

        </div>

      </div>

    </article>
  );
};

export default TripCard;