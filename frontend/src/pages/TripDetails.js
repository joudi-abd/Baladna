import React, { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { FiImage, FiMapPin, FiArrowUpLeft } from "react-icons/fi";

import Header from "../components/Header";
import Footer from "../components/Footer";
import TripStatCard from "../components/TripStatCard";
import PlaceCard from "../components/PlaceCard";
import TestimonialCard from "../components/TestimonialCard";
import CarouselArrows from "../components/CarouselArrows";

import { getTripDetails } from "../data/tripDetailsMockData";

import "../styles/TripDetails.css";

const TripDetails = () => {
  const { id } = useParams();

  const trip = useMemo(() => getTripDetails(id), [id]);

  if (!trip) {
    return (
      <>
        <Header />

        <div className="trip-details-error">
          <h2>لم يتم العثور على الرحلة</h2>
          <Link to="/trips">العودة إلى الرحلات</Link>
        </div>

        <Footer />
      </>
    );
  }

  const mapsSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    trip.meetingPoint.name
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
            <h1>{trip.heroTitle}</h1>
            <p>{trip.heroSubtitle}</p>

            <div className="trip-hero-meta">
              <span>
                <FiMapPin /> مدينة {trip.city}
              </span>

              <span className="trip-hero-meta-divider">|</span>

              <span>{trip.summary[0].value}</span>
            </div>
          </div>
        </section>

        {/* =========================
            INTRO
        ========================= */}

        <section className="trip-details-section trip-intro-section">
          <h2>{trip.heroTitle}</h2>
          <p>{trip.introDescription}</p>
        </section>

        {/* =========================
            SUMMARY CARDS
        ========================= */}

        <section className="trip-details-section trip-summary-section">
          <div className="trip-summary-grid">
            {trip.summary.map((stat) => (
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
                  {trip.itinerary.map((step) => (
                    <div className="itinerary-thumbnail" key={step.time}>
                      <FiImage />
                    </div>
                  ))}
                </div>

                <ol className="itinerary-list">
                  {trip.itinerary.map((step) => (
                    <li className="itinerary-item" key={step.time}>
                      <span className="itinerary-dot" aria-hidden="true"></span>

                      <div className="itinerary-item-content">
                        <span className="itinerary-title">{step.title}</span>
                        <span className="itinerary-description">
                          {step.description}
                        </span>
                      </div>

                      <span className="itinerary-time">{step.time}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            <div className="meeting-panel">
              <h2>
                <FiMapPin /> نقطة التجمع
              </h2>

              <p className="meeting-point-name">{trip.meetingPoint.name}</p>
              <p className="meeting-point-time">{trip.meetingPoint.time}</p>

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

                <span className="trip-map-label">نقطة التجمع</span>
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
            {trip.includedPlaces.map((place) => (
              <PlaceCard key={place.id} place={place} />
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
              <p className="section-subtitle">تجارب حقيقية من مستخدمي Baladna</p>
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
            {trip.testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        </section>

        {/* =========================
            BOOKING CTA
        ========================= */}

        <section className="trip-cta-section">
          <p>هل أنت جاهز لتمضي رحلة مميزة في بلدنا ؟</p>

          <Link to={`/booking/${trip.id}`} className="btn-book-trip-cta">
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
