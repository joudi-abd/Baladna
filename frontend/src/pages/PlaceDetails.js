import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/PlaceDetails.css";

const PlaceDetails = () => {
  const { id } = useParams();

  const [place, setPlace] = useState(null);
  const [media, setMedia] = useState([]);
  const [trips, setTrips] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [featuredPlaces, setFeaturedPlaces] = useState([]);

  const [loading, setLoading] = useState(true);

  // Pagination / Carousel
  const [tripStart, setTripStart] = useState(0);
  const [reviewsStart, setReviewsStart] = useState(0);
  const [featuredStart, setFeaturedStart] = useState(0);

  useEffect(() => {
    const fetchPlaceData = async () => {
      try {
        setLoading(true);

        // =========================
        // PLACE
        // =========================
        const placeResponse = await fetch(
          `http://127.0.0.1:8000/api/places/${id}`
        );

        const placeResult = await placeResponse.json();

        if (!placeResponse.ok) {
          throw new Error("Failed to fetch place");
        }

        const currentPlace = placeResult.data;

        setPlace(currentPlace);
        setMedia(currentPlace.media || []);

        // =========================
        // TRIPS
        // =========================
        const tripsResponse = await fetch(
          `http://127.0.0.1:8000/api/trips?city_id=${currentPlace.city_id}&per_page=100`
        );

        const tripsResult = await tripsResponse.json();

        if (tripsResponse.ok) {
          const allTrips = tripsResult.data || [];

          const filteredTrips = allTrips.filter(
            (trip) =>
              trip.status === "upcoming" ||
              trip.status === "ongoing" ||
              trip.status === "completed"
          );

          setTrips(filteredTrips);
        }

        // =========================
        // REVIEWS
        // =========================
        const reviewsResponse = await fetch(
          `http://127.0.0.1:8000/api/places/${id}/reviews`
        );

        const reviewsResult = await reviewsResponse.json();

        if (reviewsResponse.ok) {
          setReviews(reviewsResult.data || []);
        }

        // =========================
        // FEATURED PLACES
        // =========================
        const featuredResponse = await fetch(
          "http://127.0.0.1:8000/api/places/featured"
        );

        const featuredResult = await featuredResponse.json();

        if (featuredResponse.ok) {
          const allFeaturedPlaces = featuredResult.data || [];

          // نستبعد المكان الحالي
          const filteredFeaturedPlaces = allFeaturedPlaces.filter(
            (featuredPlace) =>
              Number(featuredPlace.id) !== Number(currentPlace.id)
          );

          setFeaturedPlaces(filteredFeaturedPlaces);
        }
      } catch (error) {
        console.error("Error fetching place details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaceData();
  }, [id]);

  // =========================
  // GALLERY
  // =========================

  const getImageUrl = (image) => {
    if (!image) {
      return "/placeholder.jpg";
    }

    if (typeof image === "string") {
      return image;
    }

    return image.url || image.path || image.image || "/placeholder.jpg";
  };

  const galleryImages = [];

  if (place?.cover_image) {
    galleryImages.push(place.cover_image);
  }

  media.forEach((item) => {
    const image = getImageUrl(item);

    if (image && !galleryImages.includes(image)) {
      galleryImages.push(image);
    }
  });

  // =========================
  // TRIPS CAROUSEL
  // =========================

  const visibleTrips = trips.slice(tripStart, tripStart + 3);

  const canGoTripsPrevious = tripStart > 0;
  const canGoTripsNext = tripStart + 3 < trips.length;

  const nextTrips = () => {
    if (canGoTripsNext) {
      setTripStart(tripStart + 3);
    }
  };

  const previousTrips = () => {
    if (canGoTripsPrevious) {
      setTripStart(tripStart - 3);
    }
  };

  // =========================
  // REVIEWS CAROUSEL
  // =========================

  const visibleReviews = reviews.slice(reviewsStart, reviewsStart + 3);

  const canGoReviewsPrevious = reviewsStart > 0;
  const canGoReviewsNext = reviewsStart + 3 < reviews.length;

  const nextReviews = () => {
    if (canGoReviewsNext) {
      setReviewsStart(reviewsStart + 3);
    }
  };

  const previousReviews = () => {
    if (canGoReviewsPrevious) {
      setReviewsStart(reviewsStart - 3);
    }
  };

  // =========================
  // FEATURED PLACES CAROUSEL
  // =========================

  // بالبداية رح يكون:
  // featuredStart = 0
  // وبالتالي يظهر أول 3 أماكن

  const visibleFeaturedPlaces = featuredPlaces.slice(
    featuredStart,
    featuredStart + 3
  );

  // إذا عندنا 5 أماكن:
  // 0 + 3 < 5
  // إذن سهم التالي فعال

  const canGoFeaturedPrevious = featuredStart > 0;

  const canGoFeaturedNext =
    featuredStart + 3 < featuredPlaces.length;

  const nextFeaturedPlaces = () => {
    if (canGoFeaturedNext) {
      setFeaturedStart(featuredStart + 3);
    }
  };

  const previousFeaturedPlaces = () => {
    if (canGoFeaturedPrevious) {
      setFeaturedStart(featuredStart - 3);
    }
  };

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <>
        <Header />

        <div className="place-details-loading">
          <p>جاري تحميل تفاصيل المكان...</p>
        </div>

        <Footer />
      </>
    );
  }

  // =========================
  // ERROR
  // =========================

  if (!place) {
    return (
      <>
        <Header />

        <div className="place-details-error">
          <h2>لم يتم العثور على المكان</h2>
          <Link to="/exploration">العودة إلى الاستكشاف</Link>
        </div>

        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />

      <main className="place-details-page">

        {/* =========================
            BREADCRUMB
        ========================= */}

        <div className="breadcrumb">
          <Link to="/home">الرئيسية</Link>
          <span>←</span>

          <Link to="/exploration">استكشاف</Link>
          <span>←</span>

          <span>تفاصيل المكان</span>
        </div>

        {/* =========================
            GALLERY
        ========================= */}

        <section className="place-gallery">

          <div className="main-place-image">
            <img
              src={getImageUrl(
                galleryImages.length > 0
                  ? galleryImages[0]
                  : place.cover_image
              )}
              alt={place.name}
            />
          </div>

          {galleryImages.length > 1 && (
            <div className="gallery-thumbnails">

              {galleryImages.slice(1, 5).map((image, index) => (
                <div
                  className="gallery-thumbnail"
                  key={index}
                >
                  <img
                    src={getImageUrl(image)}
                    alt={`${place.name} ${index + 2}`}
                  />

                  {index === 3 && galleryImages.length > 5 && (
                    <div className="more-images">
                      +{galleryImages.length - 5} صور
                    </div>
                  )}
                </div>
              ))}

            </div>
          )}
        </section>

        {/* =========================
            PLACE INFO
        ========================= */}

        <section className="place-info">

          <div className="place-info-header">

            <div>
              <h1>{place.name}</h1>

              <div className="place-rating">
                <span className="star">★</span>
                <span>
                  {place.rating_avg || 0}
                </span>

                <span className="reviews-count">
                  ({place.reviews_count || 0} تقييم)
                </span>
              </div>
            </div>

          </div>

          {place.address && (
            <div className="place-address">
              <span>📍</span>
              <span>{place.address}</span>
            </div>
          )}

        </section>

        {/* =========================
            DESCRIPTION
        ========================= */}

        <section className="place-description-section">

          <h2>عن المكان</h2>

          <p>
            {place.description ||
              "لا يوجد وصف متوفر لهذا المكان حالياً."}
          </p>

        </section>

        {/* =========================
            FEATURES
        ========================= */}

        {place.features && place.features.length > 0 && (
          <section className="place-features-section">

            <h2>المميزات</h2>

            <div className="features-list">

              {place.features.map((feature) => (
                <div
                  className="feature-item"
                  key={feature.id}
                >
                  <span>✓</span>
                  <span>
                    {feature.name}
                  </span>
                </div>
              ))}

            </div>

          </section>
        )}

        {/* =========================
            AVAILABLE TRIPS
        ========================= */}

        <section className="details-section">

          <div className="section-header">

            <h2>الرحلات المتاحة</h2>

            <div
              className="section-navigation"
              dir="ltr"
            >

              <button
                type="button"
                className="section-arrow"
                onClick={previousTrips}
                disabled={!canGoTripsPrevious}
                aria-label="الرحلات السابقة"
              >
                &lt;
              </button>

              <button
                type="button"
                className="section-arrow"
                onClick={nextTrips}
                disabled={!canGoTripsNext}
                aria-label="الرحلات التالية"
              >
                &gt;
              </button>

            </div>

          </div>

          {visibleTrips.length > 0 ? (

            <div className="cards-container">

              {visibleTrips.map((trip) => (

                <Link
                  to={`/trips/${trip.id}`}
                  className="trip-card"
                  key={trip.id}
                >

                  <div className="trip-card-image">

                    <img
                      src={getImageUrl(trip.cover_image)}
                      alt={trip.title}
                    />

                  </div>

                  <div className="trip-card-content">

                    <h3>{trip.title}</h3>

                    <p>
                      {trip.description}
                    </p>

                    <div className="trip-card-info">

                      <span>
                        📅 {trip.trip_date}
                      </span>

                      <span>
                        💰 {trip.price}
                      </span>

                    </div>

                  </div>

                </Link>

              ))}

            </div>

          ) : (

            <p className="empty-section">
              لا توجد رحلات متاحة لهذا المكان حالياً.
            </p>

          )}

        </section>

        {/* =========================
            REVIEWS
        ========================= */}

        <section className="details-section">

          <div className="section-header">

            <h2>آراء الزوار</h2>

            <div
              className="section-navigation"
              dir="ltr"
            >

              <button
                type="button"
                className="section-arrow"
                onClick={previousReviews}
                disabled={!canGoReviewsPrevious}
                aria-label="التقييمات السابقة"
              >
                &lt;
              </button>

              <button
                type="button"
                className="section-arrow"
                onClick={nextReviews}
                disabled={!canGoReviewsNext}
                aria-label="التقييمات التالية"
              >
                &gt;
              </button>

            </div>

          </div>

          {visibleReviews.length > 0 ? (

            <div className="reviews-container">

              {visibleReviews.map((review) => (

                <div
                  className="review-card"
                  key={review.id}
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
                            "زائر"}
                        </h4>

                        <div className="review-rating">
                          {"★".repeat(
                            Math.round(review.rating || 0)
                          )}
                        </div>
                      </div>

                    </div>

                  </div>

                  <p>
                    {review.comment ||
                      review.review ||
                      "لا يوجد تعليق."}
                  </p>

                </div>

              ))}

            </div>

          ) : (

            <p className="empty-section">
              لا توجد تقييمات لهذا المكان حالياً.
            </p>

          )}

        </section>

        {/* =========================
            FEATURED PLACES
        ========================= */}

        <section className="details-section featured-section">

          <div className="section-header">

            <h2>أماكن مميزة قد تعجبك</h2>

            <div
              className="section-navigation"
              dir="ltr"
            >

              {/* السهم السابق < */}

              <button
                type="button"
                className="section-arrow"
                onClick={previousFeaturedPlaces}
                disabled={!canGoFeaturedPrevious}
                aria-label="الأماكن السابقة"
              >
                &lt;
              </button>

              {/* السهم التالي > */}

              <button
                type="button"
                className="section-arrow"
                onClick={nextFeaturedPlaces}
                disabled={!canGoFeaturedNext}
                aria-label="الأماكن التالية"
              >
                &gt;
              </button>

            </div>

          </div>

          {visibleFeaturedPlaces.length > 0 ? (

            <div className="cards-container">

              {visibleFeaturedPlaces.map((featuredPlace) => (

                <Link
                  to={`/places/${featuredPlace.id}`}
                  className="place-card"
                  key={featuredPlace.id}
                >

                  <div className="place-card-image">

                    <img
                      src={getImageUrl(
                        featuredPlace.cover_image
                      )}
                      alt={featuredPlace.name}
                    />

                  </div>

                  <div className="place-card-content">

                    <h3>
                      {featuredPlace.name}
                    </h3>

                    <div className="place-card-rating">

                      <span className="star">
                        ★
                      </span>

                      <span>
                        {featuredPlace.rating_avg || 0}
                      </span>

                      <span>
                        ({featuredPlace.reviews_count || 0})
                      </span>

                    </div>

                    {featuredPlace.address && (
                      <p>
                        📍 {featuredPlace.address}
                      </p>
                    )}

                  </div>

                </Link>

              ))}

            </div>

          ) : (

            <p className="empty-section">
              لا توجد أماكن مميزة حالياً.
            </p>

          )}

        </section>

      </main>

      <Footer />
    </>
  );
};

export default PlaceDetails;