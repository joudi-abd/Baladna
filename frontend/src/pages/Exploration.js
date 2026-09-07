import React, { useMemo, useRef, useState } from "react";
import { FiSearch } from "react-icons/fi";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ExplorationFilters from "../components/ExplorationFilters";
import PlaceCard from "../components/PlaceCard";
import Pagination from "../components/Pagination";
import { cityOptions, typeOptions, ratingOptions, places } from "../data/explorationMockData";
import "../styles/Exploration.css";

const PAGE_SIZE = 15;

function Exploration() {
  const [search, setSearch] = useState("");

  const [selectedCity, setSelectedCity] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedRating, setSelectedRating] = useState("");

  const [appliedCity, setAppliedCity] = useState("");
  const [appliedType, setAppliedType] = useState("");
  const [appliedRating, setAppliedRating] = useState("");

  const [sort, setSort] = useState("rating");
  const [currentPage, setCurrentPage] = useState(1);

  const resultsRef = useRef(null);

  const scrollToResults = () => {
    resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const applyFilters = () => {
    setAppliedCity(selectedCity);
    setAppliedType(selectedType);
    setAppliedRating(selectedRating);
    setCurrentPage(1);
  };

  const changeSort = (event) => {
    setSort(event.target.value);
    setCurrentPage(1);
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    setCurrentPage(1);
  };

  const filteredPlaces = useMemo(() => {
    let result = places.filter((place) => {
      const matchesSearch =
        !search.trim() ||
        place.name.includes(search.trim()) ||
        place.city.includes(search.trim());

      const matchesCity = !appliedCity || place.city === appliedCity;
      const matchesType = !appliedType || place.type === appliedType;
      const matchesRating =
        !appliedRating || place.rating >= Number(appliedRating);

      return matchesSearch && matchesCity && matchesType && matchesRating;
    });

    result = [...result].sort((a, b) => {
      if (sort === "name") {
        return a.name.localeCompare(b.name, "ar");
      }

      return b.rating - a.rating;
    });

    return result;
  }, [search, appliedCity, appliedType, appliedRating, sort]);

  const lastPage = Math.max(1, Math.ceil(filteredPlaces.length / PAGE_SIZE));

  const visiblePlaces = filteredPlaces.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  return (
    <div className="exploration-page">
      <Header />

      <div className="exploration-decoration exploration-decoration-right" aria-hidden="true"></div>
      <div className="exploration-decoration exploration-decoration-left" aria-hidden="true"></div>

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
                onChange={handleSearchChange}
              />

              <button type="button" aria-label="بحث" onClick={scrollToResults}>
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
        onRatingChange={setSelectedRating}
        onApplyFilters={applyFilters}
      />

      <main className="exploration-content" ref={resultsRef}>
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

        {visiblePlaces.length === 0 ? (
          <div className="exploration-message">
            لا توجد أماكن تطابق خيارات البحث.
          </div>
        ) : (
          <div className="exploration-grid">
            {visiblePlaces.map((place) => (
              <PlaceCard key={place.id} place={place} />
            ))}
          </div>
        )}

        <Pagination
          currentPage={currentPage}
          lastPage={lastPage}
          onPageChange={setCurrentPage}
        />
      </main>

      <Footer />
    </div>
  );
}

export default Exploration;
