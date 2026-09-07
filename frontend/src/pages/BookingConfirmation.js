import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../styles/bookingConfirmation.css";
import Footer from "../components/Footer";
import travel from "../assets/travel.jpg";
import logo from "../assets/Logo.png";

const API_URL = "http://127.0.0.1:8000/api";

function BookingConfirmation() {

  const navigate = useNavigate();
  const location = useLocation();

  // ==========================================
  // أخذ trip_id و cityId من الرابط
  // ==========================================

  const searchParams = new URLSearchParams(location.search);

  const tripId = searchParams.get("trip_id");
  const cityIdFromUrl = searchParams.get("cityId");

  // ==========================================
  // States
  // ==========================================

  const [trip, setTrip] = useState(null);
  const [cityName, setCityName] = useState("غير محدد");

  const [people, setPeople] = useState(2);
  const [notes, setNotes] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ==========================================
  // جلب بيانات الرحلة
  // ==========================================

  useEffect(() => {

    const fetchTripData = async () => {

      if (!tripId) {
        setError("لم يتم تحديد الرحلة.");
        setLoading(false);
        return;
      }

      try {

        setLoading(true);

        // جلب الرحلة والمدن معًا
        const [tripResponse, citiesResponse] =
          await Promise.all([
            fetch(`${API_URL}/trips/${tripId}`),
            fetch(`${API_URL}/cities`)
          ]);

        if (!tripResponse.ok) {
          throw new Error("فشل في جلب بيانات الرحلة");
        }

        if (!citiesResponse.ok) {
          throw new Error("فشل في جلب بيانات المدن");
        }

        const tripResult = await tripResponse.json();
        const citiesResult = await citiesResponse.json();

        const tripData = tripResult.data;
        const citiesData = citiesResult.data || [];

        console.log("BOOKING TRIP:", tripData);
        console.log("BOOKING CITIES:", citiesData);

        setTrip(tripData);

        // ==========================================
        // تحديد المدينة
        // ==========================================

        let cityId = tripData?.city_id;

        // إذا لم يوجد city_id داخل الرحلة
        if (cityId === undefined || cityId === null) {
          cityId = tripData?.places?.[0]?.city_id;
        }

        // إذا لم يوجد نأخذ cityId من الرابط
        if (cityId === undefined || cityId === null) {
          cityId = cityIdFromUrl;
        }

        console.log("BOOKING CITY ID:", cityId);

        const foundCity = citiesData.find(
          (city) =>
            Number(city.id) === Number(cityId)
        );

        console.log("BOOKING FOUND CITY:", foundCity);

        if (foundCity) {
          setCityName(foundCity.name);
        } else {
          setCityName("غير محدد");
        }

        // ==========================================
        // تحديد عدد المشاركين الابتدائي
        // ==========================================

        setPeople(2);

      } catch (err) {

        console.error(
          "Error fetching booking data:",
          err
        );

        setError(
          err.message ||
          "حدث خطأ أثناء جلب بيانات الرحلة"
        );

      } finally {

        setLoading(false);

      }
    };

    fetchTripData();

  }, [tripId, cityIdFromUrl]);


  // ==========================================
  // زيادة عدد الأشخاص
  // ==========================================

  const increasePeople = () => {

    if (!trip) return;

    const availableSeats =
      Number(trip.available_seats) || 1;

    if (people < availableSeats) {
      setPeople(people + 1);
    }

  };


  // ==========================================
  // إنقاص عدد الأشخاص
  // ==========================================

  const decreasePeople = () => {

    if (people > 1) {
      setPeople(people - 1);
    }

  };


  // ==========================================
  // السعر للفرد
  // ==========================================

  const pricePerPerson =
    Number(trip?.price) || 0;


  // ==========================================
  // السعر الإجمالي
  // ==========================================

  const totalPrice =
    people * pricePerPerson;


  // ==========================================
  // التاريخ
  // ==========================================

  const formattedDate = trip?.trip_date
    ? new Date(
        trip.trip_date
      ).toLocaleDateString(
        "ar-SY",
        {
          year: "numeric",
          month: "long",
          day: "numeric"
        }
      )
    : "غير محدد";


  // ==========================================
  // المدة
  // ==========================================

  const duration = trip?.duration
    ? `${trip.duration} أيام`
    : "غير محددة";


  // ==========================================
  // تأكيد الحجز
  // ==========================================

  const handleBooking = () => {

    /*
      لاحقًا هون منربط POST Booking API
    */

    navigate(
      `/payment?trip_id=${tripId}&people=${people}`
    );

  };


  // ==========================================
  // Loading
  // ==========================================

  if (loading) {

    return (
      <div
        className="booking-page"
        dir="rtl"
      >

        <div className="booking-header">

          <h1>
            تأكيد حجز الرحلة
          </h1>

          <p>
            جاري تحميل بيانات الرحلة...
          </p>

        </div>

      </div>
    );

  }


  // ==========================================
  // Error
  // ==========================================

  if (error) {

    return (
      <div
        className="booking-page"
        dir="rtl"
      >

        <div className="booking-header">

          <h1>
            حدث خطأ
          </h1>

          <p>
            {error}
          </p>

          <Link
            to="/trips"
            className="back-to-trips"
          >
            العودة إلى الرحلات
          </Link>

        </div>

      </div>
    );

  }


  // ==========================================
  // الصفحة
  // ==========================================

  return (
    <div
      className="booking-page"
      dir="rtl"
    >

      {/* ==========================================
          Navbar
      ========================================== */}

      <nav className="booking-navbar">

        <div className="navbar-logo">

          <img
            src={logo}
            alt="Logo"
            className="logo-image"
          />

        </div>


        <div className="navbar-links">

          <Link to="/home">
            الرئيسية
          </Link>

          <Link to="/Exploration">
            استكشاف
          </Link>

          <Link to="/trips">
            الرحلات
          </Link>

          <Link to="/bookings">
            حجوزاتي
          </Link>

          <Link to="/about">
            من نحن
          </Link>

        </div>


        <div className="navbar-buttons">

          <Link
            to="/login"
            className="login-btn"
          >
            تسجيل الدخول
          </Link>

          <Link
            to="/BookingConfirmation"
            className="book-btn"
          >
            احجز رحلتك
          </Link>

        </div>

      </nav>


{/* Breadcrumb */}
<div className="booking-breadcrumb">

  <Link to="/home" className="breadcrumb-item">
    الرئيسية
  </Link>

  <span className="breadcrumb-arrow">←</span>

  <Link to="/trips" className="breadcrumb-item">
    الرحلات
  </Link>

  <span className="breadcrumb-arrow">←</span>

  <Link to="/trips" className="breadcrumb-item">
    تفاصيل الرحلة
  </Link>

  <span className="breadcrumb-arrow">←</span>

  <div className="breadcrumb-item active">
    تأكيد الحجز
  </div>

</div>


      {/* ==========================================
          Header
      ========================================== */}

      <section className="booking-header">

        <h1>
          تأكيد حجز الرحلة
        </h1>

        <p>
          أكمل بيانات الحجز وتأكد من تفاصيل رحلتك قبل الانتقال للدفع.
        </p>

      </section>


      {/* ==========================================
          Steps
      ========================================== */}

      <div className="booking-steps">

        <div className="step active">

          <span>
            1
          </span>

          <p>
            تفاصيل الحجز
          </p>

        </div>


        <div className="step">

          <span>
            2
          </span>

          <p>
            الدفع
          </p>

        </div>


        <div className="step">

          <span>
            ✓
          </span>

          <p>
            تم الحجز
          </p>

        </div>

      </div>


      {/* ==========================================
          Main Content
      ========================================== */}

      <main className="booking-content">


        {/* ==========================================
            Booking Information
        ========================================== */}

        <section className="booking-info-card">

          <h2>
            ⓘ معلومات الحجز
          </h2>


          <label>
            اسم الرحلة
          </label>


          <div className="trip-small-card">

            <img
              src={
                trip?.cover_image ||
                travel
              }
              alt={trip?.title || "الرحلة"}
            />


            <div className="trip-small-info">

              <h3>
                {trip?.title || "غير محدد"}
              </h3>


              <div className="trip-details">

                <span>
                  📍 {cityName}
                </span>


                <span>
                  📅 {formattedDate}
                </span>


                <span>
                  ⏱ {duration}
                </span>


                <span>
                  👥 {people} أشخاص
                </span>

              </div>

            </div>


            <div className="trip-rating">

              ⭐ {trip?.rating_avg ?? 0}

            </div>

          </div>


          {/* ==========================================
              People
          ========================================== */}

          <div className="people-section">

            <label>
              عدد المشاركين
            </label>


            <div className="people-counter">

              <button
                onClick={decreasePeople}
                disabled={people <= 1}
              >
                −
              </button>


              <div>

                <strong>
                  {people} أشخاص
                </strong>

              </div>


              <button
                onClick={increasePeople}
                disabled={
                  people >=
                  Number(trip?.available_seats || 1)
                }
              >
                +
              </button>

            </div>


            <small>
              الحد الأقصى للمشاركين في الرحلة{" "}
              {trip?.available_seats || 0} شخصاً
            </small>

          </div>


          {/* ==========================================
              Prices
          ========================================== */}

          <div className="price-box">

            <div>

              <span>
                السعر للفرد
              </span>

              <strong>
                {pricePerPerson.toLocaleString("ar-SY")} ل.س
              </strong>

            </div>


            <div>

              <span>
                السعر الإجمالي
              </span>

              <strong>
                {totalPrice.toLocaleString("ar-SY")} ل.س
              </strong>

            </div>

          </div>


          {/* ==========================================
              Notes
          ========================================== */}

          <div className="notes-section">

            <label>

              ملاحظات إضافية{" "}

              <small>
                (اختياري)
              </small>

            </label>


            <textarea
              placeholder="اكتب الملاحظات التي تود إضافتها مع حجزك"
              value={notes}
              maxLength={120}
              onChange={(e) =>
                setNotes(e.target.value)
              }
            />


            <small>
              {notes.length}/120
            </small>

          </div>


          {/* ==========================================
              Privacy
          ========================================== */}

          <div className="privacy-message">

            🛡 بياناتك محمية ويتم استخدامها للحجز فقط.

          </div>


          {/* ==========================================
              Confirm
          ========================================== */}

          <button
            className="confirm-booking-btn"
            onClick={handleBooking}
          >

            تأكيد الحجز والدفع

            <span>
              ←
            </span>

          </button>

        </section>


        {/* ==========================================
            Summary
        ========================================== */}

        <aside className="booking-summary">

          <h2>
            ▣ ملخص الحجز
          </h2>


          <img
            src={
              trip?.cover_image ||
              travel
            }
            alt={trip?.title || "الرحلة"}
          />


          <h3>
            {trip?.title || "غير محدد"}
          </h3>


          <div className="summary-row">

            <span>
              التاريخ
            </span>

            <strong>
              {formattedDate}
            </strong>

          </div>


          <div className="summary-row">

            <span>
              المدة
            </span>

            <strong>
              {duration}
            </strong>

          </div>


          <div className="summary-row">

            <span>
              المشاركون
            </span>

            <strong>
              {people} أشخاص
            </strong>

          </div>


          <hr />


          <h4>
            تفاصيل السعر
          </h4>


          <div className="summary-row">

            <span>
              سعر الرحلة للفرد
            </span>

            <strong>
              {pricePerPerson.toLocaleString("ar-SY")} ل.س
            </strong>

          </div>


          <div className="summary-row">

            <span>
              عدد المشاركين
            </span>

            <strong>
              × {people}
            </strong>

          </div>


          <hr />


          <div className="total-row">

            <span>
              السعر الإجمالي
            </span>

            <strong>
              {totalPrice.toLocaleString("ar-SY")} ل.س
            </strong>

          </div>


          <div className="warning-box">

            <strong>
              ⓘ مهم
            </strong>

            <p>
              لن يتم تأكيد حجزك إلا بعد التحقق من الدفع.
            </p>

          </div>

        </aside>

      </main>


      {/* ==========================================
          Footer
      ========================================== */}

      <Footer />

    </div>
  );
}

export default BookingConfirmation;