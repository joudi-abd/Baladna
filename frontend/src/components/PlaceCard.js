import React from "react";
import { Link } from "react-router-dom";

function PlaceCard({ place, cities, categories }) {
  const city = cities.find((item) => item.id === place.city_id);
  const category = categories.find(
    (item) => item.id === place.category_id
  );

  return (
    <article className="place-card">

      {/* صورة المكان */}
      <div className="place-card-image">

        <img
          src={
            place.cover_image ||
            "https://via.placeholder.com/600x400"
          }
          alt={place.name}
        />

        {/* المدينة */}
        <span className="place-city-badge">
          {city?.name || "سوريا"}
        </span>

        {/* المفضلة */}
        <button
          type="button"
          className="place-favorite-button"
          aria-label="إضافة إلى المفضلة"
        >
          ♡
        </button>

      </div>

      {/* محتوى الكرت */}
      <div className="place-card-content">

        <h3 className="place-card-title">
          {place.name}
        </h3>

        {/* نوع المكان والتقييم */}
        <div className="place-card-info">

          {category && (
            <span className="place-category">
              {category.name}
            </span>
          )}

          <span className="place-rating">
            ★ {Number(place.rating_avg || 0).toFixed(1)}
          </span>

          <span className="place-reviews">
            ({place.reviews_count || 0})
          </span>

        </div>

        {/* الوصف */}
        <p className="place-card-description">
          {place.description ||
            "اكتشف هذا المكان السياحي واستمتع بتجربة مميزة."}
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