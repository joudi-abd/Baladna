import React, { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FiImage, FiMapPin, FiArrowUpLeft } from "react-icons/fi";

import Header from "../components/Header";
import Footer from "../components/Footer";
import TripStatCard from "../components/TripStatCard";
import PlaceCard from "../components/PlaceCard";
import TestimonialCard from "../components/TestimonialCard";
import CarouselArrows from "../components/CarouselArrows";

import { apiRequest } from "../api/api";
import "../styles/TripDetails.css";

const TripDetails = () => {
  const { id } = useParams();

  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const fetchTrip = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await apiRequest(`/trips/${id}`);

        if (cancelled) return;

        if (!response.ok) {
          if (response.status === 404) {
            setError("not_found");
          } else {
            setError("failed");
          }

          setTrip(null);
          return;
        }

        const tripData = response.data?.data;

        if (!tripData) {
          setError("not_found");
          setTrip(null);
          return;
        }

        setTrip(tripData);
      } catch (err) {
        if (cancelled) return;

        console.error("Failed to load trip details:", err);

        setError("failed");
        setTrip(null);
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchTrip();

    return () => {
      cancelled = true;
    };
  }, [id]);

  /*
   * تجهيز الأماكن حتى تظل PlaceCard بنفس الـ HTML الحالي.
   *
   * API:
   * cover_image
   * city_id
   * category_id
   *
   * PlaceCard:
   * image
   * city
   * tags
   */
  const includedPlaces = useMemo(() => {
    if (!Array.isArray(trip?.places)) {
      return [];
    }

    return trip.places.map((place) => ({
      ...place,

      image: place.image || place.cover_image || null,

      city:
        typeof place.city === "string"
          ? place.city
          : place.city?.name || place.city_name || "",

      tags: Array.isArray(place.tags) ? place.tags : [],
    }));
  }, [trip]);

  /*
   * تجهيز بيانات الـ summary بدون تغيير الـ JSX.
   */
  const summary = useMemo(() => {
    if (!trip) {
      return [];
    }

    return [
      {
        label: "السعر",
        value:
          trip.price !== null && trip.price !== undefined
            ? `${Number(trip.price).toLocaleString("en-US")} ل.س`
            : "-",
        icon: "💰",
      },
      {
        label: "مدة الرحلة",
        value: trip.duration || "-",
        icon: "🕒",
      },
      {
        label: "المقاعد المتاحة",
        value:
          trip.available_seats !== null &&
          trip.available_seats !== undefined
            ? `${trip.available_seats}`
            : "-",
        icon: "🎟️",
      },
      {
        label: "التقييم",
        value:
          trip.rating_avg !== null && trip.rating_avg !== undefined
            ? Number(trip.rating_avg).toFixed(1)
            : "0.0",
        icon: "⭐",
      },
    ];
  }, [trip]);

  /*
   * تجهيز معلومات الرحلة مع الحفاظ على نفس الـ JSX الموجود.
   */
  const tripView = useMemo(() => {
    if (!trip) {
      return null;
    }

    const city =
      typeof trip.city === "string"
        ? trip.city
        : trip.city?.name ||
          trip.city_name ||
          "";

    const meetingPoint =
      typeof trip.meeting_point === "string"
        ? trip.meeting_point
        : trip.meeting_point?.name ||
          trip.meeting_point_name ||
          "";

    const meetingTime =
      typeof trip.meeting_point === "object" &&
      trip.meeting_point !== null
        ? trip.meeting_point.time || ""
        : "";

    return {
      ...trip,

      heroTitle: trip.title || "تفاصيل الرحلة",

      heroSubtitle: trip.description || "",

      city,

      introDescription: trip.description || "",

      summary,

      meetingPoint: {
        name: meetingPoint || "نقطة التجمع غير محددة",
        time: meetingTime,
      },

      /*
       * الـ API المقدم لا يحتوي على itinerary بشكل واضح.
       */
      itinerary: Array.isArray(trip.itinerary)
        ? trip.itinerary
        : [],

      /*
       * الـ API المقدم لا يحتوي على testimonials.
       */
      testimonials: Array.isArray(trip.testimonials)
        ? trip.testimonials
        : [],

      includedPlaces,
    };
  }, [trip, summary, includedPlaces]);

  /*
   * Loading
   */
  if (loading) {
    return (
      <>
        <Header />

        <div className="trip-details-error">
          <h2>جاري تحميل تفاصيل الرحلة...</h2>
        </div>

        <Footer />
      </>
    );
  }

  /*
   * Error / Not Found
   */
  if (!tripView) {
    return (
      <>
        <Header />

        <div className="trip-details-error">
          <h2>
            {error === "not_found"
              ? "لم يتم العثور على الرحلة"
              : "حدث خطأ أثناء تحميل الرحلة"}
          </h2>

          <Link to="/trips">العودة إلى الرحلات</Link>
        </div>

        <Footer />
      </>
    );
  }

  const mapsSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    tripView.meetingPoint.name
  )}`;

  return (
    <>
      <Header />

      <main className="trip-details-page">

        {/* =========================
            HERO
        ========================= */}

        <section className="trip-hero">
          <div className="trip-hero-decoration" aria-hidden="true"></div>

          <nav className="breadcrumb trip-hero-breadcrumb">
            <Link to="/home">الرئيسية</Link>

            <Link to="/trips" className="breadcrumb-pill">
              الرحلات
            </Link>

            <span className="breadcrumb-pill breadcrumb-pill-active">
              تفاصيل الرحلة
            </span>
          </nav>

          <div className="trip-hero-content">
            <h1>{tripView.heroTitle}</h1>

            <p>{tripView.heroSubtitle}</p>

            <div className="trip-hero-meta">
              <span>
                <FiMapPin />{" "}
                {tripView.city
                  ? `مدينة ${tripView.city}`
                  : "المدينة غير محددة"}
              </span>

              <span className="trip-hero-meta-divider">|</span>

              <span>
                {tripView.summary[0]?.value || "-"}
              </span>
            </div>
          </div>
        </section>

        {/* =========================
            INTRO
        ========================= */}

        <section className="trip-details-section trip-intro-section">
          <h2>{tripView.heroTitle}</h2>

          <p>{tripView.introDescription}</p>
        </section>

        {/* =========================
            SUMMARY CARDS
        ========================= */}

        <section className="trip-details-section trip-summary-section">
          <div className="trip-summary-grid">
            {tripView.summary.map((stat) => (
              <TripStatCard
                key={stat.label}
                icon={stat.icon}
                label={stat.label}
                value={stat.value}
              />
            ))}
          </div>
        </section>

        {/* =========================
            ITINERARY + MEETING POINT
        ========================= */}

        <section className="trip-details-section trip-plan-section">
          <div className="trip-plan-grid">

            <div className="itinerary-panel">
              <h2>برنامج الرحلة</h2>

              <div className="itinerary-body">

                <div className="itinerary-thumbnails">
                  {tripView.itinerary.map((step, index) => (
                    <div
                      className="itinerary-thumbnail"
                      key={step.time || index}
                    >
                      <FiImage />
                    </div>
                  ))}
                </div>

                <ol className="itinerary-list">
                  {tripView.itinerary.map((step, index) => (
                    <li
                      className="itinerary-item"
                      key={step.time || index}
                    >
                      <span
                        className="itinerary-dot"
                        aria-hidden="true"
                      ></span>

                      <div className="itinerary-item-content">
                        <span className="itinerary-title">
                          {step.title}
                        </span>

                        <span className="itinerary-description">
                          {step.description}
                        </span>
                      </div>

                      <span className="itinerary-time">
                        {step.time}
                      </span>
                    </li>
                  ))}
                </ol>

              </div>
            </div>

            <div className="meeting-panel">
              <h2>
                <FiMapPin /> نقطة التجمع
              </h2>

              <p className="meeting-point-name">
                {tripView.meetingPoint.name}
              </p>

              <p className="meeting-point-time">
                {tripView.meetingPoint.time}
              </p>

              <a
                href={mapsSearchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-view-map"
              >
                عرض على الخريطة
              </a>

              <div className="trip-map-placeholder">
                <div className="trip-map-road trip-map-road-h"></div>
                <div className="trip-map-road trip-map-road-v"></div>
                <div className="trip-map-block trip-map-block-1"></div>
                <div className="trip-map-block trip-map-block-2"></div>
                <div className="trip-map-block trip-map-block-3"></div>

                <div className="trip-map-marker">
                  <FiMapPin />
                </div>

                <span className="trip-map-label">
                  نقطة التجمع
                </span>
              </div>
            </div>

          </div>
        </section>

        {/* =========================
            INCLUDED PLACES
        ========================= */}

        <section className="trip-details-section">
          <div className="section-header">
            <div>
              <h2>الأماكن المضمنة ضمن الرحلة</h2>

              <p className="section-subtitle">
                أماكن ومعالم سياحية مميزة تجمع بين الجمال والتراث والحضارة السورية العريقة ضمن الرحلة
              </p>
            </div>

            <CarouselArrows
              label="الأماكن"
              onPrevious={() => {}}
              onNext={() => {}}
              canGoPrevious={false}
              canGoNext={false}
            />
          </div>

          <div className="cards-container">
            {tripView.includedPlaces.map((place) => (
              <PlaceCard
                key={place.id}
                place={place}
              />
            ))}
          </div>
        </section>

        {/* =========================
            TESTIMONIALS
        ========================= */}

        <section className="trip-details-section">
          <div className="section-header">
            <div>
              <h2>آراء السياح عن الرحلة</h2>

              <p className="section-subtitle">
                تجارب حقيقية من مستخدمي Baladna
              </p>
            </div>

            <CarouselArrows
              label="الآراء"
              onPrevious={() => {}}
              onNext={() => {}}
              canGoPrevious={false}
              canGoNext={false}
            />
          </div>

          <div className="reviews-grid">
            {tripView.testimonials.map((testimonial) => (
              <TestimonialCard
                key={testimonial.id}
                testimonial={testimonial}
              />
            ))}
          </div>
        </section>

        {/* =========================
            BOOKING CTA
        ========================= */}

        <section className="trip-cta-section">
          <p>
            هل أنت جاهز لتمضي رحلة مميزة في بلدنا ؟
          </p>

          <Link
            to={`/booking/${tripView.id}`}
            className="btn-book-trip-cta"
          >
            <FiArrowUpLeft />
            احجز رحلتك الآن
          </Link>
        </section>

      </main>

      <Footer />
    </>
  );
};

export default TripDetails;