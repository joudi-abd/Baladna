import React, { useEffect, useState } from "react";
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

import { formatSYP } from "../utils/formatCurrency";
import { formatBookingDate } from "../utils/formatBookingDate";
import { apiRequest } from "../api/api";

import "../styles/BookingConfirmation.css";


const NOTES_MAX_LENGTH = 120;

const BookingConfirmation = () => {
  const { tripId } = useParams();
  const navigate = useNavigate();

  const [trip, setTrip] = useState(null);

  const [loadingTrip, setLoadingTrip] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);

  const [error, setError] = useState(null);
  const [bookingError, setBookingError] = useState("");

  const [participantCount, setParticipantCount] = useState(2);
  const [notes, setNotes] = useState("");

  /*
   * ==========================================
   * GET /trips/{tripId}
   * ==========================================
   */
  useEffect(() => {
    let cancelled = false;

    const fetchTrip = async () => {
      setLoadingTrip(true);
      setError("");

      try {
        console.log("Booking tripId:", tripId);

        const url = `/trips/${tripId}`;

        console.log("Requesting:", url);

        const response = await apiRequest(url, {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        });

        console.log("Trip response status:", response.status);

        const data = await response.data

        console.log("Trip response body:", data);

        if (cancelled) return;

        if (!response.ok) {
          setError(data?.message || `فشل تحميل الرحلة (${response.status})`);

          setTrip(null);
          return;
        }

        const apiTrip = data?.data;

        if (!apiTrip) {
          setError("API لم يرجع بيانات الرحلة");
          setTrip(null);
          return;
        }

        const normalizedTrip = {
          ...apiTrip,

          id: apiTrip.id,

          title: apiTrip.title || "رحلة بدون اسم",

          description: apiTrip.description || "",

          unitPrice: Number(apiTrip.price || 0),

          tripDate: apiTrip.trip_date || null,

          availableSeats: Number(
            apiTrip.available_seats ?? apiTrip.max_participants ?? 1,
          ),

          meetingPoint: apiTrip.meeting_point || "غير محددة",

          duration: apiTrip.duration || "",

          transportationType: apiTrip.transportation_type || "",

          ratingAvg: Number(apiTrip.rating_avg || 0),

          reviewsCount: Number(apiTrip.reviews_count || 0),

          coverImage: apiTrip.cover_image || null,

          places: Array.isArray(apiTrip.places) ? apiTrip.places : [],
        };

        console.log("Normalized trip:", normalizedTrip);

        setTrip(normalizedTrip);

        setParticipantCount((current) =>
          Math.min(
            Math.max(1, current),
            Math.max(1, normalizedTrip.availableSeats),
          ),
        );
      } catch (err) {
        console.error("Trip request failed:", err);

        if (!cancelled) {
          setError(err?.message || "تعذر الاتصال بالخادم");

          setTrip(null);
        }
      } finally {
        if (!cancelled) {
          setLoadingTrip(false);
        }
      }
    };

    if (!tripId) {
      setError("معرّف الرحلة غير موجود");
      setTrip(null);
      setLoadingTrip(false);
      return;
    }

    fetchTrip();

    return () => {
      cancelled = true;
    };
  }, [tripId]);

  /*
   * ==========================================
   * Loading
   * ==========================================
   */
  if (loadingTrip) {
    return (
      <>
        <Header />

        <div className="booking-confirmation-error">
          <h2>جاري تحميل تفاصيل الرحلة...</h2>
        </div>

        <Footer />
      </>
    );
  }

  /*
   * ==========================================
   * Not Found / Error
   * ==========================================
   */
  if (!trip) {
    return (
      <>
        <Header />

        <div className="booking-confirmation-error">
          <h2>{error || "لم يتم العثور على الرحلة"}</h2>

          <Link to="/trips">العودة إلى الرحلات</Link>
        </div>

        <Footer />
      </>
    );
  }

  /*
   * ==========================================
   * Booking calculations
   * ==========================================
   */

  const maxParticipants = Math.max(1, Number(trip.availableSeats || 1));

  const unitPrice = Number(trip.unitPrice || 0);

  const totalPrice = unitPrice * participantCount;

  const formattedDate = formatBookingDate(trip.tripDate);

  /*
   * ==========================================
   * Participants
   * ==========================================
   */

  const decrementParticipants = () => {
    setParticipantCount((count) => Math.max(1, count - 1));
  };

  const incrementParticipants = () => {
    setParticipantCount((count) => Math.min(maxParticipants, count + 1));
  };

  /*
   * ==========================================
   * POST /bookings
   * ==========================================
   */
  const handleConfirmBooking = async () => {
  if (bookingLoading) return;

  setBookingLoading(true);
  setBookingError("");

  try {
    const token = localStorage.getItem("token");

    if (!token) {
      setBookingError("يجب تسجيل الدخول أولاً لإتمام الحجز.");
      return;
    }

    console.log("Booking token exists:", Boolean(token));
    console.log("Booking trip id:", trip.id);
    console.log("Booking participants:", participantCount);

    const response = await apiRequest("/bookings", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${token}`,
      },

      body: JSON.stringify({
        trip_id: Number(trip.id),
        participants_count: participantCount,
        notes: notes.trim(),
      }),
    });

    const data = response.data;

    console.log("Booking response status:", response.status);
    console.log("Booking response:", data);

    if (!response.ok) {
      const message =
        data?.message ||
        data?.errors?.participants_count?.[0] ||
        data?.errors?.trip_id?.[0] ||
        "تعذر إنشاء الحجز.";

      setBookingError(message);
      return;
    }

    const booking = data?.data;

    navigate(`/booking/${trip.id}/payment`, {
      state: {
        tripId: trip.id,
        participantCount,
        participantsCount: participantCount,
        notes,
        unitPrice,
        totalPrice,
        booking,
        trip,
      },
    });
  } catch (err) {
    console.error("Failed to create booking:", err);

    setBookingError(
      err?.message || "حدث خطأ أثناء إنشاء الحجز."
    );
  } finally {
    setBookingLoading(false);
  }
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

            <div
              className="booking-title-decoration-line"
              aria-hidden="true"
            ></div>

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
                disabled={participantCount <= 1 || bookingLoading}
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
                disabled={participantCount >= maxParticipants || bookingLoading}
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
              disabled={bookingLoading}
              onChange={(event) => setNotes(event.target.value)}
            />

            <div className="booking-notes-counter">
              {NOTES_MAX_LENGTH}/{notes.length}
            </div>

            <div className="booking-privacy-notice">
              <FiShield />
              بياناتك محمية ويتم استخدامها للحجز فقط.
            </div>

            {bookingError && (
              <div className="booking-error-message" role="alert">
                {bookingError}
              </div>
            )}

            <button
              type="button"
              className="btn-confirm-booking"
              onClick={handleConfirmBooking}
              disabled={bookingLoading}
            >
              <FiArrowUpLeft />

              {bookingLoading ? "جاري إنشاء الحجز..." : "تأكيد الحجز والدفع"}
            </button>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default BookingConfirmation;
