import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiSearch, FiChevronLeft } from "react-icons/fi";
import travelImage from "../assets/travel.jpg";

function Hero() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const goToTripsSearch = () => {
    const query = search.trim();
    navigate(query ? `/trips?q=${encodeURIComponent(query)}` : "/trips");
  };

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
            Baladna يساعد المستخدمين على اكتشاف الوجهات السياحية،
            ويستعرض الرحلات المتاحة، ويسهل حجز تجاربهم بسهولة وراحة.
          </p>

          <div className="hero-search">
            <input
              type="text"
              placeholder="ابحث هنا..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  goToTripsSearch();
                }
              }}
            />

            <button
              type="button"
              onClick={goToTripsSearch}
              className="hero-search-btn"
              aria-label="بحث"
            >
              <FiSearch />
            </button>
          </div>

          <div className="hero-buttons">
            <a href="#contact" className="hero-secondary-btn">
              <FiChevronLeft />
              تواصل معنا
            </a>

            <Link to="/trips" className="hero-main-btn">
              احجز رحلتك
            </Link>
          </div>
        </div>

        <div className="hero-image">
          <img src={travelImage} alt="مسافر يلتقط صورة لمنظر طبيعي" />
        </div>
      </div>
    </section>
  );
}

export default Hero;
