import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link, useParams, useSearchParams } from "react-router-dom";
import "../styles/TripDetails.css";

const API_URL = "http://127.0.0.1:8000/api";

const TripDetails = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const cityIdFromUrl = searchParams.get("cityId");

  const [trip, setTrip] = useState(null);
  const [cities, setCities] = useState([]);
  const [cityName, setCityName] = useState("غير محدد");
  const [reviews, setReviews] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ==========================================
  // جلب بيانات الرحلة والمدن والتقييمات
  // ==========================================

  const fetchTripDetails = async () => {
    setLoading(true);
    setError("");

    try {
      const [tripResponse, citiesResponse, reviewsResponse] =
        await Promise.all([
          fetch(`${API_URL}/trips/${id}`),
          fetch(`${API_URL}/cities`),
          fetch(`${API_URL}/trips/${id}/reviews`)
        ]);

      if (!tripResponse.ok) {
        throw new Error("فشل في جلب بيانات الرحلة");
      }

      if (!citiesResponse.ok) {
        throw new Error("فشل في جلب بيانات المدن");
      }

      const tripResult = await tripResponse.json();
      const citiesResult = await citiesResponse.json();

      let reviewsResult = { data: [] };

      if (reviewsResponse.ok) {
        reviewsResult = await reviewsResponse.json();
      }

      const tripData = tripResult.data;
      const citiesData = citiesResult.data || [];

      console.log("TRIP:", tripResult);
      console.log("CITIES:", citiesResult);
      console.log("REVIEWS:", reviewsResult);

      setTrip(tripData);
      setCities(citiesData);
      setReviews(reviewsResult.data || []);

      // ==========================================
      // تحديد مدينة الرحلة
      // ==========================================

      let cityId = tripData?.city_id;

      if (cityId === undefined || cityId === null) {
        cityId = tripData?.places?.[0]?.city_id;
      }

      if (cityId === undefined || cityId === null) {
        cityId = cityIdFromUrl;
      }

      console.log("CITY ID:", cityId);

      console.log("========== CITY DEBUG ==========");
      console.log("tripData:", tripData);
      console.log("trip city_id:", tripData?.city_id);
      console.log("places:", tripData?.places);
      console.log("city_id used:", cityId);
      console.log("citiesData:", citiesData);

      const foundCity = citiesData.find(
        (city) => Number(city.id) === Number(cityId)
      );

      console.log("FOUND CITY:", foundCity);

      if (foundCity) {
        setCityName(foundCity.name);
      } else {
        setCityName("غير محدد");
      }

    } catch (err) {
      console.error("Error fetching trip details:", err);

      setError(
        err.message || "حدث خطأ أثناء جلب بيانات الرحلة"
      );

    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // تشغيل جلب البيانات
  // ==========================================

  useEffect(() => {
    if (id) {
      fetchTripDetails();
    }
  }, [id, cityIdFromUrl]);

  // ==========================================
  // Loading
  // ==========================================

  if (loading) {
    return (
      <div className="trip-details-page">

        <Header />

        <div className="trip-loading">
          جاري تحميل تفاصيل الرحلة...
        </div>

        <Footer />

      </div>
    );
  }

  // ==========================================
  // Error
  // ==========================================

  if (error) {
    return (
      <div className="trip-details-page">

        <Header />

        <div className="trip-error">

          <h2>حدث خطأ</h2>

          <p>{error}</p>

          <Link
            to="/trips"
            className="back-to-trips"
          >
            العودة إلى الرحلات
          </Link>

        </div>

        <Footer />

      </div>
    );
  }

  // ==========================================
  // الرحلة غير موجودة
  // ==========================================

  if (!trip) {
    return (
      <div className="trip-details-page">

        <Header />

        <div className="trip-error">

          <h2>الرحلة غير موجودة</h2>

          <Link
            to="/trips"
            className="back-to-trips"
          >
            العودة إلى الرحلات
          </Link>

        </div>

        <Footer />

      </div>
    );
  }

  // ==========================================
  // بيانات إضافية
  // ==========================================

  const places = trip.places || [];

  const transportationNames = {
    bus: "باص",
    mini_bus: "ميني باص",
    train: "قطار",
    tour_bus: "باص سياحي"
  };

  const transportationName =
    transportationNames[trip.transportation_type] ||
    trip.transportation_type ||
    "غير محدد";

  const tripDate = trip.trip_date
    ? new Date(trip.trip_date).toLocaleDateString(
        "ar-SY",
        {
          year: "numeric",
          month: "long",
          day: "numeric"
        }
      )
    : "غير محدد";

  // ==========================================
  // الصفحة
  // ==========================================

  return (
    <div className="trip-details-page">

      {/* =========================
          Header
      ========================= */}

      <Header />

      {/* =========================
          Hero
      ========================= */}

      <section
        className="trip-details-hero"
        style={{
          backgroundImage: `url(${
            trip.cover_image ||
            "https://via.placeholder.com/1200x600"
          })`
        }}
      >

        <div className="hero-overlay"></div>

        {/* Breadcrumb */}

        <div className="trip-breadcrumb">

          <Link
            to="/home"
            className="breadcrumb-item breadcrumb-home"
          >
            الرئيسية
          </Link>

          <div className="breadcrumb-arrow">
            ←
          </div>

          <Link
            to="/trips"
            className="breadcrumb-item breadcrumb-trips"
          >
            الرحلات
          </Link>

          <div className="breadcrumb-arrow">
            ←
          </div>

          <div className="breadcrumb-item breadcrumb-current">
            تفاصيل الرحلة
          </div>

        </div>

        {/* Hero Content */}

        <div className="trip-hero-content">

          <h1>
            {trip.title}
          </h1>

          <p>
            {trip.description}
          </p>

          <div className="trip-hero-meta">

            {/* المدينة */}

            <div className="trip-meta-item">

              <span className="location-icon">
                📍
              </span>

              <span>
                {cityName}
              </span>

            </div>

            <span className="meta-divider">
              |
            </span>

            {/* التاريخ */}

            <div className="trip-meta-item">

              <span className="clock-icon">
                🕐
              </span>

              <span>
                {tripDate}
              </span>

            </div>

            <span className="meta-divider">
              |
            </span>

            {/* المدة */}

            <div className="trip-meta-item">

              <span>
                ⏱️
              </span>

              <span>
                {trip.duration} ساعة
              </span>

            </div>

          </div>

        </div>

      </section>

      {/* =========================
          Main Content
      ========================= */}

      <main className="trip-details-content">

        {/* عن الرحلة */}

        <section className="trip-intro">

          <h2>
            عن الرحلة
          </h2>

          <p>
            {trip.description}
          </p>

        </section>


        {/* بطاقات المعلومات */}

        <section className="trip-info-cards">

          <div className="trip-info-card">

            <div className="info-card-icon">
              💰
            </div>

            <h3>
              السعر
            </h3>

            <p>
              {trip.price} $
            </p>

          </div>


          <div className="trip-info-card">

            <div className="info-card-icon">
              🚌
            </div>

            <h3>
              وسيلة النقل
            </h3>

            <p>
              {transportationName}
            </p>

          </div>


          <div className="trip-info-card">

            <div className="info-card-icon">
              💺
            </div>

            <h3>
              المقاعد المتاحة
            </h3>

            <p>
              {trip.available_seats}
            </p>

          </div>


          <div className="trip-info-card">

            <div className="info-card-icon">
              ⭐
            </div>

            <h3>
              التقييم
            </h3>

            <p>
              {trip.rating_avg || 0} / 5
            </p>

          </div>

        </section>


        {/* نقطة التجمع + البرنامج */}

        <section className="trip-middle-section">

          <div className="meeting-point-card">

            <h2>
              نقطة التجمع
            </h2>

            <div className="meeting-point">

              <span className="meeting-icon">
                📍
              </span>

              <p>
                {trip.meeting_point || "غير محددة"}
              </p>

            </div>

          </div>


          <div className="trip-program-card">

            <h2>
              برنامج الرحلة
            </h2>

            <div className="trip-timeline">

              {places.length > 0 ? (

                places.map((place, index) => (

                  <div
                    className="timeline-item"
                    key={place.id || index}
                  >

                    <div className="timeline-number">
                      {index + 1}
                    </div>

                    <div className="timeline-content">

                      <h3>
                        {place.name}
                      </h3>

                      <p>
                        {place.description}
                      </p>

                      {place.address && (
                        <span>
                          📍 {place.address}
                        </span>
                      )}

                    </div>

                  </div>

                ))

              ) : (

                <p>
                  لا يوجد برنامج محدد للرحلة.
                </p>

              )}

            </div>

          </div>

        </section>


        {/* الأماكن */}

        <section className="included-places-section">

          <h2>
            الأماكن المشمولة في الرحلة
          </h2>

          {places.length > 0 ? (

            <div className="included-places-grid">

              {places.map((place) => (

                <div
                  className="included-place-card"
                  key={place.id}
                >

                  <img
                    src={
                      place.cover_image ||
                      "https://via.placeholder.com/640x480"
                    }
                    alt={place.name}
                  />

                  <div className="included-place-content">

                    <h3>
                      {place.name}
                    </h3>

                    <p>
                      {place.description}
                    </p>

                    {place.address && (
                      <div className="place-address">
                        📍 {place.address}
                      </div>
                    )}

                    <div className="place-rating">

                      ⭐ {place.rating_avg || 0}

                      <span>
                        ({place.reviews_count || 0} تقييم)
                      </span>

                    </div>

                  </div>

                </div>

              ))}

            </div>

          ) : (

            <p className="no-places">
              لا توجد أماكن مضافة لهذه الرحلة.
            </p>

          )}

        </section>


        {/* التقييمات */}

        <section className="reviews-section">

          <div className="reviews-header">

            <h2>
              تقييمات الرحلة
            </h2>

            <div className="overall-rating">

              <span className="rating-number">
                {trip.rating_avg || 0}
              </span>

              <span className="rating-stars">
                ⭐⭐⭐⭐⭐
              </span>

              <span className="reviews-count">
                ({trip.reviews_count || 0} تقييم)
              </span>

            </div>

          </div>


          {reviews.length > 0 ? (

            <div className="reviews-grid">

              {reviews.map((review, index) => (

                <div
                  className="review-card"
                  key={review.id || index}
                >

                  <div className="review-header">

                    <div className="review-user">

                      <div className="review-avatar">
                        👤
                      </div>

                      <div>

                        <h4>
                          {review.user?.name ||
                            review.user_name ||
                            "مستخدم"}
                        </h4>

                        <span>
                          {review.created_at
                            ? new Date(
                                review.created_at
                              ).toLocaleDateString("ar-SY")
                            : ""}
                        </span>

                      </div>

                    </div>

                    <div className="review-rating">
                      ⭐ {review.rating || 0}
                    </div>

                  </div>

                  <p>
                    {review.comment ||
                      review.review ||
                      "لا يوجد تعليق"}
                  </p>

                </div>

              ))}

            </div>

          ) : (

            <div className="no-reviews">
              لا توجد تقييمات لهذه الرحلة حتى الآن.
            </div>

          )}

        </section>


        {/* الحجز */}

        <section className="booking-section">

          <div className="booking-info">

            <h2>
              احجز رحلتك الآن
            </h2>

            <p>
              لا تفوت فرصة الاستمتاع بهذه الرحلة المميزة.
            </p>

          </div>

          <div className="booking-action">

            <Link
              to={`/BookingConfirmation?trip_id=${trip.id}&cityId=${cityIdFromUrl}`}
              className="booking-button"
            >
              احجز الآن
            </Link>

          </div>

        </section>

      </main>

      {/* =========================
          Footer
      ========================= */}

      <Footer />

    </div>
  );
};

export default TripDetails;