import React from "react";
import { FiFileText, FiImage, FiCalendar, FiClock, FiUsers, FiInfo } from "react-icons/fi";

import { formatSYP } from "../utils/formatCurrency";

// ملخص الحجز القابل لإعادة الاستخدام عبر خطوات الحجز (تأكيد الحجز والدفع)
// القيم كلها مشتقة من حالة الحجز الحالية + بيانات الرحلة الموحّدة، وليست مكررة محليًا
function BookingSummary({ trip, participantCount, formattedDate }) {
  const totalPrice = trip.unitPrice * participantCount;

  return (
    <aside className="booking-summary-panel">

      <h2 className="booking-card-heading">
        <FiFileText /> ملخص الحجز
      </h2>

      <div className="booking-summary-image">
        {trip.image ? (
          <img src={trip.image} alt={trip.heroTitle} />
        ) : (
          <div className="image-placeholder">
            <FiImage />
          </div>
        )}
      </div>

      <h3 className="booking-summary-title">{trip.heroTitle}</h3>

      <div className="booking-summary-meta">
        <div className="booking-summary-meta-row">
          <span>
            <FiCalendar /> التاريخ
          </span>
          <strong>{formattedDate}</strong>
        </div>

        <div className="booking-summary-meta-row">
          <span>
            <FiClock /> المدة
          </span>
          <strong>{trip.durationLabel}</strong>
        </div>

        <div className="booking-summary-meta-row">
          <span>
            <FiUsers /> المشاركون
          </span>
          <strong>{participantCount} أشخاص</strong>
        </div>
      </div>

      <h3 className="booking-summary-subheading">تفاصيل السعر</h3>

      <div className="booking-summary-price-row">
        <span>سعر الرحلة للفرد</span>
        <span>{formatSYP(trip.unitPrice)}</span>
      </div>

      <div className="booking-summary-price-row">
        <span>عدد المشاركين</span>
        <span>x {participantCount}</span>
      </div>

      <div className="booking-summary-total-row">
        <span>السعر الإجمالي</span>
        <strong>{formatSYP(totalPrice)}</strong>
      </div>

      <div className="booking-warning-panel">
        <div className="booking-warning-heading">
          <FiInfo /> مهم
        </div>

        <p>لن يتم تأكيد حجزك إلا بعد التحقق من الدفع</p>
      </div>

    </aside>
  );
}

export default BookingSummary;
