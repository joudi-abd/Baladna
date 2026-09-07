import React from "react";

function ExplorationFilters({
  cities,
  types,
  ratingOptions,
  selectedCity,
  selectedType,
  selectedRating,
  onCityChange,
  onTypeChange,
  onRatingChange,
  onApplyFilters,
}) {
  return (
    <section className="exploration-filters">

      <div className="filter-item">
        <label>المدينة</label>

        <select
          value={selectedCity}
          onChange={(event) => onCityChange(event.target.value)}
        >
          <option value="">اختر مدينة</option>

          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>


      <div className="filter-item">
        <label>نوع المكان</label>

        <select
          value={selectedType}
          onChange={(event) => onTypeChange(event.target.value)}
        >
          <option value="">اختر نوع</option>

          {types.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>


      <div className="filter-item">
        <label>التقييم</label>

        <select
          value={selectedRating}
          onChange={(event) => onRatingChange(event.target.value)}
        >
          <option value="">اختر تقييم</option>

          {ratingOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>


      <button
        type="button"
        className="apply-filters-button"
        onClick={onApplyFilters}
      >
        تطبيق الفلاتر
      </button>

    </section>
  );
}

export default ExplorationFilters;
