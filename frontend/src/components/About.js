import React from "react";
import { Link } from "react-router-dom";

function About() {
  return (
    <section className="home-section about-section">

      <div className="about-image">

        <img
          src="https://images.unsplash.com/photo-1590845947676-fa2576f401d2?auto=format&fit=crop&w=800&q=80"
          alt="سوريا"
        />

      </div>

      <div className="about-content">

        <span className="about-small-title">
          عن Baladna
        </span>

        <h2>
          من نحن - Baladna
        </h2>

        <p>
          Baladna منصة سياحية تساعدك على اكتشاف أجمل
          الوجهات السياحية في سوريا، واستعراض الرحلات
          المتاحة وحجز تجارب سياحية تناسب اهتماماتك
          بكل سهولة وراحة.
        </p>

        <Link
          to="/about"
          className="text-link"
        >
          تعرف علينا أكثر ←
        </Link>

      </div>

    </section>
  );
}

export default About;