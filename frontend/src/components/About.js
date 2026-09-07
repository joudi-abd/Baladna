import React from "react";
import { Link } from "react-router-dom";
import { FiChevronLeft } from "react-icons/fi";
import travelImage from "../assets/travel.jpg";

function About() {
  return (
    <section className="home-section about-section">
      <div className="about-image">
        <div className="about-image-decoration" aria-hidden="true"></div>

        <div className="about-image-main">
          <img src={travelImage} alt="سياحة في سوريا" />
        </div>
      </div>

      <div className="about-content">
        <span className="about-small-title">Baladna</span>

        <h2>من نحن - Baladna</h2>

        <p>
          Baladna هي منصة سياحية تهدف لمساعدة المسافرين والعائلات على
          استكشاف الوجهات السياحية والانضمام إلى رحلات سياحية بسهولة.
          توفر لك المنصة تغطية سياحية واضحة لجميع المعلومات اللازمة،
          كما نوفر للمستخدمين تجربة سهلة لاكتشاف الأماكن، واستعراض
          الرحلات، وإتمام الحجوزات بثقة وراحة.
        </p>

        <Link to="/about" className="text-link">
          قراءة المزيد
          <FiChevronLeft />
        </Link>
      </div>
    </section>
  );
}

export default About;
