import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_URL = "http://127.0.0.1:8000/api";

function Places() {
  const [places, setPlaces] = useState([]);
  const [placesLoading, setPlacesLoading] = useState(true);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await fetch(`${API_URL}/places`);

        if (!response.ok) {
          throw new Error("فشل جلب الأماكن");
        }

        const data = await response.json();

        setPlaces(data.data || []);
      } catch (error) {
        console.error("Places Error:", error);
      } finally {
        setPlacesLoading(false);
      }
    };

    fetchPlaces();
  }, []);

  return (
    <section className="home-section">

      <div className="section-heading">

        <h2>أماكن مميزة</h2>

        <p>
          اكتشف أجمل الأماكن السياحية التي يمكنك زيارتها في سوريا
        </p>

      </div>

      {placesLoading ? (

        <div className="home-loading">
          جاري تحميل الأماكن...
        </div>

      ) : places.length === 0 ? (

        <div className="home-empty">
          لا توجد أماكن متاحة حاليًا.
        </div>

      ) : (

        <div className="home-cards-grid">

          {places.slice(0, 3).map((place) => (

            <div
              className="place-card"
              key={place.id}
            >

              <div className="home-card-image">

                <img
                  src={
                    place.cover_image ||
                    place.image ||
                    "https://via.placeholder.com/600x400"
                  }
                  alt={place.name || place.title}
                />

                {place.category && (
                  <span className="home-card-badge">
                    {place.category.name || place.category}
                  </span>
                )}

              </div>

              <div className="home-card-content">

                <h3>
                  {place.name || place.title}
                </h3>

                <p>
                  {place.description ||
                    "اكتشف هذا المكان السياحي واستمتع بتجربة مميزة."}
                </p>

                <Link
                  to={`/places/${place.id}`}
                  className="card-link"
                >
                  عرض المكان ←
                </Link>

              </div>

            </div>

          ))}

        </div>

      )}

      <div className="section-button">

        <Link
          to="/places"
          className="green-button"
        >
          عرض جميع الأماكن
        </Link>

      </div>

    </section>
  );
}

export default Places;