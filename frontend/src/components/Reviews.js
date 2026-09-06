import React, { useEffect, useState } from "react";

const API_URL = "http://127.0.0.1:8000/api";

function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        // 1. جلب الأماكن والرحلات معًا
        const [placesResponse, tripsResponse] = await Promise.all([
          fetch(`${API_URL}/places`),
          fetch(`${API_URL}/trips`),
        ]);

        if (!placesResponse.ok || !tripsResponse.ok) {
          throw new Error("فشل جلب الأماكن أو الرحلات");
        }

        const placesData = await placesResponse.json();
        const tripsData = await tripsResponse.json();

        const places = placesData.data || [];
        const trips = tripsData.data || [];

        // 2. جلب Reviews الخاصة بالأماكن
        const placeReviews = await Promise.all(
          places.map(async (place) => {
            try {
              const response = await fetch(
                `${API_URL}/places/${place.id}/reviews`
              );

              if (!response.ok) {
                return [];
              }

              const data = await response.json();

              return (data.data || []).map((review) => ({
                ...review,
                reviewType: "place",
                reviewName: place.name || place.title || "مكان سياحي",
              }));
            } catch (error) {
              console.error(
                `Error fetching reviews for place ${place.id}:`,
                error
              );

              return [];
            }
          })
        );

        // 3. جلب Reviews الخاصة بالرحلات
        const tripReviews = await Promise.all(
          trips.map(async (trip) => {
            try {
              const response = await fetch(
                `${API_URL}/trips/${trip.id}/reviews`
              );

              if (!response.ok) {
                return [];
              }

              const data = await response.json();

              return (data.data || []).map((review) => ({
                ...review,
                reviewType: "trip",
                reviewName: trip.title || "رحلة سياحية",
              }));
            } catch (error) {
              console.error(
                `Error fetching reviews for trip ${trip.id}:`,
                error
              );

              return [];
            }
          })
        );

        // 4. جمع Reviews الأماكن والرحلات
        const allReviews = [
          ...placeReviews.flat(),
          ...tripReviews.flat(),
        ];

        // 5. ترتيب الآراء من الأحدث إلى الأقدم
        allReviews.sort(
          (a, b) =>
            new Date(b.created_at) -
            new Date(a.created_at)
        );

        // 6. عرض آخر 3 آراء فقط
        setReviews(allReviews.slice(0, 3));
      } catch (error) {
        console.error("Reviews Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  return (
    <section className="home-section reviews-section">
      <div className="section-heading">
        <h2>آراء زوار Baladna</h2>

        <p>
          ماذا يقول زوارنا عن تجاربهم معنا؟
        </p>
      </div>

      {loading ? (
        <div className="home-loading">
          جاري تحميل الآراء...
        </div>
      ) : reviews.length === 0 ? (
        <div className="home-empty">
          لا توجد آراء متاحة حاليًا.
        </div>
      ) : (
        <div className="reviews-grid">
          {reviews.map((review) => (
            <div
              className="review-card"
              key={`${review.reviewType}-${review.id}`}
            >
              {/* النجوم */}
              <div className="review-stars">
                {"⭐".repeat(review.rating || 0)}
              </div>

              {/* التعليق */}
              <p className="review-comment">
                {review.comment || "لا يوجد تعليق."}
              </p>

              {/* المستخدم */}
              <strong className="review-user">
                زائر Baladna
              </strong>

              {/* الشيء الذي تم تقييمه */}
              <span className="review-target">
                {review.reviewType === "place"
                  ? `المكان: ${review.reviewName}`
                  : `الرحلة: ${review.reviewName}`}
              </span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default Reviews;