import React, { useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FiImage, FiUsers, FiDollarSign, FiClock } from "react-icons/fi";
import { FaPersonWalking } from "react-icons/fa6";

import Header from "../components/Header";
import Footer from "../components/Footer";
import TripCard from "../components/TripCard";
import PlaceCard from "../components/PlaceCard";
import TestimonialCard from "../components/TestimonialCard";
import CarouselArrows from "../components/CarouselArrows";

import { getPlaceDetails } from "../data/placeDetailsMockData";

import "../styles/PlaceDetails.css";

const FEATURE_ICONS = {
  family: FiUsers,
  walk: FaPersonWalking,
  cost: FiDollarSign,
  time: FiClock,
};

function useCarouselPage(items, pageSize = 3) {
  const [start, setStart] = useState(0);

  const visible = items.slice(start, start + pageSize);
  const canGoPrevious = start > 0;
  const canGoNext = start + pageSize < items.length;

  const goPrevious = () => canGoPrevious && setStart(start - pageSize);
  const goNext = () => canGoNext && setStart(start + pageSize);

  return { visible, canGoPrevious, canGoNext, goPrevious, goNext };
}

const PlaceDetails = () => {
  const { id } = useParams();

  const place = useMemo(() => getPlaceDetails(id), [id]);

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const trips = useCarouselPage(place.relatedTrips);
  const testimonials = useCarouselPage(place.testimonials);
  const relatedPlaces = useCarouselPage(place.relatedPlaces);

  const thumbnails = place.images.slice(1, 3);
  const remainingImagesCount = place.images.length - 3;

  return (
    <>
      <Header />

      <main className="place-details-page">

        {/* =========================
            BREADCRUMB
        ========================= */}

        <nav className="breadcrumb">
          <Link to="/home">الرئيسية</Link>

          <Link to="/exploration" className="breadcrumb-pill">
            استكشاف
          </Link>

          <span className="breadcrumb-pill breadcrumb-pill-active">
            تفاصيل منطقة
          </span>
        </nav>

        {/* =========================
            GALLERY
        ========================= */}

        <section className="place-gallery">

          <div className="main-place-image">
            {place.images[activeImageIndex] ? (
              <img src={place.images[activeImageIndex]} alt={place.name} />
            ) : (
              <div className="image-placeholder">
                <FiImage />
              </div>
            )}
          </div>

          {thumbnails.length > 0 && (
            <div className="gallery-thumbnails">
              {thumbnails.map((image, index) => {
                const realIndex = index + 1;
                const isLastThumbnail = index === thumbnails.length - 1;

                return (
                  <button
                    type="button"
                    className="gallery-thumbnail"
                    key={realIndex}
                    onClick={() => setActiveImageIndex(realIndex)}
                    aria-label={`عرض الصورة ${realIndex + 1}`}
                  >
                    {image ? (
                      <img src={image} alt={`${place.name} ${realIndex + 1}`} />
                    ) : (
                      <div className="image-placeholder">
                        <FiImage />
                      </div>
                    )}

                    {isLastThumbnail && remainingImagesCount > 0 && (
                      <div className="more-images">
                        + {remainingImagesCount} صور
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </section>

        {/* =========================
            PLACE INFO + DESCRIPTION
        ========================= */}

        <section className="place-info">
          <h1>{place.name}</h1>
        </section>

        <section className="place-description-section">
          {place.description.split("\n\n").map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </section>

        {/* =========================
            FEATURES
        ========================= */}

        <section className="place-features-section">
          <h2>ميزات المكان</h2>

          <div className="features-list">
            {place.features.map((feature) => {
              const Icon = FEATURE_ICONS[feature.icon] || FiImage;

              return (
                <div className="feature-item" key={feature.icon}>
                  <Icon />
                  <span>{feature.label}</span>
                </div>
              );
            })}
          </div>
        </section>

        {/* =========================
            AVAILABLE TRIPS
        ========================= */}

        <section className="details-section">
          <div className="section-header">
            <div>
              <h2>الرحلات المتاحة</h2>
              <p className="section-subtitle">
                رحلات سياحية متنوعة تجمع بين أبرز الوجهات والخدمات لتمنحك تجربة مميزة ومختلفة
              </p>
            </div>

            <CarouselArrows
              label="الرحلات"
              onPrevious={trips.goPrevious}
              onNext={trips.goNext}
              canGoPrevious={trips.canGoPrevious}
              canGoNext={trips.canGoNext}
            />
          </div>

          {trips.visible.length > 0 ? (
            <div className="cards-container">
              {trips.visible.map((trip) => (
                <TripCard key={trip.id} trip={trip} badgeLabel={trip.badgeLabel} />
              ))}
            </div>
          ) : (
            <p className="empty-section">لا توجد رحلات متاحة لهذا المكان حالياً.</p>
          )}
        </section>

        {/* =========================
            TESTIMONIALS
        ========================= */}

        <section className="details-section">
          <div className="section-header">
            <div>
              <h2>آراء زوّار Baladna</h2>
              <p className="section-subtitle">تجارب حقيقية من مستخدمي Baladna</p>
            </div>

            <CarouselArrows
              label="الآراء"
              onPrevious={testimonials.goPrevious}
              onNext={testimonials.goNext}
              canGoPrevious={testimonials.canGoPrevious}
              canGoNext={testimonials.canGoNext}
            />
          </div>

          {testimonials.visible.length > 0 ? (
            <div className="reviews-grid">
              {testimonials.visible.map((testimonial) => (
                <TestimonialCard key={testimonial.id} testimonial={testimonial} />
              ))}
            </div>
          ) : (
            <p className="empty-section">لا توجد آراء لهذا المكان حالياً.</p>
          )}
        </section>

        {/* =========================
            RELATED PLACES
        ========================= */}

        <section className="details-section featured-section">
          <div className="section-header">
            <h2>أماكن مميزة قد تعجبك</h2>

            <CarouselArrows
              label="الأماكن"
              onPrevious={relatedPlaces.goPrevious}
              onNext={relatedPlaces.goNext}
              canGoPrevious={relatedPlaces.canGoPrevious}
              canGoNext={relatedPlaces.canGoNext}
            />
          </div>

          {relatedPlaces.visible.length > 0 ? (
            <div className="cards-container">
              {relatedPlaces.visible.map((relatedPlace) => (
                <PlaceCard key={relatedPlace.id} place={relatedPlace} />
              ))}
            </div>
          ) : (
            <p className="empty-section">لا توجد أماكن مميزة حالياً.</p>
          )}
        </section>

      </main>

      <Footer />
    </>
  );
};

export default PlaceDetails;
