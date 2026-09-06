import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_URL = "http://127.0.0.1:8000/api";

function AvailableTrips() {
  const [trips, setTrips] = useState([]);
  const [tripsLoading, setTripsLoading] = useState(true);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await fetch(`${API_URL}/trips`);

        if (!response.ok) {
          throw new Error("فشل جلب الرحلات");
        }

        const data = await response.json();

        setTrips(data.data || []);
      } catch (error) {
        console.error("Trips Error:", error);
      } finally {
        setTripsLoading(false);
      }
    };

    fetchTrips();
  }, []);

  return (
    <section className="home-section">

      <div className="section-heading">

        <h2>الرحلات المتاحة</h2>

        <p>
          اختر من بين مجموعة من الرحلات المتوفرة واحجز رحلتك القادمة
        </p>

      </div>

      {tripsLoading ? (

        <div className="home-loading">
          جاري تحميل الرحلات...
        </div>

      ) : trips.length === 0 ? (

        <div className="home-empty">
          لا توجد رحلات متاحة حاليًا.
        </div>

      ) : (

        <div className="home-cards-grid">

          {trips.slice(0, 3).map((trip) => (

            <div
              className="home-trip-card"
              key={trip.id}
            >

              <div className="home-card-image">

                <img
                  src={
                    trip.cover_image ||
                    "https://via.placeholder.com/600x400"
                  }
                  alt={trip.title}
                />

                <span className="home-card-badge">

                  {trip.status === "ongoing"
                    ? "جارية"
                    : "متاحة"}

                </span>

              </div>

              <div className="home-card-content">

                <div className="trip-title-row">

                  <h3>
                    {trip.title}
                  </h3>

                  <span className="trip-rating">
                    ⭐ {trip.rating_avg || "0"}
                  </span>

                </div>

                <p>
                  {trip.description ||
                    "استمتع برحلة سياحية مميزة واكتشف أجمل الأماكن."}
                </p>

                <div className="trip-mini-details">

                  <span>
                    📅 {trip.trip_date || "غير محدد"}
                  </span>

                  <span>
                    👥 {trip.available_seats || 0} مقاعد
                  </span>

                </div>

                <div className="trip-card-bottom">

                  <strong>
                    {trip.price
                      ? Number(trip.price).toLocaleString()
                      : "0"}{" "}
                    ل.س
                  </strong>

                  <Link
                    to={`/trips/${trip.id}`}
                    className="card-link"
                  >
                    عرض الرحلة ←
                  </Link>

                </div>

              </div>

            </div>

          ))}

        </div>

      )}

      <div className="section-button">

        <Link
          to="/trips"
          className="green-button"
        >
          عرض جميع الرحلات
        </Link>

      </div>

    </section>
  );
}

export default AvailableTrips;