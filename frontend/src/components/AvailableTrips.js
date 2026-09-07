import React from "react";
import { Link } from "react-router-dom";
import { FiChevronLeft } from "react-icons/fi";
import SectionHeading from "./SectionHeading";
import HomeTripCard from "./HomeTripCard";
import { availableTrips } from "../data/homeMockData";

function AvailableTrips() {
  return (
    <section className="home-section">
      <SectionHeading
        title="الرحلات المتاحة"
        subtitle="رحلات سياحية منوعة تجمع بين أبرز الوجهات والخدمات لتمنحك تجربة مميزة ومختلفة"
        showArrows
      />

      <div className="home-cards-grid">
        {availableTrips.map((trip, index) => (
          <HomeTripCard key={`${trip.id}-${index}`} trip={trip} />
        ))}
      </div>

      <div className="section-button">
        <Link to="/trips" className="green-button">
          عرض جميع الرحلات
          <FiChevronLeft />
        </Link>
      </div>
    </section>
  );
}

export default AvailableTrips;
