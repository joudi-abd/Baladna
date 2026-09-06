import React from "react";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="home-hero">
      <div className="hero-content">
        <div className="hero-text">

          <h1>
            اكتشف أجمل الوجهات
            <br />
            واحجز رحلتك بسهولة
          </h1>

          <p>
            اكتشف أجمل الأماكن السياحية في سوريا
            واستمتع برحلات مميزة وتجارب لا تُنسى
            بكل سهولة وراحة.
          </p>

          <div className="hero-search">
            <input
              type="text"
              placeholder="ابحث عن رحلة..."
            />

            <Link to="/trips" className="hero-search-btn">
              🔍
            </Link>
          </div>

          <div className="hero-buttons">

            <Link
              to="/trips"
              className="hero-main-btn"
            >
              احجز رحلتك الآن
            </Link>

            <Link
              to="/places"
              className="hero-secondary-btn"
            >
              اكتشف الأماكن
            </Link>

          </div>

        </div>
      </div>
    </section>
  );
}

export default Hero;