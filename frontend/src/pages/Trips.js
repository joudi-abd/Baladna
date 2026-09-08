import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";

import {
  FiSearch,
} from "react-icons/fi";

import TripCard from "../components/TripCard";

import Header from "../components/Header";

import Footer from "../components/Footer";

import CarouselArrows from "../components/CarouselArrows";

import { apiRequest } from "../api/api";

import "../styles/Trips.css";

/*
 * =========================================================
 * API CONFIG
 * =========================================================
 */

const API_BASE =
  process.env.REACT_APP_API_BASE ||
  "https://ocelot-murmuring-subplot.ngrok-free.dev/api";

const API_ORIGIN =
  API_BASE.replace(/\/api\/?$/, "");

/*
 * =========================================================
 * FILTER OPTIONS
 * =========================================================
 */

const budgetOptions = [
  {
    value: "under1000",
    label: "أقل من 1000",
  },
  {
    value: "1000-2500",
    label: "1000 - 2500",
  },
  {
    value: "2500-5000",
    label: "2500 - 5000",
  },
  {
    value: "over5000",
    label: "أكثر من 5000",
  },
];

const transportationOptions = [
  {
    value: "bus",
    label: "باص",
  },
  {
    value: "mini_bus",
    label: "ميني باص",
  },
  {
    value: "train",
    label: "قطار",
  },
  {
    value: "tour_bus",
    label: "باص سياحي",
  },
];

/*
 * =========================================================
 * IMAGE URL NORMALIZER
 * =========================================================
 *
 * Database:
 *
 * images/example.jpg
 *
 * Real file:
 *
 * public/storage/Images/example.jpg
 *
 * Public URL:
 *
 * /storage/Images/example.jpg
 *
 * =========================================================
 */

const normalizeImageUrl = (image) => {
  if (!image || typeof image !== "string") {
    return null;
  }

  const cleanImage = image.trim();

  if (!cleanImage) {
    return null;
  }

  // Full URL
  if (
    cleanImage.startsWith("http://") ||
    cleanImage.startsWith("https://")
  ) {
    try {
      const url = new URL(cleanImage);

      const apiOrigin = new URL(API_ORIGIN);

      url.protocol = apiOrigin.protocol;
      url.host = apiOrigin.host;

      // توحيد اسم مجلد الصور
      url.pathname = url.pathname.replace(
        /\/storage\/images\//i,
        "/storage/Images/"
      );

      return url.toString();
    } catch (error) {
      console.error("IMAGE URL NORMALIZATION ERROR:", error);
      return cleanImage;
    }
  }

  // Relative path
  let cleanPath = cleanImage.replace(/^\/+/, "");

  if (/^images\//i.test(cleanPath)) {
    cleanPath = `storage/Images/${cleanPath.substring(7)}`;
  } else if (/^storage\/images\//i.test(cleanPath)) {
    cleanPath = `storage/Images/${cleanPath.substring(15)}`;
  } else if (!/^storage\//i.test(cleanPath)) {
    cleanPath = `storage/Images/${cleanPath}`;
  }

  const encodedPath = cleanPath
    .split("/")
    .map((part) => (part ? encodeURIComponent(part) : ""))
    .join("/");

  return `${API_ORIGIN}/${encodedPath}`;
};

/*
 * =========================================================
 * NORMALIZE TRIP
 * =========================================================
 */

const normalizeTrip = (trip) => {
  if (!trip) {
    return null;
  }

  /*
   * الصورة قد تأتي من:
   *
   * cover_image
   * image
   */

  const rawImage =
    trip.cover_image ??
    trip.image ??
    null;

  const imageUrl =
    normalizeImageUrl(rawImage);

  const normalizedTrip = {
    ...trip,

    /*
     * الصورة الأصلية
     */
    cover_image:
      rawImage,

    /*
     * الصورة الجاهزة للعرض
     */
    imageUrl,

    /*
     * توافق مع أي component قد يستخدم image
     */
    image: imageUrl,

    /*
     * القيم التي يستخدمها TripCard
     */

    price:
      trip.price ??
      trip.price_per_person ??
      0,

    price_per_person:
      trip.price_per_person ??
      trip.price ??
      0,

    duration:
      trip.duration ??
      trip.duration_hours ??
      null,

    duration_hours:
      trip.duration_hours ??
      trip.duration ??
      null,

    available_seats:
      trip.available_seats ??
      trip.max_participants ??
      0,

    meeting_point:
      trip.meeting_point ??
      "غير محددة",

    transportation_type:
      trip.transportation_type ??
      "",

    rating_avg:
      trip.rating_avg ??
      0,

    reviews_count:
      trip.reviews_count ??
      0,

    description:
      trip.description ??
      "",

    title:
      trip.title ??
      "رحلة بدون اسم",

    status:
      trip.status ??
      "upcoming",
  };

  return normalizedTrip;
};

/*
 * =========================================================
 * COMPONENT
 * =========================================================
 */

const Trips = () => {
  const [trips, setTrips] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [search, setSearch] =
    useState("");

  const [cities, setCities] =
    useState([]);

  const [categories, setCategories] =
    useState([]);

  const [cityId, setCityId] =
    useState("");

  const [categoryId, setCategoryId] =
    useState("");

  const [budget, setBudget] =
    useState("");

  const [
    transportationType,
    setTransportationType,
  ] = useState("");

  const [tripDate, setTripDate] =
    useState("");

  const resultsRef =
    useRef(null);

  /*
   * =====================================================
   * SCROLL TO RESULTS
   * =====================================================
   */

  const scrollToResults =
    useCallback(() => {
      if (!resultsRef.current) {
        return;
      }

      resultsRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, []);

  /*
   * =====================================================
   * FETCH TRIPS
   * =====================================================
   */

  const fetchTrips =
    useCallback(
      async (filters = {}) => {
        setLoading(true);

        try {
          const currentSearch =
            filters.search !== undefined
              ? filters.search
              : search;

          const currentCityId =
            filters.cityId !== undefined
              ? filters.cityId
              : cityId;

          const currentCategoryId =
            filters.categoryId !==
            undefined
              ? filters.categoryId
              : categoryId;

          const currentBudget =
            filters.budget !== undefined
              ? filters.budget
              : budget;

          const currentTransportationType =
            filters.transportationType !==
            undefined
              ? filters.transportationType
              : transportationType;

          const currentTripDate =
            filters.tripDate !== undefined
              ? filters.tripDate
              : tripDate;

          const params =
            new URLSearchParams();

          /*
           * ================================
           * SEARCH
           * ================================
           */

          if (
            currentSearch.trim() !== ""
          ) {
            params.append(
              "search",
              currentSearch.trim()
            );
          }

          /*
           * ================================
           * CITY
           * ================================
           */

          if (
            currentCityId !== ""
          ) {
            params.append(
              "city_id",
              currentCityId
            );
          }

          /*
           * ================================
           * CATEGORY
           * ================================
           */

          if (
            currentCategoryId !==
            ""
          ) {
            params.append(
              "category_id",
              currentCategoryId
            );
          }

          /*
           * ================================
           * BUDGET
           * ================================
           */

          if (
            currentBudget ===
            "under1000"
          ) {
            params.append(
              "budget_min",
              "0"
            );

            params.append(
              "budget_max",
              "1000"
            );
          }

          else if (
            currentBudget ===
            "1000-2500"
          ) {
            params.append(
              "budget_min",
              "1000"
            );

            params.append(
              "budget_max",
              "2500"
            );
          }

          else if (
            currentBudget ===
            "2500-5000"
          ) {
            params.append(
              "budget_min",
              "2500"
            );

            params.append(
              "budget_max",
              "5000"
            );
          }

          else if (
            currentBudget ===
            "over5000"
          ) {
            params.append(
              "budget_min",
              "5000"
            );
          }

          /*
           * ================================
           * TRANSPORTATION
           * ================================
           */

          if (
            currentTransportationType !==
            ""
          ) {
            params.append(
              "transportation_type",
              currentTransportationType
            );
          }

          /*
           * ================================
           * DATE
           * ================================
           */

          if (
            currentTripDate !== ""
          ) {
            params.append(
              "trip_date",
              currentTripDate
            );
          }

          const query =
            params.toString();

          const endpoint =
            `/trips${
              query
                ? `?${query}`
                : ""
            }`;

          console.log(
            "TRIPS API ENDPOINT:",
            endpoint
          );

          /*
           * ================================
           * API
           * ================================
           */

          const result =
            await apiRequest(
              endpoint
            );

          console.log(
            "TRIPS API RESPONSE:",
            result
          );

          if (!result.ok) {
            throw new Error(
              `حدث خطأ أثناء جلب الرحلات (${result.status})`
            );
          }

          /*
           * ================================
           * RAW DATA
           * ================================
           */

          const rawTrips =
            Array.isArray(
              result.data?.data
            )
              ? result.data.data
              : [];

          console.log(
            "RAW TRIPS:",
            rawTrips
          );

          /*
           * ================================
           * NORMALIZE
           * ================================
           */

          const normalizedTrips =
            rawTrips
              .map(
                normalizeTrip
              )
              .filter(
                Boolean
              );

          /*
           * ================================
           * IMAGE DEBUG
           * ================================
           */

          console.table(
            normalizedTrips.map(
              (trip) => ({
                id: trip.id,

                title:
                  trip.title,

                originalImage:
                  trip.cover_image,

                normalizedImage:
                  trip.imageUrl,
              })
            )
          );

          setTrips(
            normalizedTrips
          );

        } catch (error) {
          console.error(
            "Error fetching trips:",
            error
          );

          setTrips([]);

        } finally {
          setLoading(false);
        }
      },
      [
        search,
        cityId,
        categoryId,
        budget,
        transportationType,
        tripDate,
      ]
    );

  /*
   * =====================================================
   * FETCH FILTER DATA
   * =====================================================
   */

  const fetchFilterData =
    useCallback(
      async () => {
        try {
          const [
            citiesResult,
            categoriesResult,
          ] =
            await Promise.all([
              apiRequest(
                "/cities"
              ),

              apiRequest(
                "/categories"
              ),
            ]);

          /*
           * Cities
           */

          if (
            !citiesResult.ok
          ) {
            throw new Error(
              `فشل جلب المدن (${citiesResult.status})`
            );
          }

          /*
           * Categories
           */

          if (
            !categoriesResult.ok
          ) {
            throw new Error(
              `فشل جلب التصنيفات (${categoriesResult.status})`
            );
          }

          console.log(
            "CITIES:",
            citiesResult.data
          );

          console.log(
            "CATEGORIES:",
            categoriesResult.data
          );

          setCities(
            Array.isArray(
              citiesResult.data?.data
            )
              ? citiesResult.data.data
              : []
          );

          setCategories(
            Array.isArray(
              categoriesResult.data?.data
            )
              ? categoriesResult.data.data
              : []
          );

        } catch (error) {
          console.error(
            "Error fetching filter data:",
            error
          );

          setCities([]);
          setCategories([]);
        }
      },
      []
    );

  /*
   * =====================================================
   * INITIAL LOAD
   * =====================================================
   */

  useEffect(() => {
    fetchTrips();
    fetchFilterData();
  }, [
    fetchTrips,
    fetchFilterData,
  ]);

  /*
   * =====================================================
   * APPLY FILTERS
   * =====================================================
   */

  const handleApplyFilters =
    () => {
      fetchTrips();
      scrollToResults();
    };

  /*
   * =====================================================
   * RESET FILTERS
   * =====================================================
   */

  const handleResetFilters =
    () => {
      setSearch("");
      setCityId("");
      setCategoryId("");
      setBudget("");
      setTransportationType("");
      setTripDate("");

      fetchTrips({
        search: "",
        cityId: "",
        categoryId: "",
        budget: "",
        transportationType: "",
        tripDate: "",
      });

      scrollToResults();
    };

  /*
   * =====================================================
   * ENTER SEARCH
   * =====================================================
   */

  const handleKeyDown =
    (event) => {
      if (
        event.key ===
        "Enter"
      ) {
        fetchTrips();
        scrollToResults();
      }
    };

  /*
   * =====================================================
   * RENDER
   * =====================================================
   */

  return (
    <div className="trips-page-container">

      <Header />

      <div
        className="trips-decoration trips-decoration-right"
        aria-hidden="true"
      />

      <div
        className="trips-decoration trips-decoration-left"
        aria-hidden="true"
      />

      {/* ==========================================
          HERO
      ========================================== */}

      <header className="trips-hero">

        <div className="hero-overlay">

          <h1>
            الرحلات السياحية
          </h1>

          <p>
            اكتشف مجموعة متنوعة من الرحلات
            السياحية المصمّمة بعناية لتناسب
            أبرز الوجهات والمعالم، واختر
            التجربة التي تناسب اهتماماتك وابدأ
            رحلتك بكل سهولة.
          </p>

          {/* Search */}

          <div className="search-bar-container">

            <input
              type="text"
              placeholder="ابحث عن رحلة ...."
              className="search-input"
              value={search}
              onChange={(event) => {
                setSearch(
                  event.target.value
                );
              }}
              onKeyDown={
                handleKeyDown
              }
            />

            <button
              className="search-btn"
              type="button"
              aria-label="بحث"
              onClick={() => {
                fetchTrips();
                scrollToResults();
              }}
            >
              <FiSearch />
            </button>

          </div>

        </div>

      </header>

      {/* ==========================================
          FILTERS
      ========================================== */}

      <section className="filter-section">

        <div className="filter-bar">

          {/* CITY */}

          <div className="filter-group">

            <label>
              المدينة
            </label>

            <select
              value={cityId}
              onChange={(event) => {
                setCityId(
                  event.target.value
                );
              }}
            >

              <option value="">
                اختر مدينة
              </option>

              {cities.map(
                (city) => (
                  <option
                    key={city.id}
                    value={city.id}
                  >
                    {city.name}
                  </option>
                )
              )}

            </select>

          </div>

          {/* CATEGORY */}

          <div className="filter-group">

            <label>
              نوع المكان
            </label>

            <select
              value={categoryId}
              onChange={(event) => {
                setCategoryId(
                  event.target.value
                );
              }}
            >

              <option value="">
                اختر نوع
              </option>

              {categories.map(
                (category) => (
                  <option
                    key={
                      category.id
                    }
                    value={
                      category.id
                    }
                  >
                    {
                      category.name
                    }
                  </option>
                )
              )}

            </select>

          </div>

          {/* BUDGET */}

          <div className="filter-group">

            <label>
              الميزانية
            </label>

            <select
              value={budget}
              onChange={(event) => {
                setBudget(
                  event.target.value
                );
              }}
            >

              <option value="">
                اختر مجال
              </option>

              {budgetOptions.map(
                (option) => (
                  <option
                    key={
                      option.value
                    }
                    value={
                      option.value
                    }
                  >
                    {
                      option.label
                    }
                  </option>
                )
              )}

            </select>

          </div>

          {/* TRANSPORTATION */}

          <div className="filter-group">

            <label>
              نوع النقل
            </label>

            <select
              value={
                transportationType
              }
              onChange={(event) => {
                setTransportationType(
                  event.target.value
                );
              }}
            >

              <option value="">
                اختر نوع النقل
              </option>

              {transportationOptions.map(
                (option) => (
                  <option
                    key={
                      option.value
                    }
                    value={
                      option.value
                    }
                  >
                    {
                      option.label
                    }
                  </option>
                )
              )}

            </select>

          </div>

          {/* DATE */}

          <div className="filter-group">

            <label>
              تاريخ الرحلة
            </label>

            <input
              type="date"
              value={tripDate}
              onChange={(event) => {
                setTripDate(
                  event.target.value
                );
              }}
            />

          </div>

          {/* APPLY */}

          <button
            className="btn-apply-filters"
            onClick={
              handleApplyFilters
            }
            type="button"
          >
            تطبيق الفلاتر
          </button>

        </div>

      </section>

      {/* ==========================================
          TRIPS
      ========================================== */}

      <main
        className="trips-main-content"
        ref={resultsRef}
      >

        <div className="section-header">

          <div>

            <h2>
              الرحلات المتاحة
            </h2>

            <p className="section-subtitle">
              اختر من بين مجموعة من الرحلات
              المتوفرة واحجز الرحلة التي تناسبك
            </p>

          </div>

          <CarouselArrows
            label="الرحلات"
            onPrevious={() => {}}
            onNext={() => {}}
            canGoPrevious={false}
            canGoNext={false}
          />

        </div>

        {/* LOADING */}

        {loading ? (
          <div className="no-trips">
            جاري تحميل الرحلات...
          </div>
        ) : trips.length === 0 ? (
          <div className="no-trips">
            لا توجد رحلات مطابقة للبحث أو الفلاتر.
          </div>
        ) : (
          <div className="trips-grid">

            {trips.map(
              (trip) => (
                <TripCard
                  key={trip.id}
                  trip={trip}
                  badgeLabel={
                    trip.badgeLabel
                  }
                  variant="listing"
                />
              )
            )}

          </div>
        )}

      </main>

      <Footer />

    </div>
  );
};

export default Trips;