import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ExplorationFilters from "../components/ExplorationFilters";
import PlaceCard from "../components/PlaceCard";
import Pagination from "../components/Pagination";
import "../styles/Exploration.css";

const API_URL = "http://127.0.0.1:8000/api";

function Exploration() {
  const [places, setPlaces] = useState([]);
  const [cities, setCities] = useState([]);
  const [categories, setCategories] = useState([]);
  const [features, setFeatures] = useState([]);

  const [search, setSearch] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedFeatures, setSelectedFeatures] = useState([]);

  const [appliedCity, setAppliedCity] = useState("");
  const [appliedCategory, setAppliedCategory] = useState("");
  const [appliedFeatures, setAppliedFeatures] = useState([]);

  const [sort, setSort] = useState("rating");
  const [currentPage, setCurrentPage] = useState(1);

  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadFilters = async () => {
      try {
        const [citiesRes, categoriesRes, featuresRes] = await Promise.all([
          fetch(`${API_URL}/cities`),
          fetch(`${API_URL}/categories`),
          fetch(`${API_URL}/features`),
        ]);

        if (!citiesRes.ok || !categoriesRes.ok || !featuresRes.ok) {
          throw new Error("Failed to load filters");
        }

        const citiesData = await citiesRes.json();
        const categoriesData = await categoriesRes.json();
        const featuresData = await featuresRes.json();

        setCities(citiesData.data || []);
        setCategories(categoriesData.data || []);
        setFeatures(featuresData.data || []);
      } catch (err) {
        console.error(err);
        setError("حدث خطأ أثناء تحميل خيارات البحث.");
      }
    };

    loadFilters();
  }, []);

  useEffect(() => {
    const loadPlaces = async () => {
      try {
        setLoading(true);
        setError("");

        const params = new URLSearchParams();

        if (search.trim()) params.append("search", search.trim());
        if (appliedCity) params.append("city_id", appliedCity);
        if (appliedCategory) params.append("category_id", appliedCategory);

        appliedFeatures.forEach((id) => {
          params.append("features[]", id);
        });

        params.append("sort", sort);
        params.append("page", currentPage);
        params.append("per_page", 15);

        const response = await fetch(`${API_URL}/places?${params}`);

        if (!response.ok) {
          throw new Error("Failed to load places");
        }

        const data = await response.json();

        setPlaces(data.data || []);
        setPagination(data.meta || null);
      } catch (err) {
        console.error(err);
        setPlaces([]);
        setPagination(null);
        setError("حدث خطأ أثناء تحميل الأماكن.");
      } finally {
        setLoading(false);
      }
    };

    loadPlaces();
  }, [
    search,
    appliedCity,
    appliedCategory,
    appliedFeatures,
    sort,
    currentPage,
  ]);

  const applyFilters = () => {
    setAppliedCity(selectedCity);
    setAppliedCategory(selectedCategory);
    setAppliedFeatures(selectedFeatures);
    setCurrentPage(1);
  };

  const changeSort = (event) => {
    setSort(event.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="exploration-page">
      <Header />

      <section className="exploration-hero">
        <div className="exploration-hero-overlay">
          <div className="exploration-hero-content">
            <h1>اكتشف أماكن مميزة</h1>

            <p>
             اكتشف مجموعة من أبرز الوجهات والمعالم السياحية التي تم اختيارها لتمنحك تجربة استثنائية لا تُنسى.
            </p>

            <div className="exploration-search">
              <input
                type="text"
                placeholder="ابحث عن مكان، مدينة أو تجربة.."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <button
                type="button"
                onClick={() => setCurrentPage(1)}
              >
                🔍
              </button>
            </div>
          </div>
        </div>
      </section>

      <ExplorationFilters
        cities={cities}
        categories={categories}
        features={features}
        selectedCity={selectedCity}
        selectedCategory={selectedCategory}
        selectedFeatures={selectedFeatures}
        onCityChange={setSelectedCity}
        onCategoryChange={setSelectedCategory}
        onFeaturesChange={setSelectedFeatures}
        onApplyFilters={applyFilters}
      />

      <main className="exploration-content">
        <div className="exploration-heading">
          <div>
            <h2>أماكن مميزة</h2>
            <p>
             اكتشف مجموعة من أبرز الوجهات والمعالم السياحية التي تم اختيارها لتمنحك تجربة استثنائية لا تُنسى.
            </p>
          </div>

          <div className="exploration-sort">
            <label htmlFor="sort">ترتيب حسب</label>

            <select id="sort" value={sort} onChange={changeSort}>
              <option value="rating">الأعلى تقييمًا</option>
              <option value="name">الاسم</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="exploration-message">
            جاري تحميل الأماكن...
          </div>
        ) : error ? (
          <div className="exploration-message exploration-error">
            {error}
          </div>
        ) : places.length === 0 ? (
          <div className="exploration-message">
            لا توجد أماكن تطابق خيارات البحث.
          </div>
        ) : (
          <div className="exploration-grid">
            {places.map((place) => (
              <PlaceCard
                key={place.id}
                place={place}
                cities={cities}
                categories={categories}
              />
            ))}
          </div>
        )}

        {!loading && pagination?.last_page > 1 && (
          <Pagination
            currentPage={currentPage}
            lastPage={pagination.last_page}
            onPageChange={setCurrentPage}
          />
        )}
      </main>

      <Footer />
    </div>
  );
}

export default Exploration;