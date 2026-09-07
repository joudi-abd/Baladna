import React from "react";
import { Link } from "react-router-dom";
import { FiChevronLeft } from "react-icons/fi";
import SectionHeading from "./SectionHeading";
import FeaturedPlaceCard from "./FeaturedPlaceCard";
import { featuredPlaces } from "../data/homeMockData";

function Places() {
  return (
    <section className="home-section">
      <SectionHeading
        title="أماكن مميزة"
        subtitle="اكتشف مجموعة من أبرز الوجهات والمعالم السياحية التي نقترحها لتجربة استكشافية لا تُنسى"
        showArrows
      />

      <div className="home-cards-grid">
        {featuredPlaces.map((place, index) => (
          <FeaturedPlaceCard key={`${place.id}-${index}`} place={place} />
        ))}
      </div>

      <div className="section-button">
        <Link to="/exploration" className="green-button">
          عرض جميع الأماكن
          <FiChevronLeft />
        </Link>
      </div>
    </section>
  );
}

export default Places;
