import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiImage, FiMapPin, FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa6";

function PlaceCard({ place }) {
  const [isFavorite, setIsFavorite] = useState(
    Boolean(place.isFavorite)
  );

  const image =
    place.image ||
    place.cover_image ||
    null;

  const city =
    place.city ||
    place.city_name ||
    place.city?.name ||
    "";

  const tags = Array.isArray(place.tags)
    ? place.tags
    : [];

  return (
    <article className="place-card">

      {/* صورة المكان */}
      <div className="place-card-image">

        {image ? (
          <img
            src={image}
            alt={place.name}
          />
        ) : (
          <div className="image-placeholder">
            <FiImage />
          </div>
        )}

        {/* المدينة */}
        <span className="place-city-badge">
          <FiMapPin /> {city}
        </span>

        {/* المفضلة */}
        <button
          type="button"
          className={`place-favorite-button ${
            isFavorite ? "active" : ""
          }`}
          aria-label={
            isFavorite
              ? "إزالة من المفضلة"
              : "إضافة إلى المفضلة"
          }
          aria-pressed={isFavorite}
          onClick={() =>
            setIsFavorite(
              (current) => !current
            )
          }
        >
          {isFavorite ? (
            <FaHeart />
          ) : (
            <FiHeart />
          )}
        </button>

      </div>

      {/* محتوى الكرت */}
      <div className="place-card-content">

        <h3 className="place-card-title">
          {place.name}
        </h3>

        {/* الوسوم */}
        <div className="place-card-tags">
          {tags.map((tag, index) => (
            <span
              className="place-tag"
              key={
                typeof tag === "object"
                  ? tag.id ?? index
                  : tag
              }
            >
              {typeof tag === "object"
                ? tag.name
                : tag}
            </span>
          ))}
        </div>

        {/* الوصف */}
        <p className="place-card-description">
          {place.description}
        </p>

        {/* عرض التفاصيل */}
        <Link
          to={`/places/${place.id}`}
          className="place-card-button"
        >
          عرض التفاصيل
        </Link>

      </div>

    </article>
  );
}

export default PlaceCard;