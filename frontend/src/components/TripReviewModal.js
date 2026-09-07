import React, { useEffect, useMemo, useRef, useState } from "react";
import { FiStar, FiArrowUpLeft } from "react-icons/fi";
import { FaStar } from "react-icons/fa6";

import TripBookingPreview from "./TripBookingPreview";
import { getTripDetails } from "../data/tripDetailsMockData";
import { formatBookingDate } from "../utils/formatBookingDate";

const NOTES_MAX_LENGTH = 120;

const RATING_LABELS = {
  1: "سيئة",
  2: "مقبولة",
  3: "جيدة",
  4: "جيدة جداً",
  5: "ممتازة",
};

const FOCUSABLE_SELECTOR =
  'button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

// نافذة تقييم الرحلة، تُفتح من كرت حجز مكتمل في صفحة "حجوزاتي"
// لا يوجد مسار (route) خاص بها؛ تبقى صفحة حجوزاتي هي المسؤولة عن فتحها وإغلاقها
function TripReviewModal({ booking, existingReview, onClose, onSubmit }) {
  const trip = useMemo(() => getTripDetails(booking.tripId), [booking.tripId]);
  const formattedDate = useMemo(() => formatBookingDate(trip?.tripDate), [trip]);

  const [rating, setRating] = useState(existingReview?.rating ?? 0);
  const [hoverRating, setHoverRating] = useState(0);
  const [notes, setNotes] = useState(existingReview?.comment ?? "");
  const [error, setError] = useState("");

  const modalRef = useRef(null);

  // إغلاق بمفتاح Escape + قفل تمرير الخلفية + نقل التركيز إلى داخل النافذة عند الفتح
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const firstFocusable = modalRef.current?.querySelector(FOCUSABLE_SELECTOR);
    firstFocusable?.focus();

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key === "Tab" && modalRef.current) {
        const focusableEls = modalRef.current.querySelectorAll(FOCUSABLE_SELECTOR);

        if (focusableEls.length === 0) return;

        const first = focusableEls[0];
        const last = focusableEls[focusableEls.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const handleSubmit = () => {
    if (rating === 0) {
      setError("يرجى اختيار تقييم قبل الإرسال.");
      return;
    }

    setError("");
    onSubmit({ rating, comment: notes });
  };

  const displayedRating = hoverRating || rating;

  return (
    <div
      className="trip-review-modal-overlay"
      onClick={handleOverlayClick}
    >
      <div
        className="trip-review-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="trip-review-modal-title"
        ref={modalRef}
      >

        <div className="trip-review-modal-header">
          <FiStar />
          <h2 id="trip-review-modal-title">قيم تجربتك في الرحلة</h2>
        </div>

        <div className="trip-review-modal-body">

          <h3 className="booking-field-label">اسم الرحلة</h3>

          {trip && (
            <TripBookingPreview trip={trip} formattedDate={formattedDate} />
          )}

          <h3 className="review-rating-title">كم تقيم تجربتك في الرحلة</h3>

          <div className="review-rating-stars" role="radiogroup" aria-label="التقييم">
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                type="button"
                role="radio"
                aria-checked={rating === value}
                aria-label={`تقييم ${value} من 5`}
                className={`review-star-btn ${value <= displayedRating ? "is-filled" : ""}`}
                onClick={() => {
                  setRating(value);
                  setError("");
                }}
                onMouseEnter={() => setHoverRating(value)}
                onMouseLeave={() => setHoverRating(0)}
              >
                {value <= displayedRating ? <FaStar /> : <FiStar />}
              </button>
            ))}
          </div>

          <p className="review-rating-label">
            {displayedRating > 0 ? RATING_LABELS[displayedRating] : ""}
          </p>

          <h3 className="booking-field-label">ملاحظات إضافية</h3>

          <textarea
            className="booking-notes-input"
            value={notes}
            maxLength={NOTES_MAX_LENGTH}
            placeholder="اكتب الملاحظات التي تود إضافتها مع تقييمك"
            onChange={(event) => setNotes(event.target.value)}
          />

          <div className="booking-notes-counter">
            {NOTES_MAX_LENGTH}/{notes.length}
          </div>

          <p className={error ? "review-helper-text is-error" : "review-helper-text"}>
            {error || "سيتم نشر تقييمك بعد مراجعته."}
          </p>

          <button
            type="button"
            className="btn-confirm-booking"
            onClick={handleSubmit}
          >
            <FiArrowUpLeft />
            إرسال التقييم
          </button>

        </div>

      </div>
    </div>
  );
}

export default TripReviewModal;
