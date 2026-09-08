import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";

import { FiSearch } from "react-icons/fi";

import Header from "../components/Header";
import Footer from "../components/Footer";
import ExplorationFilters from "../components/ExplorationFilters";
import PlaceCard from "../components/PlaceCard";
import Pagination from "../components/Pagination";

import { apiRequest } from "../api/api";

import "../styles/Exploration.css";

const Exploration = () => {

  // =====================================================
  // الأماكن
  // =====================================================

  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);

  // =====================================================
  // بيانات الفلاتر
  // =====================================================

  const [cities, setCities] = useState([]);
  const [categories, setCategories] = useState([]);
  const [features, setFeatures] = useState([]);

  // =====================================================
  // قيم الفلاتر الأساسية
  // =====================================================

  const [search, setSearch] = useState("");
  const [cityId, setCityId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [featureIds, setFeatureIds] = useState([]);

  // =====================================================
  // التقييم
  // =====================================================

  const [selectedRating, setSelectedRating] = useState("");

  // =====================================================
  // الترتيب
  // =====================================================

  const [sort, setSort] = useState("rating");

  // =====================================================
  // Pagination
  // =====================================================

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  // =====================================================
  // Abort Controller
  // =====================================================

  const abortControllerRef = useRef(null);

  // =====================================================
  // نتائج البحث
  // =====================================================

  const resultsRef = useRef(null);

  // =====================================================
  // البحث
  // =====================================================

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  // =====================================================
  // Scroll للنتائج
  // =====================================================

  const scrollToResults = () => {
    resultsRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  // =====================================================
  // استخراج البيانات من Response
  // =====================================================

  const listFromResponse = (response) => {
    if (!response) {
      return [];
    }

    if (Array.isArray(response)) {
      return response;
    }

    if (Array.isArray(response.data)) {
      return response.data;
    }

    return [];
  };

  // =====================================================
  // أسماء المدن للـ ExplorationFilters
  // =====================================================

  const cityOptions = cities.map((city) => city.name);

  // =====================================================
  // أسماء التصنيفات للـ ExplorationFilters
  // =====================================================

  const typeOptions = categories.map(
    (category) => category.name
  );

  // =====================================================
  // خيارات التقييم
  // =====================================================

  const ratingOptions = [
    {
      value: "5",
      label: "5 نجوم فأكثر",
    },
    {
      value: "4",
      label: "4 نجوم فأكثر",
    },
    {
      value: "3",
      label: "3 نجوم فأكثر",
    },
    {
      value: "2",
      label: "نجمتان فأكثر",
    },
    {
      value: "1",
      label: "نجمة فأكثر",
    },
  ];

  // =====================================================
  // تحويل المدينة من الاسم إلى ID
  // =====================================================

  const selectedCity = cityId
    ? cities.find(
        (city) =>
          String(city.id) === String(cityId)
      )?.name || ""
    : "";

  const setSelectedCity = (cityName) => {
    const city = cities.find(
      (item) => item.name === cityName
    );

    setCityId(
      city ? String(city.id) : ""
    );
  };

  // =====================================================
  // تحويل نوع المكان من الاسم إلى ID
  // =====================================================

  const selectedType = categoryId
    ? categories.find(
        (category) =>
          String(category.id) ===
          String(categoryId)
      )?.name || ""
    : "";

  const setSelectedType = (typeName) => {
    const category = categories.find(
      (item) => item.name === typeName
    );

    setCategoryId(
      category
        ? String(category.id)
        : ""
    );
  };

  // =====================================================
  // تحميل بيانات الفلاتر
  // =====================================================

  const loadFilters = async () => {
    try {
      const [
        citiesResult,
        categoriesResult,
        featuresResult,
      ] = await Promise.all([
        apiRequest("/cities"),
        apiRequest("/categories"),
        apiRequest("/features"),
      ]);

      // =========================
      // المدن
      // =========================

      if (!citiesResult.ok) {
        throw new Error(
          `Cities request failed: ${citiesResult.status}`
        );
      }

      // =========================
      // التصنيفات
      // =========================

      if (!categoriesResult.ok) {
        throw new Error(
          `Categories request failed: ${categoriesResult.status}`
        );
      }

      // =========================
      // الميزات
      // =========================

      if (!featuresResult.ok) {
        throw new Error(
          `Features request failed: ${featuresResult.status}`
        );
      }

      const citiesData =
        citiesResult.data;

      const categoriesData =
        categoriesResult.data;

      const featuresData =
        featuresResult.data;

      console.log(
        "Cities:",
        citiesData
      );

      console.log(
        "Categories:",
        categoriesData
      );

      console.log(
        "Features:",
        featuresData
      );

      setCities(
        listFromResponse(
          citiesData
        )
      );

      setCategories(
        listFromResponse(
          categoriesData
        )
      );

      setFeatures(
        listFromResponse(
          featuresData
        )
      );
    } catch (error) {
      console.error(
        "Error fetching filter data:",
        error
      );

      setCities([]);
      setCategories([]);
      setFeatures([]);
    }
  };

  // =====================================================
  // جلب الأماكن
  // =====================================================

  const fetchPlaces = useCallback(
    async (
      page = 1,
      filters = {}
    ) => {
      setLoading(true);

      // إلغاء الطلب السابق
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      const controller =
        new AbortController();

      abortControllerRef.current =
        controller;

      try {
        // =========================
        // القيم الحالية
        // =========================

        const currentSearch =
          filters.search !== undefined
            ? filters.search
            : search;

        const currentCityId =
          filters.cityId !== undefined
            ? filters.cityId
            : cityId;

        const currentCategoryId =
          filters.categoryId !== undefined
            ? filters.categoryId
            : categoryId;

        const currentFeatureIds =
          filters.featureIds !== undefined
            ? filters.featureIds
            : featureIds;

        // =========================
        // Query Parameters
        // =========================

        const params =
          new URLSearchParams();

        params.append(
          "page",
          String(page)
        );

        // =========================
        // البحث
        // =========================

        if (
          currentSearch &&
          currentSearch.trim() !== ""
        ) {
          params.append(
            "search",
            currentSearch.trim()
          );
        }

        // =========================
        // المدينة
        // =========================

        if (currentCityId !== "") {
          params.append(
            "city_id",
            String(currentCityId)
          );
        }

        // =========================
        // التصنيف
        // =========================

        if (
          currentCategoryId !== ""
        ) {
          params.append(
            "category_id",
            String(currentCategoryId)
          );
        }

        // =========================
        // الميزات
        // =========================

        if (
          Array.isArray(
            currentFeatureIds
          ) &&
          currentFeatureIds.length > 0
        ) {
          currentFeatureIds.forEach(
            (featureId) => {
              params.append(
                "feature_ids[]",
                String(featureId)
              );
            }
          );
        }

        const endpoint =
          `/places?${params.toString()}`;

        console.log(
          "PLACES API ENDPOINT:",
          endpoint
        );

        // =========================
        // Request
        // =========================

        const result =
          await apiRequest(
            endpoint,
            {
              signal:
                controller.signal,
            }
          );

        console.log(
          "PLACES API RESPONSE:",
          result
        );

        // الطلب ألغي
        if (controller.signal.aborted) {
          return;
        }

        if (!result.ok) {
          throw new Error(
            `تعذر جلب الأماكن (${result.status})`
          );
        }

        const data =
          result.data;

        // =========================
        // استخراج الأماكن
        // =========================

        const items =
          listFromResponse(data);

        setPlaces(items);

        // =========================
        // Pagination
        // =========================

        const lastPage =
          Number(
            data?.meta?.last_page ??
            data?.last_page ??
            1
          );

        const total =
          Number(
            data?.meta?.total ??
            data?.total ??
            items.length
          );

        setCurrentPage(page);
        setTotalPages(
          lastPage > 0
            ? lastPage
            : 1
        );

        setTotalCount(total);
      } catch (error) {
        if (
          error?.name ===
          "AbortError"
        ) {
          return;
        }

        console.error(
          "Error fetching places:",
          error
        );

        setPlaces([]);
        setTotalPages(1);
        setTotalCount(0);
      } finally {
        if (
          !controller.signal.aborted
        ) {
          setLoading(false);
        }
      }
    },
    [
      search,
      cityId,
      categoryId,
      featureIds,
    ]
  );

  // =====================================================
  // أول تحميل
  // =====================================================

  useEffect(() => {
    loadFilters();
    fetchPlaces(1);

    return () => {
      if (
        abortControllerRef.current
      ) {
        abortControllerRef.current.abort();
      }
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // =====================================================
  // تطبيق الفلاتر
  // =====================================================

  const handleApplyFilters = () => {
    setCurrentPage(1);

    fetchPlaces(1, {
      search,
      cityId,
      categoryId,
      featureIds,
    });

    scrollToResults();
  };

  // الاسم الذي يستخدمه JSX الحالي
  const applyFilters =
    handleApplyFilters;

  // =====================================================
  // إعادة ضبط الفلاتر
  // =====================================================

  const handleResetFilters = () => {
    setSearch("");
    setCityId("");
    setCategoryId("");
    setFeatureIds([]);
    setSelectedRating("");

    fetchPlaces(1, {
      search: "",
      cityId: "",
      categoryId: "",
      featureIds: [],
    });

    scrollToResults();
  };

  // =====================================================
  // تغيير الترتيب
  // =====================================================

  const changeSort = (
    event
  ) => {
    setSort(
      event.target.value
    );
  };

  // =====================================================
  // البحث
  // =====================================================

  const handleSearchKeyDown = (
    event
  ) => {
    if (
      event.key === "Enter"
    ) {
      handleApplyFilters();
    }
  };

  // =====================================================
  // تغيير Feature
  // =====================================================

  const handleFeatureChange = (
    featureId
  ) => {
    setFeatureIds(
      (current) => {
        if (
          current.includes(
            featureId
          )
        ) {
          return current.filter(
            (id) =>
              id !== featureId
          );
        }

        return [
          ...current,
          featureId,
        ];
      }
    );
  };

  // =====================================================
  // ترتيب الأماكن
  // =====================================================

  const sortedPlaces = [...places].sort(
    (a, b) => {
      if (sort === "name") {
        return String(
          a.name ??
          a.title ??
          ""
        ).localeCompare(
          String(
            b.name ??
            b.title ??
            ""
          ),
          "ar"
        );
      }

      return (
        Number(
          b.rating_avg ??
          b.rating ??
          0
        ) -
        Number(
          a.rating_avg ??
          a.rating ??
          0
        )
      );
    }
  );

  // =====================================================
  // فلترة التقييم محليًا
  // =====================================================

  const visiblePlaces =
    selectedRating === ""
      ? sortedPlaces
      : sortedPlaces.filter(
          (place) =>
            Number(
              place.rating_avg ??
              place.rating ??
              0
            ) >=
            Number(
              selectedRating
            )
        );

  // =====================================================
  // lastPage متوافق مع JSX القديم
  // =====================================================

  const lastPage =
    totalPages;

  // =====================================================
  // Render
  // =====================================================

  return (
    <div className="exploration-page">
      <Header />

      <div
        className="exploration-decoration exploration-decoration-right"
        aria-hidden="true"
      ></div>

      <div
        className="exploration-decoration exploration-decoration-left"
        aria-hidden="true"
      ></div>

      <section className="exploration-hero">
        <div className="exploration-hero-overlay">
          <div className="exploration-hero-content">

            <h1>
              اكتشف أماكن مميزة
            </h1>

            <p>
              اكتشف مجموعة من أبرز الوجهات
              والمعالم السياحية التي تم
              اختيارها لتمنحك تجربة
              استثنائية لا تُنسى.
            </p>

            <div className="exploration-search">

              <input
                type="text"
                placeholder="ابحث عن مكان، مدينة أو تجربة.."
                value={search}
                onChange={handleSearchChange}
                onKeyDown={
                  handleSearchKeyDown
                }
              />

              <button
                type="button"
                aria-label="بحث"
                onClick={() => {
                  handleApplyFilters();
                }}
              >
                <FiSearch />
              </button>

            </div>
          </div>
        </div>
      </section>

      <ExplorationFilters
        cities={cityOptions}
        types={typeOptions}
        ratingOptions={ratingOptions}
        selectedCity={selectedCity}
        selectedType={selectedType}
        selectedRating={selectedRating}
        onCityChange={setSelectedCity}
        onTypeChange={setSelectedType}
        onRatingChange={
          setSelectedRating
        }
        onApplyFilters={applyFilters}
      />

      <main
        className="exploration-content"
        ref={resultsRef}
      >
        <div className="exploration-heading">

          <div>

            <h2>
              أماكن مميزة
            </h2>

            <p>
              اكتشف مجموعة من أبرز الوجهات
              والمعالم السياحية التي تم اختيارها
              لتمنحك تجربة استثنائية لا تُنسى.
            </p>

          </div>

          <div className="exploration-sort">

            <label htmlFor="sort">
              ترتيب حسب
            </label>

            <select
              id="sort"
              value={sort}
              onChange={
                changeSort
              }
            >
              <option value="rating">
                الأعلى تقييمًا
              </option>

              <option value="name">
                الاسم
              </option>
            </select>

          </div>
        </div>

        {visiblePlaces.length === 0 ? (

          <div className="exploration-message">
            {loading
              ? "جاري تحميل الأماكن..."
              : "لا توجد أماكن تطابق خيارات البحث."}
          </div>

        ) : (

          <div className="exploration-grid">

            {visiblePlaces.map(
              (place) => (

                <PlaceCard
                  key={place.id}
                  place={place}
                />

              )
            )}

          </div>

        )}

        <Pagination
          currentPage={currentPage}
          lastPage={lastPage}
          onPageChange={
            (page) => {
              if (
                page >= 1 &&
                page <= totalPages &&
                page !== currentPage
              ) {
                fetchPlaces(
                  page,
                  {
                    search,
                    cityId,
                    categoryId,
                    featureIds,
                  }
                );

                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              }
            }
          }
        />

      </main>

      <Footer />
    </div>
  );
};

export default Exploration;