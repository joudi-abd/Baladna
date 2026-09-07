import React from "react";
import { FiImage } from "react-icons/fi";

// كرت مكان مميز يُستخدم في قسم "أماكن مميزة" بالصفحة الرئيسية
function FeaturedPlaceCard({ place }) {
  return (
    <article className="featured-place-card">
      <div className="featured-place-image">
        {place.image ? (
          <img src={place.image} alt={place.name} />
        ) : (
          <div className="image-placeholder">
            <FiImage />
          </div>
        )}
      </div>

      <div className="featured-place-content">
        <h3>{place.name}</h3>

        <p>{place.description}</p>

        <div className="featured-place-tags">
          {place.tags.map((tag) => (
            <span className="place-tag" key={tag}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

export default FeaturedPlaceCard;
