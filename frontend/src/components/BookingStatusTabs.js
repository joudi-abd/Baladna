import React from "react";
import { FiCalendar, FiCheckCircle, FiXCircle } from "react-icons/fi";

const TABS = [
  { key: "upcoming", label: "الحجوزات القادمة", icon: FiCalendar },
  { key: "completed", label: "الحجوزات المكتملة", icon: FiCheckCircle },
  { key: "cancelled", label: "الحجوزات الملغاة", icon: FiXCircle },
];

// شريط تبويب حالة الحجوزات، قابل لإعادة الاستخدام في أي مكان يحتاج تصفية حجوزات حسب الحالة
function BookingStatusTabs({ activeStatus, onChange }) {
  return (
    <div className="booking-status-tabs">
      {TABS.map(({ key, label, icon: Icon }) => (
        <button
          key={key}
          type="button"
          className={`booking-status-tab ${activeStatus === key ? "active" : ""}`}
          onClick={() => onChange(key)}
        >
          <Icon />
          {label}
        </button>
      ))}
    </div>
  );
}

export default BookingStatusTabs;
