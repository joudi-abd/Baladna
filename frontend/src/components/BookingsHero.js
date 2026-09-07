import React from "react";
import { FiCalendar, FiCheckCircle, FiXCircle } from "react-icons/fi";
import { bookingsCounts } from "../data/bookingsMockData";

const SUMMARY_ITEMS = [
  { key: "upcoming", icon: FiCalendar, label: "الحجوزات القادمة" },
  { key: "completed", icon: FiCheckCircle, label: "مكتملة" },
  { key: "cancelled", icon: FiXCircle, label: "ملغاة" },
];

function BookingsHero() {
  return (
    <section className="booking-hero">
      <div className="booking-hero-decoration booking-hero-decoration-right" aria-hidden="true"></div>
      <div className="booking-hero-decoration booking-hero-decoration-left" aria-hidden="true"></div>

      <div className="booking-hero-content">
        <h1>حجوزاتي</h1>

        <p>تابع حجوزاتك وراجع رحلاتك القادمة وسجل رحلاتك السابقة من مكان واحد</p>

        <div className="booking-summary-row">
          {SUMMARY_ITEMS.map(({ key, icon: Icon, label }) => (
            <div className="booking-summary-card" key={key}>
              <span className="booking-summary-icon">
                <Icon />
              </span>

              <div className="booking-summary-text">
                <strong>{bookingsCounts[key]} حجوزات</strong>
                <span>{label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default BookingsHero;
