import React from "react";
import { FiCalendar, FiTag, FiUsers } from "react-icons/fi";
import { FaBus } from "react-icons/fa6";

const ICONS = {
  duration: FiCalendar,
  price: FiTag,
  transport: FaBus,
  participants: FiUsers,
};

// بطاقة ملخص صغيرة قابلة لإعادة الاستخدام (مدة الرحلة / السعر / وسيلة النقل / المشاركون)
function TripStatCard({ icon, label, value }) {
  const Icon = ICONS[icon] || FiTag;

  return (
    <div className="trip-stat-card">
      <span className="trip-stat-icon">
        <Icon />
      </span>

      <div className="trip-stat-text">
        <span className="trip-stat-label">{label}</span>
        <strong className="trip-stat-value">{value}</strong>
      </div>
    </div>
  );
}

export default TripStatCard;
