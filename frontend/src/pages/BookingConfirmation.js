import React, { useMemo, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  FiMapPin,
  FiSend,
  FiInfo,
  FiShield,
  FiArrowUpLeft,
  FiMinus,
  FiPlus,
} from "react-icons/fi";

import Header from "../components/Header";
import Footer from "../components/Footer";
import BookingStepper from "../components/BookingStepper";
import TripBookingPreview from "../components/TripBookingPreview";
import BookingSummary from "../components/BookingSummary";

import { getTripDetails } from "../data/tripDetailsMockData";
import { formatSYP } from "../utils/formatCurrency";
import { formatBookingDate } from "../utils/formatBookingDate";

import "../styles/BookingConfirmation.css";

const NOTES_MAX_LENGTH = 120;

const BookingConfirmation = () => {
  const { tripId } = useParams();
  const navigate = useNavigate();

  const trip = useMemo(() => getTripDetails(tripId), [tripId]);

  const [participantCount, setParticipantCount] = useState(2);
  const [notes, setNotes] = useState("");

  if (!trip) {
    return (
      <>
        <Header />

        <div className="booking-confirmation-error">
          <h2>لم يتم العثور على الرحلة</h2>
          <Link to="/trips">العودة إلى الرحلات</Link>
        </div>

        <Footer />
      </>
    );
  }

  const maxParticipants = trip.availableSeats || 1;
  const unitPrice = trip.unitPrice;
  const totalPrice = unitPrice * participantCount;
  const formattedDate = formatBookingDate(trip.tripDate);

  const decrementParticipants = () => {
    setParticipantCount((count) => Math.max(1, count - 1));
  };

  const incrementParticipants = () => {
    setParticipantCount((count) => Math.min(maxParticipants, count + 1));
  };

  const handleConfirmBooking = () => {
    navigate(`/booking/${trip.id}/payment`, {
      state: {
        tripId: trip.id,
        participantCount,
        notes,
        unitPrice,
        totalPrice,
      },
    });
  };

  return (
    <>
      <Header />

      <main className="booking-confirmation-page">

        {/* =========================
            TOP: BREADCRUMB + TITLE + STEPPER
        ========================= */}

        <section className="booking-confirmation-top">

          <nav className="breadcrumb booking-confirmation-breadcrumb">
            <Link to="/home">الرئيسية</Link>

            <Link to="/trips" className="breadcrumb-pill">
              الرحلات
            </Link>

            <Link to={`/trips/${trip.id}`} className="breadcrumb-pill">
              تفاصيل الرحلة
            </Link>

            <span className="breadcrumb-pill breadcrumb-pill-active">
              تأكيد الحجز
            </span>
          </nav>

          <div className="booking-title-block">
            <FiMapPin className="booking-title-decoration-icon booking-title-pin" />

            <div className="booking-title-decoration-line" aria-hidden="true"></div>

            <FiSend className="booking-title-decoration-icon booking-title-plane" />

            <h1>تأكيد حجز الرحلة</h1>
            <p>أكمل بيانات الحجز وتأكد من تفاصيل رحلتك قبل الانتقال للدفع .</p>
          </div>

          <BookingStepper activeStep={1} />

        </section>

        {/* =========================
            MAIN GRID
        ========================= */}

        <div className="booking-main-grid">

          {/* =========================
              BOOKING SUMMARY
              (أول عنصر في DOM كي يظهر على يمين الصفحة في RTL،
              مطابقًا لموضعه في التصميم المرجعي)
          ========================= */}

          <BookingSummary
            trip={trip}
            participantCount={participantCount}
            formattedDate={formattedDate}
          />

          {/* =========================
              BOOKING INFORMATION
          ========================= */}

          <section className="booking-info-card">

            <h2 className="booking-card-heading">
              <FiInfo /> معلومات الحجز
            </h2>

            <h3 className="booking-field-label">اسم الرحلة</h3>

            <TripBookingPreview trip={trip} formattedDate={formattedDate} />

            <h3 className="booking-field-label">عدد المشاركين</h3>

            <div className="participant-counter">
              <button
                type="button"
                onClick={decrementParticipants}
                disabled={participantCount <= 1}
                aria-label="إنقاص عدد المشاركين"
              >
                <FiMinus />
              </button>

              <div className="participant-count-value">
                {participantCount} أشخاص
              </div>

              <button
                type="button"
                onClick={incrementParticipants}
                disabled={participantCount >= maxParticipants}
                aria-label="زيادة عدد المشاركين"
              >
                <FiPlus />
              </button>
            </div>

            <p className="participant-helper">
              الحد الأقصى للمشاركين هو {maxParticipants} شخصاً
            </p>

            <div className="booking-price-panel">
              <div className="booking-price-col">
                <span>السعر الإجمالي</span>
                <strong>{formatSYP(totalPrice)}</strong>
              </div>

              <div className="booking-price-col">
                <span>السعر للفرد</span>
                <strong>{formatSYP(unitPrice)}</strong>
              </div>
            </div>

            <h3 className="booking-field-label">ملاحظات إضافية (اختياري)</h3>

            <textarea
              className="booking-notes-input"
              value={notes}
              maxLength={NOTES_MAX_LENGTH}
              placeholder="اكتب الملاحظات التي تود إضافتها مع حجزك"
              onChange={(event) => setNotes(event.target.value)}
            />

            <div className="booking-notes-counter">
              {NOTES_MAX_LENGTH}/{notes.length}
            </div>

            <div className="booking-privacy-notice">
              <FiShield />
              بياناتك محمية ويتم استخدامها للحجز فقط.
            </div>

            <button
              type="button"
              className="btn-confirm-booking"
              onClick={handleConfirmBooking}
            >
              <FiArrowUpLeft />
              تأكيد الحجز والدفع
            </button>

          </section>

        </div>

      </main>

      <Footer />
    </>
  );
};

export default BookingConfirmation;
