import React from "react";

function Services() {
  return (
    <section className="home-section services-section">

      <div className="section-heading">

        <h2>خدماتنا</h2>

        <p>
          نقدم لك كل ما تحتاجه لتخطيط رحلتك واستكشاف أجمل الوجهات
        </p>

      </div>

      <div className="services-grid">

        <div className="service-card">

          <div className="service-icon">
            📍
          </div>

          <h3>اكتشف الأماكن</h3>

          <p>
            تعرف على أجمل الأماكن والوجهات السياحية في سوريا.
          </p>

        </div>

        <div className="service-card">

          <div className="service-icon">
            🚌
          </div>

          <h3>رحلات متنوعة</h3>

          <p>
            اختر الرحلة المناسبة لك واستمتع بتجربة سياحية مميزة.
          </p>

        </div>

        <div className="service-card">

          <div className="service-icon">
            🎫
          </div>

          <h3>حجز سهل وسريع</h3>

          <p>
            احجز رحلتك بسهولة واحصل على تجربة مريحة وآمنة.
          </p>

        </div>

        <div className="service-card">

          <div className="service-icon">
            ⭐
          </div>

          <h3>تجارب مميزة</h3>

          <p>
            اكتشف تجارب تناسب اهتماماتك واستمتع برحلة لا تُنسى.
          </p>

        </div>

      </div>

    </section>
  );
}

export default Services;