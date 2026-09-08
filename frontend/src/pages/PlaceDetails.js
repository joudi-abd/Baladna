import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import { useParams } from "react-router-dom";

import {
  FiCalendar,
  FiClock,
  FiImage,
  FiMapPin,
  FiUsers,
  FiStar,
  FiHeart,
} from "react-icons/fi";

import Header from "../components/Header";
import Footer from "../components/Footer";
import CarouselArrows from "../components/CarouselArrows";
import TripCard from "../components/TripCard";
import PlaceCard from "../components/PlaceCard";
import TestimonialCard from "../components/TestimonialCard";

import { apiRequest } from "../api/api";

import "../styles/PlaceDetails.css";

/* ==========================================================
   API CONFIG
========================================================== */

const API_BASE =
  process.env.REACT_APP_API_BASE ||
  "http://localhost:8000/api";

const API_ORIGIN = API_BASE.replace(/\/api\/?$/, "");

/* ==========================================================
   IMAGE URL
========================================================== */

const normalizeImageUrl = (image) => {
  if (!image || typeof image !== "string") {
    return null;
  }

  const cleanImage = image.trim();

  if (!cleanImage) {
    return null;
  }

  /* Full URL */
  if (
    cleanImage.startsWith("http://") ||
    cleanImage.startsWith("https://")
  ) {
    try {
      const url = new URL(cleanImage);
      const apiOrigin = new URL(API_ORIGIN);

      /*
       * نخلي الصور تستخدم نفس host الخاص بالـ API
       * حتى لو Laravel يرجع 127.0.0.1
       */
      url.protocol = apiOrigin.protocol;
      url.host = apiOrigin.host;

      url.pathname = url.pathname.replace(
        /\/storage\/images\//i,
        "/storage/Images/"
      );

      return url.toString();
    } catch (error) {
      console.error(
        "IMAGE URL NORMALIZATION ERROR:",
        error
      );

      return cleanImage;
    }
  }

  /* Relative path */

  let path = cleanImage.replace(/^\/+/, "");

  if (/^images\//i.test(path)) {
    path = `storage/Images/${path.substring(7)}`;
  } else if (/^storage\/images\//i.test(path)) {
    path = `storage/Images/${path.substring(15)}`;
  } else if (!/^storage\//i.test(path)) {
    path = `storage/Images/${path}`;
  }

  const encodedPath = path
    .split("/")
    .map((part) =>
      part ? encodeURIComponent(part) : ""
    )
    .join("/");

  return `${API_ORIGIN}/${encodedPath}`;
};

/* ==========================================================
   NORMALIZE PLACE
========================================================== */

const normalizePlace = (rawPlace) => {
  if (!rawPlace) {
    return null;
  }

  /* استخراج الصور */

  const galleryImages = [];

  if (rawPlace.cover_image) {
    galleryImages.push(
      normalizeImageUrl(rawPlace.cover_image)
    );
  }

  if (rawPlace.image) {
    galleryImages.push(
      normalizeImageUrl(rawPlace.image)
    );
  }

  if (rawPlace.image_url) {
    galleryImages.push(
      normalizeImageUrl(rawPlace.image_url)
    );
  }

  if (Array.isArray(rawPlace.images)) {
    rawPlace.images.forEach((image) => {
      const imageValue =
        typeof image === "string"
          ? image
          : image?.url ||
            image?.image_url ||
            image?.path ||
            image?.file_path;

      if (imageValue) {
        galleryImages.push(
          normalizeImageUrl(imageValue)
        );
      }
    });
  }

  if (Array.isArray(rawPlace.media)) {
    rawPlace.media.forEach((media) => {
      const imageValue =
        typeof media === "string"
          ? media
          : media?.url ||
            media?.image_url ||
            media?.path ||
            media?.file_path;

      if (imageValue) {
        galleryImages.push(
          normalizeImageUrl(imageValue)
        );
      }
    });
  }

  const uniqueImages = [
    ...new Set(
      galleryImages.filter(Boolean)
    ),
  ];

  return {
    ...rawPlace,

    id: rawPlace.id,

    name:
      rawPlace.name ||
      rawPlace.title ||
      "مكان سياحي",

    description:
      rawPlace.description || "",

    address:
      rawPlace.address ||
      rawPlace.city?.name ||
      "",

    latitude:
      rawPlace.latitude ?? null,

    longitude:
      rawPlace.longitude ?? null,

    phone:
      rawPlace.phone ?? null,

    website:
      rawPlace.website ?? null,

    rating_avg: Number(
      rawPlace.rating_avg ??
        rawPlace.rating ??
        0
    ),

    reviews_count: Number(
      rawPlace.reviews_count ??
        rawPlace.reviews ??
        0
    ),

    status:
      rawPlace.status ?? true,

    city_id:
      rawPlace.city_id ?? null,

    category_id:
      rawPlace.category_id ?? null,

    favorites_count:
      rawPlace.favorites_count ?? 0,

    cover_image:
      normalizeImageUrl(
        rawPlace.cover_image ||
          rawPlace.image ||
          rawPlace.image_url
      ),

    images: uniqueImages,

    features:
      Array.isArray(rawPlace.features)
        ? rawPlace.features
        : [],

    reviews:
      Array.isArray(rawPlace.reviews)
        ? rawPlace.reviews
        : [],

    trips:
      Array.isArray(rawPlace.trips)
        ? rawPlace.trips
        : [],

    related_places:
      Array.isArray(
        rawPlace.related_places
      )
        ? rawPlace.related_places
        : [],
  };
};

/* ==========================================================
   NORMALIZE TRIP
========================================================== */

const normalizeTrip = (rawTrip) => {
  if (!rawTrip) {
    return null;
  }

  return {
    ...rawTrip,

    id: rawTrip.id,

    title:
      rawTrip.title ||
      "رحلة سياحية",

    description:
      rawTrip.description || "",

    price:
      Number(rawTrip.price ?? 0),

    trip_date:
      rawTrip.trip_date || null,

    duration:
      rawTrip.duration ?? "",

    meeting_point:
      rawTrip.meeting_point || "",

    transportation_type:
      rawTrip.transportation_type ||
      rawTrip.transpotation_type ||
      "",

    max_participants:
      Number(
        rawTrip.max_participants ?? 0
      ),

    available_seats:
      Number(
        rawTrip.available_seats ?? 0
      ),

    rating_avg:
      Number(
        rawTrip.rating_avg ??
          rawTrip.rating ??
          0
      ),

    reviews_count:
      Number(
        rawTrip.reviews_count ??
          rawTrip.reviews ??
          0
      ),

    status:
      rawTrip.status ||
      "upcoming",

    cover_image:
      normalizeImageUrl(
        rawTrip.cover_image ||
          rawTrip.imageUrl ||
          rawTrip.image
      ),

    imageUrl:
      normalizeImageUrl(
        rawTrip.cover_image ||
          rawTrip.imageUrl ||
          rawTrip.image
      ),

    places:
      Array.isArray(rawTrip.places)
        ? rawTrip.places
        : [],
  };
};

/* ==========================================================
   NORMALIZE FEATURED PLACE
========================================================== */

const normalizeFeaturedPlace = (
  rawPlace
) => {
  if (!rawPlace) {
    return null;
  }

  return {
    ...rawPlace,

    id: rawPlace.id,

    name:
      rawPlace.name ||
      rawPlace.title ||
      "مكان سياحي",

    description:
      rawPlace.description || "",

    address:
      rawPlace.address || "",

    rating_avg:
      Number(
        rawPlace.rating_avg ??
          rawPlace.rating ??
          0
      ),

    reviews_count:
      Number(
        rawPlace.reviews_count ??
          rawPlace.reviews ??
          0
      ),

    cover_image:
      normalizeImageUrl(
        rawPlace.cover_image ||
          rawPlace.image ||
          rawPlace.image_url
      ),
  };
};

/* ==========================================================
   CAROUSEL
========================================================== */

const useCarousel = (
  items = [],
  visibleCount = 3
) => {
  const safeItems = Array.isArray(items)
    ? items
    : [];

  const [startIndex, setStartIndex] =
    useState(0);

  useEffect(() => {
    setStartIndex(0);
  }, [safeItems.length]);

  const maxStartIndex = Math.max(
    safeItems.length - visibleCount,
    0
  );

  const visible = safeItems.slice(
    startIndex,
    startIndex + visibleCount
  );

  const canGoPrevious =
    startIndex > 0;

  const canGoNext =
    startIndex < maxStartIndex;

  const goPrevious = useCallback(() => {
    setStartIndex((current) =>
      Math.max(current - 1, 0)
    );
  }, []);

  const goNext = useCallback(() => {
    setStartIndex((current) =>
      Math.min(
        current + 1,
        maxStartIndex
      )
    );
  }, [maxStartIndex]);

  return {
    visible,
    goPrevious,
    goNext,
    canGoPrevious,
    canGoNext,
  };
};

/* ==========================================================
   FEATURE ICONS
========================================================== */

const FEATURE_ICONS = {
  map_pin: FiMapPin,
  location: FiMapPin,
  clock: FiClock,
  calendar: FiCalendar,
  users: FiUsers,
  image: FiImage,
};

/* ==========================================================
   COMPONENT
========================================================== */

const PlaceDetails = () => {
  const { id } = useParams();

  /* ========================================================
     STATES
  ======================================================== */

  const [place, setPlace] =
    useState(null);

  const [availableTrips, setAvailableTrips] =
    useState([]);

  const [featuredPlaces, setFeaturedPlaces] =
    useState([]);

  const [testimonials, setTestimonials] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [loadingTrips, setLoadingTrips] =
    useState(false);

  const [loadingFeatured, setLoadingFeatured] =
    useState(false);

  const [error, setError] =
    useState("");

  const [selectedImage, setSelectedImage] =
    useState(null);

  /* ========================================================
     FETCH PLACE
  ======================================================== */

  const fetchPlace = useCallback(
    async () => {
      if (!id) {
        return;
      }

      setLoading(true);
      setError("");

      try {
        const response =
          await apiRequest(
            `/places/${id}`
          );

        console.log(
          "PLACE API RESPONSE:",
          response
        );

        if (!response.ok) {
          throw new Error(
            response.data?.message ||
              "فشل في جلب بيانات المكان"
          );
        }

        const rawPlace =
          response.data?.data;

        if (!rawPlace) {
          throw new Error(
            "لم يتم العثور على بيانات المكان"
          );
        }

        const normalizedPlace =
          normalizePlace(rawPlace);

        console.log(
          "NORMALIZED PLACE:",
          normalizedPlace
        );

        setPlace(normalizedPlace);

        /* الصورة الرئيسية */

        if (
          normalizedPlace.images?.length
        ) {
          setSelectedImage(
            normalizedPlace.images[0]
          );
        }

        /* Reviews */

        if (
          Array.isArray(
            normalizedPlace.reviews
          )
        ) {
          setTestimonials(
            normalizedPlace.reviews
          );
        }

        /* Trips */

        if (
          Array.isArray(
            normalizedPlace.trips
          ) &&
          normalizedPlace.trips.length > 0
        ) {
          setAvailableTrips(
            normalizedPlace.trips
              .map(normalizeTrip)
              .filter(Boolean)
          );
        }
      } catch (err) {
        console.error(
          "ERROR FETCHING PLACE:",
          err
        );

        setError(
          err.message ||
            "حدث خطأ أثناء تحميل بيانات المكان"
        );
      } finally {
        setLoading(false);
      }
    },
    [id]
  );

  /* ========================================================
     FETCH TRIPS
  ======================================================== */

  const fetchTrips = useCallback(
    async () => {
      if (!id) {
        return;
      }

      setLoadingTrips(true);

      try {
        const response =
          await apiRequest(
            "/trips?per_page=100"
          );

        console.log(
          "TRIPS API RESPONSE:",
          response
        );

        if (!response.ok) {
          console.error(
            "FAILED TO FETCH TRIPS:",
            response.data
          );

          return;
        }

        const rawTrips =
          response.data?.data;

        if (
          !Array.isArray(rawTrips)
        ) {
          setAvailableTrips([]);
          return;
        }

        const placeId =
          Number(id);

        const normalizedTrips =
          rawTrips
            .map(normalizeTrip)
            .filter(Boolean);

        const filteredTrips =
          normalizedTrips.filter(
            (trip) => {
              if (
                !Array.isArray(
                  trip.places
                )
              ) {
                return false;
              }

              return trip.places.some(
                (tripPlace) =>
                  Number(
                    tripPlace?.id
                  ) === placeId
              );
            }
          );

        console.log(
          "TRIPS FOR PLACE:",
          filteredTrips
        );

        setAvailableTrips(
          filteredTrips
        );
      } catch (err) {
        console.error(
          "ERROR FETCHING TRIPS:",
          err
        );

        setAvailableTrips([]);
      } finally {
        setLoadingTrips(false);
      }
    },
    [id]
  );

  /* ========================================================
     FETCH FEATURED PLACES
  ======================================================== */

  const fetchFeaturedPlaces =
    useCallback(async () => {
      setLoadingFeatured(true);

      try {
        const response =
          await apiRequest(
            "/places/featured?limit=10"
          );

        console.log(
          "FEATURED PLACES RESPONSE:",
          response
        );

        if (!response.ok) {
          setFeaturedPlaces([]);
          return;
        }

        const rawPlaces =
          response.data?.data;

        if (
          !Array.isArray(rawPlaces)
        ) {
          setFeaturedPlaces([]);
          return;
        }

        const normalizedPlaces =
          rawPlaces
            .map(
              normalizeFeaturedPlace
            )
            .filter(Boolean)
            .filter(
              (item) =>
                Number(item.id) !==
                Number(id)
            );

        setFeaturedPlaces(
          normalizedPlaces
        );
      } catch (err) {
        console.error(
          "ERROR FETCHING FEATURED PLACES:",
          err
        );

        setFeaturedPlaces([]);
      } finally {
        setLoadingFeatured(false);
      }
    }, [id]);

  /* ========================================================
     LOAD DATA
  ======================================================== */

  useEffect(() => {
    fetchPlace();
  }, [fetchPlace]);

  useEffect(() => {
    fetchTrips();
  }, [fetchTrips]);

  useEffect(() => {
    fetchFeaturedPlaces();
  }, [fetchFeaturedPlaces]);

  /* ========================================================
     DATA
  ======================================================== */

  const tripsData = useMemo(() => {
    if (
      availableTrips.length > 0
    ) {
      return availableTrips;
    }

    if (
      Array.isArray(place?.trips)
    ) {
      return place.trips
        .map(normalizeTrip)
        .filter(Boolean);
    }

    return [];
  }, [
    availableTrips,
    place?.trips,
  ]);

  const relatedPlacesData =
    useMemo(() => {
      if (
        featuredPlaces.length > 0
      ) {
        return featuredPlaces;
      }

      if (
        Array.isArray(
          place?.related_places
        )
      ) {
        return place.related_places
          .map(
            normalizeFeaturedPlace
          )
          .filter(Boolean)
          .filter(
            (item) =>
              Number(item.id) !==
              Number(id)
          );
      }

      return [];
    }, [
      featuredPlaces,
      place?.related_places,
      id,
    ]);

  /* ========================================================
     CAROUSELS
  ======================================================== */

  const trips = useCarousel(
    tripsData,
    3
  );

  const testimonialsCarousel =
    useCarousel(
      testimonials,
      3
    );

  const relatedPlaces =
    useCarousel(
      relatedPlacesData,
      3
    );

  /* ========================================================
     LOADING
  ======================================================== */

  if (loading) {
    return (
      <>
        <Header />

        <main className="place-details-page">
          <section className="loading-section">
            <div className="loading-spinner"></div>

            <p>
              جاري تحميل بيانات المكان...
            </p>
          </section>
        </main>

        <Footer />
      </>
    );
  }

  /* ========================================================
     ERROR
  ======================================================== */

  if (error || !place) {
    return (
      <>
        <Header />

        <main className="place-details-page">
          <section className="error-section">
            <h2>
              عذراً
            </h2>

            <p>
              {error ||
                "المكان غير موجود"}
            </p>
          </section>
        </main>

        <Footer />
      </>
    );
  }

  /* ========================================================
     VALUES
  ======================================================== */

  const features =
    Array.isArray(place.features)
      ? place.features
      : [];

  const description =
    place.description || "";

  const gallery =
    place.images?.length > 0
      ? place.images
      : place.cover_image
      ? [place.cover_image]
      : [];

  const mainImage =
    selectedImage ||
    gallery[0] ||
    null;

  return (
    <>
      <Header />

      <main
        className="place-details-page"
        dir="rtl"
      >

        {/* ==================================================
            BREADCRUMB
        ================================================== */}

        <div className="place-breadcrumb">
          <span>الرئيسية</span>
          <span>←</span>
          <span>استكشاف</span>
          <span>←</span>
          <strong>
            تفاصيل المكان
          </strong>
        </div>

        {/* ==================================================
            IMAGE GALLERY
        ================================================== */}

        <section className="place-gallery">

          <div className="gallery-side">

            {gallery[1] && (
              <button
                className="gallery-small-image"
                onClick={() =>
                  setSelectedImage(
                    gallery[1]
                  )
                }
              >
                <img
                  src={gallery[1]}
                  alt={place.name}
                />
              </button>
            )}

            {gallery[2] && (
              <button
                className="gallery-small-image gallery-last"
                onClick={() =>
                  setSelectedImage(
                    gallery[2]
                  )
                }
              >
                <img
                  src={gallery[2]}
                  alt={place.name}
                />

                {gallery.length > 3 && (
                  <span className="more-images">
                    +{gallery.length - 3} صور
                  </span>
                )}
              </button>
            )}

          </div>

          <div className="gallery-main">

            {mainImage ? (
              <img
                src={mainImage}
                alt={place.name}
              />
            ) : (
              <div className="image-placeholder">
                <FiImage />
                <span>
                  لا توجد صورة
                </span>
              </div>
            )}

          </div>

        </section>

        {/* ==================================================
            PLACE HEADER
        ================================================== */}

        <section className="place-main-info">

          <div className="place-title-row">

            <div>
              <h1>
                {place.name}
              </h1>

              {place.address && (
                <div className="place-location">
                  <FiMapPin />

                  <span>
                    {place.address}
                  </span>
                </div>
              )}
            </div>

            {place.rating_avg > 0 && (
              <div className="place-rating">
                <FiStar />

                <strong>
                  {place.rating_avg.toFixed(1)}
                </strong>

                <span>
                  ({place.reviews_count} تقييم)
                </span>
              </div>
            )}

          </div>

          {/* Description */}

          <div className="place-description">

            {description
              .split(/\n\s*\n/)
              .map(
                (paragraph, index) => (
                  <p key={index}>
                    {paragraph}
                  </p>
                )
              )}

          </div>

        </section>

        {/* ==================================================
            FEATURES
        ================================================== */}

        {features.length > 0 && (
          <section className="place-features-section">

            <h2>
              ميزات المكان
            </h2>

            <div className="features-list">

              {features.map(
                (feature, index) => {

                  const featureIcon =
                    feature?.icon ||
                    "image";

                  const Icon =
                    FEATURE_ICONS[
                      featureIcon
                    ] || FiImage;

                  return (
                    <div
                      className="feature-item"
                      key={
                        feature?.id ||
                        index
                      }
                    >

                      <div className="feature-icon">
                        <Icon />
                      </div>

                      <div>
                        <span>
                          {feature?.label ||
                            feature?.name ||
                            featureIcon}
                        </span>
                      </div>

                    </div>
                  );
                }
              )}

            </div>

          </section>
        )}

        {/* ==================================================
            AVAILABLE TRIPS
        ================================================== */}

        <section className="details-section">

          <div className="section-header">

            <div>
              <h2>
                الرحلات المتاحة
              </h2>

              <p className="section-subtitle">
                رحلات سياحية متنوعة تجمع بين
                أبرز الوجهات والخدمات لتمنحك
                تجربة مميزة ومتكاملة.
              </p>
            </div>

            {tripsData.length > 3 && (
              <CarouselArrows
                label="الرحلات"
                onPrevious={
                  trips.goPrevious
                }
                onNext={
                  trips.goNext
                }
                canGoPrevious={
                  trips.canGoPrevious
                }
                canGoNext={
                  trips.canGoNext
                }
              />
            )}

          </div>

          {loadingTrips ? (
            <p className="empty-section">
              جاري تحميل الرحلات...
            </p>
          ) : trips.visible.length > 0 ? (

            <div className="cards-container">

              {trips.visible.map(
                (trip) => (
                  <TripCard
                    key={trip.id}
                    trip={trip}
                    badgeLabel={
                      trip.badgeLabel
                    }
                  />
                )
              )}

            </div>

          ) : (
            <p className="empty-section">
              لا توجد رحلات متاحة لهذا
              المكان حالياً.
            </p>
          )}

        </section>

        {/* ==================================================
            TESTIMONIALS
        ================================================== */}

        <section className="details-section">

          <div className="section-header">

            <div>
              <h2>
                آراء زوّار Baladna
              </h2>

              <p className="section-subtitle">
                تجارب حقيقية من مستخدمي
                Baladna
              </p>
            </div>

            {testimonials.length > 3 && (
              <CarouselArrows
                label="الآراء"
                onPrevious={
                  testimonialsCarousel.goPrevious
                }
                onNext={
                  testimonialsCarousel.goNext
                }
                canGoPrevious={
                  testimonialsCarousel.canGoPrevious
                }
                canGoNext={
                  testimonialsCarousel.canGoNext
                }
              />
            )}

          </div>

          {testimonialsCarousel.visible.length >
          0 ? (

            <div className="reviews-grid">

              {testimonialsCarousel.visible.map(
                (testimonial) => (
                  <TestimonialCard
                    key={
                      testimonial.id
                    }
                    testimonial={
                      testimonial
                    }
                  />
                )
              )}

            </div>

          ) : (

            <p className="empty-section">
              لا توجد آراء لهذا المكان
              حالياً.
            </p>

          )}

        </section>

        {/* ==================================================
            RELATED PLACES
        ================================================== */}

        <section className="details-section featured-section">

          <div className="section-header">

            <div>
              <h2>
                أماكن مميزة قد تعجبك
              </h2>

              <p className="section-subtitle">
                اكتشف المزيد من الأماكن
                السياحية المميزة في سوريا.
              </p>
            </div>

            {relatedPlacesData.length > 3 && (
              <CarouselArrows
                label="الأماكن"
                onPrevious={
                  relatedPlaces.goPrevious
                }
                onNext={
                  relatedPlaces.goNext
                }
                canGoPrevious={
                  relatedPlaces.canGoPrevious
                }
                canGoNext={
                  relatedPlaces.canGoNext
                }
              />
            )}

          </div>

          {loadingFeatured ? (

            <p className="empty-section">
              جاري تحميل الأماكن...
            </p>

          ) : relatedPlaces.visible.length >
            0 ? (

            <div className="cards-container">

              {relatedPlaces.visible.map(
                (relatedPlace) => (
                  <PlaceCard
                    key={
                      relatedPlace.id
                    }
                    place={
                      relatedPlace
                    }
                  />
                )
              )}

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