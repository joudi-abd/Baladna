import React, { useMemo, useRef, useState } from "react";
import { FiSliders } from "react-icons/fi";

import Header from "../components/Header";
import Footer from "../components/Footer";
import BookingsHero from "../components/BookingsHero";
import BookingStatusTabs from "../components/BookingStatusTabs";
import BookingCard from "../components/BookingCard";
import Pagination from "../components/Pagination";
import TripReviewModal from "../components/TripReviewModal";

import { bookingsByStatus, bookingStatusLabels } from "../data/bookingsMockData";

import "../styles/MyBookings.css";

const PAGE_SIZE = 4;

function MyBookings() {
  const [activeStatus, setActiveStatus] = useState("upcoming");
  const [sortBy, setSortBy] = useState("date");
  const [currentPage, setCurrentPage] = useState(1);

  // حالة نافذة "تقييم الرحلة": الحجز الحالي قيد التقييم + التقييمات المُرسلة خلال هذه الجلسة
  // { [bookingId]: { rating, comment, createdAt } } - مخزّن أمامي مؤقت لحين ربط API حقيقي
  const [reviewBooking, setReviewBooking] = useState(null);
  const [reviews, setReviews] = useState({});
  const reviewTriggerRef = useRef(null);

  // معرّفات الحجوزات "القادمة" التي أُلغيت خلال هذه الجلسة (تخزين أمامي مؤقت لحين ربط API حقيقي)
  const [cancelledIds, setCancelledIds] = useState(() => new Set());

  const handleCancelBooking = (booking) => {
    const confirmed = window.confirm(
      `هل أنت متأكد من إلغاء حجز "${booking.title}"؟`
    );

    if (!confirmed) return;

    setCancelledIds((previous) => new Set(previous).add(booking.id));
    setCurrentPage(1);
  };

  const handleOpenReview = (booking, event) => {
    reviewTriggerRef.current = event.currentTarget;
    setReviewBooking(booking);
  };

  const handleCloseReview = () => {
    setReviewBooking(null);
    // نُركّز فورًا على الزر المُشغِّل بدل الاعتماد على requestAnimationFrame،
    // الذي لا يُطلَق إطلاقًا إن كانت التبويبة غير ظاهرة (خلفية/مخفية)
    reviewTriggerRef.current?.focus();
  };

  const handleSubmitReview = ({ rating, comment }) => {
    setReviews((previous) => ({
      ...previous,
      [reviewBooking.id]: {
        bookingId: reviewBooking.id,
        tripId: reviewBooking.tripId,
        rating,
        comment,
        createdAt: new Date().toISOString(),
      },
    }));

    handleCloseReview();
  };

  const handleStatusChange = (status) => {
    setActiveStatus(status);
    setCurrentPage(1);
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
    setCurrentPage(1);
  };

  // نطبّق حالات الإلغاء المحلية فوق البيانات الوهمية دون تعديلها مباشرة:
  // نستثني الحجوزات المُلغاة من "القادمة"، ونعرضها ضمن "الملغاة" بجانب البيانات الثابتة
  const bookingsForStatus = useMemo(() => {
    if (activeStatus === "upcoming") {
      return bookingsByStatus.upcoming.filter(
        (booking) => !cancelledIds.has(booking.id)
      );
    }

    if (activeStatus === "cancelled") {
      const newlyCancelled = bookingsByStatus.upcoming
        .filter((booking) => cancelledIds.has(booking.id))
        .map((booking) => ({ ...booking, status: "cancelled" }));

      return [...newlyCancelled, ...bookingsByStatus.cancelled];
    }

    return bookingsByStatus[activeStatus];
  }, [activeStatus, cancelledIds]);

  const sortedBookings = useMemo(() => {
    const bookings = [...bookingsForStatus];

    if (sortBy === "rating") {
      bookings.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "price") {
      const toNumber = (price) => Number(price.replace(/,/g, ""));
      bookings.sort((a, b) => toNumber(b.totalPrice) - toNumber(a.totalPrice));
    }

    return bookings;
  }, [bookingsForStatus, sortBy]);

  const lastPage = Math.max(1, Math.ceil(sortedBookings.length / PAGE_SIZE));

  const visibleBookings = sortedBookings.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const { heading, subtitle } = bookingStatusLabels[activeStatus];

  return (
    <div className="mybookings-page">
      <Header />

      <BookingsHero />

      <div className="booking-tabs-wrapper">
        <BookingStatusTabs activeStatus={activeStatus} onChange={handleStatusChange} />
      </div>

      <main className="booking-main">
        <div className="booking-list-header">
          <div className="booking-list-heading">
            <h2>{heading}</h2>
            <p>{subtitle}</p>
          </div>

          <label className="booking-sort">
            <FiSliders />
            <span>ترتيب حسب</span>
            <select value={sortBy} onChange={handleSortChange}>
              <option value="date">الأحدث</option>
              <option value="rating">التقييم</option>
              <option value="price">السعر</option>
            </select>
          </label>
        </div>

        {visibleBookings.length === 0 ? (
          <div className="booking-empty">لا توجد حجوزات في هذا القسم حاليًا.</div>
        ) : (
          <div className="booking-list">
            {visibleBookings.map((booking) => (
              <BookingCard
                key={booking.id}
                booking={booking}
                onRate={handleOpenReview}
                onCancel={handleCancelBooking}
                isReviewed={Boolean(reviews[booking.id])}
              />
            ))}
          </div>
        )}

        <Pagination
          currentPage={currentPage}
          lastPage={lastPage}
          onPageChange={setCurrentPage}
        />
      </main>

      <Footer />

      {reviewBooking && (
        <TripReviewModal
          key={reviewBooking.id}
          booking={reviewBooking}
          existingReview={reviews[reviewBooking.id]}
          onClose={handleCloseReview}
          onSubmit={handleSubmitReview}
        />
      )}
    </div>
  );
}

export default MyBookings;
