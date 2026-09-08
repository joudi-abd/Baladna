import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FiMapPin,
  FiClock,
  FiUsers,
  FiImage,
  FiCalendar,
} from "react-icons/fi";

// ==========================================================
// API CONFIG
// ==========================================================

const API_BASE =
  process.env.REACT_APP_API_BASE ||
  "http://localhost:8000/api";

const API_ORIGIN = API_BASE.replace(/\/api\/?$/, "");

// ==========================================================
// IMAGE URL
// ==========================================================

const getImageUrl = (image) => {
  if (!image || typeof image !== "string") {
    return null;
  }

  const cleanImage = image.trim();

  if (!cleanImage) {
    return null;
  }

  // الرابط كامل
  if (
    cleanImage.startsWith("http://") ||
    cleanImage.startsWith("https://")
  ) {
    try {
      const url = new URL(cleanImage);

      // استخدم نفس السيرفر الموجود في API
      const apiOrigin = new URL(API_ORIGIN);

      url.protocol = apiOrigin.protocol;
      url.host = apiOrigin.host;

      // إصلاح Images فقط
      url.pathname = url.pathname.replace(
        /\/storage\/images\//i,
        "/storage/Images/"
      );

      return url.toString();
    } catch (error) {
      console.error("IMAGE URL ERROR:", error);
      return cleanImage;
    }
  }

  // رابط نسبي
  let path = cleanImage.replace(/^\/+/, "");

  if (/^images\//i.test(path)) {
    path = `storage/images/${path.substring(7)}`;
  } else if (/^storage\/images\//i.test(path)) {
    path = `storage/images/${path.substring(15)}`;
  } else if (!/^storage\//i.test(path)) {
    path = `storage/images/${path}`;
  }

  const encodedPath = path
    .split("/")
    .map((part) =>
      part ? encodeURIComponent(part) : ""
    )
    .join("/");

  return `${API_ORIGIN}/${encodedPath}`;
};

// ==========================================================
// COMPONENT
// ==========================================================

function TripCard({ trip, onClick }) {
  const [imageFailed, setImageFailed] = useState(false);
  const navigate = useNavigate();

  if (!trip) {
    return null;
  }

  // ========================================================
  // DATA
  // ========================================================

  const imageUrl = getImageUrl(
  trip.imageUrl || trip.cover_image || trip.image
);

  const title =
    trip.title || "رحلة سياحية";

  const description =
    trip.description || "";

  const price =
    trip.price ??
    trip.price_per_person ??
    0;

  const duration =
    trip.duration ??
    trip.duration_hours ??
    null;

  const availableSeats =
    trip.available_seats ?? 0;

  const maxParticipants =
    trip.max_participants ?? 0;

  const rating = Number(
    trip.rating_avg ??
      trip.rating ??
      0
  );

  const reviewsCount = Number(
    trip.reviews_count ??
      trip.reviews ??
      0
  );

  const transportationType =
    trip.transportation_type ||
    trip.transpotation_type ||
    null;

  const meetingPoint =
    trip.meeting_point ||
    trip.meetingPoint ||
    null;

  const tripDate =
    trip.trip_date || null;

  // ========================================================
  // FORMAT DATE
  // ========================================================

  const formatDate = (dateValue) => {
    if (!dateValue) {
      return null;
    }

    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) {
      return null;
    }

    return date.toLocaleDateString("ar-SY", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // ========================================================
  // TRANSPORTATION
  // ========================================================

  const getTransportationLabel = (type) => {
    const labels = {
      tour_bus: "باص سياحي",
      mini_bus: "ميني باص",
      car: "سيارة",
      train: "قطار",
      plane: "طائرة",
      boat: "قارب",
      taxi: "تاكسي",
      bus: "باص",
      other: "وسيلة نقل",
    };

    return (
      labels[type] ||
      type ||
      "وسيلة نقل"
    );
  };

  // ========================================================
  // PRICE
  // ========================================================

  const formatPrice = (value) => {
    const number = Number(value);

    if (Number.isNaN(number)) {
      return "0";
    }

    return number.toLocaleString("ar-SY");
  };

  // ========================================================
  // STATUS
  // ========================================================

  const getStatusLabel = (status) => {
    const labels = {
      upcoming: "قادمة",
      ongoing: "جارية",
      completed: "مكتملة",
      cancelled: "ملغاة",
    };

    return labels[status] || null;
  };

  // ========================================================
  // VALUES
  // ========================================================

  const formattedDate =
    formatDate(tripDate);

  const transportationLabel =
    getTransportationLabel(
      transportationType
    );

  const statusLabel =
    getStatusLabel(trip.status);

  // ========================================================
  // CLICK
  // ========================================================

  const handleCardClick = () => {
    if (typeof onClick === "function") {
      onClick(trip);
    }
  };

  const handleKeyDown = (event) => {
    if (
      event.key === "Enter" ||
      event.key === " "
    ) {
      event.preventDefault();
      handleCardClick();
    }
  };

  // ========================================================
  // RENDER
  // ========================================================

  return (
    <article
      className="trip-card"
      onClick={handleCardClick}
      onKeyDown={handleKeyDown}
      tabIndex={onClick ? 0 : undefined}
      role={onClick ? "button" : undefined}
    >
      {/* ====================================================
          IMAGE
      ==================================================== */}

      <div className="card-image-container">
        {imageUrl && !imageFailed ? (
          <img
            src={imageUrl}
            alt={title}
            className="trip-card-img"
            loading="lazy"
            onError={() => {
              console.error(
                "FAILED TO LOAD TRIP IMAGE:",
                imageUrl
              );

              setImageFailed(true);
            }}
          />
        ) : (
          <div
            className="image-placeholder"
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#999",
              fontSize: "28px",
            }}
          >
            <FiImage />
          </div>
        )}

        {statusLabel && (
          <span className="badge-category">
            {statusLabel}
          </span>
        )}
      </div>

      {/* ====================================================
          CONTENT
      ==================================================== */}

      <div className="card-content">
        {/* Header */}
        <div className="card-header-row">
          <h3 className="trip-card-title">
            {title}
          </h3>

          {rating > 0 && (
            <div className="trip-rating">
              <span>
                ★
              </span>

              {rating.toFixed(1)}

              {reviewsCount > 0 && (
                <small>
                  ({reviewsCount})
                </small>
              )}
            </div>
          )}
        </div>

        {/* Description */}
        {description && (
          <p className="trip-card-description">
            {description}
          </p>
        )}

        {/* ==================================================
            DETAILS
        ================================================== */}

        <div className="trip-details-grid trip-details-grid-listing">
          {formattedDate && (
            <div className="detail-item">
              <FiCalendar className="detail-icon" />

              <span>
                {formattedDate}
              </span>
            </div>
          )}

          {duration !== null &&
            duration !== undefined &&
            duration !== "" && (
              <div className="detail-item">
                <FiClock className="detail-icon" />

                <span>
                  {duration}
                </span>
              </div>
            )}

          {transportationType && (
            <div className="detail-item">
              <span className="detail-icon">
                🚍
              </span>

              <span>
                {transportationLabel}
              </span>
            </div>
          )}

          {meetingPoint && (
            <div className="detail-item">
              <FiMapPin className="detail-icon" />

              <span>
                {meetingPoint}
              </span>
            </div>
          )}

          <div className="detail-item">
            <FiUsers className="detail-icon" />

            <span>
              {availableSeats}

              {maxParticipants > 0
                ? ` / ${maxParticipants}`
                : ""}{" "}
              مقعد
            </span>
          </div>
        </div>

        {/* ==================================================
            PRICE
        ================================================== */}

        <div className="trip-price">
          <span>
            السعر للفرد
          </span>

          <span>
            <strong>
              {formatPrice(price)}
            </strong>{" "}
            <small>
              ل.س
            </small>
          </span>
        </div>

        {/* ==================================================
            ACTIONS
        ================================================== */}

        <div className="card-actions">
          <button
            type="button"
            className="btn-book-now"
            onClick={(event) => {
              event.stopPropagation();

              if (
                typeof onClick ===
                "function"
              ) {
                onClick(trip);
              }
            }}
          >
            احجز الآن
          </button>

         <button
            type="button"
            className="btn-view-trip"
            onClick={(event) => {
              event.stopPropagation();
              navigate(`/trips/${trip.id}`);
            }}
          >
            عرض الرحلة
          </button>
        </div>
      </div>
    </article>
  );
}

export default TripCard;