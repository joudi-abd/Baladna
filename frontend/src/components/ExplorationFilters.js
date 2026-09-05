import React from "react";

function ExplorationFilters({
  cities,
  categories,
  features,
  selectedCity,
  selectedCategory,
  selectedFeatures,
  onCityChange,
  onCategoryChange,
  onFeaturesChange,
  onApplyFilters,
}) {
  const handleFeatureChange = (featureId) => {
    if (selectedFeatures.includes(featureId)) {
      onFeaturesChange(
        selectedFeatures.filter((id) => id !== featureId)
      );
    } else {
      onFeaturesChange([...selectedFeatures, featureId]);
    }
  };

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
            <option key={city.id} value={city.id}>
              {city.name}
            </option>
          ))}
        </select>
      </div>


      <div className="filter-item">
        <label>نوع المكان</label>

        <select
          value={selectedCategory}
          onChange={(event) =>
            onCategoryChange(event.target.value)
          }
        >
          <option value="">اختر نوع</option>

          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>


      <div className="filter-item">
        <label>الميزات</label>

        <div className="features-options">
          {features.map((feature) => (
            <label
              key={feature.id}
              className="feature-option"
            >
              <input
                type="checkbox"
                checked={selectedFeatures.includes(feature.id)}
                onChange={() =>
                  handleFeatureChange(feature.id)
                }
              />

              <span>{feature.name}</span>
            </label>
          ))}
        </div>
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