// src/components/Footer.js

import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="site-footer" dir="rtl">

      <div className="footer-container">

        {/* =========================
            Top Footer
        ========================== */}
        <div className="footer-top">

          <div className="footer-logo">
            <div className="footer-logo-circle">
              <span>✦</span>
            </div>
          </div>

          <button className="footer-book-btn">
            <span>↗</span>
            احجز رحلتك
          </button>

        </div>


        <div className="footer-divider"></div>


        {/* =========================
            Footer Main
        ========================== */}
        <div className="footer-main">


          {/* About */}
          <div className="footer-about">

            <h3>Baladna</h3>

            <p>
              يساعد المستخدمين على اكتشاف الوجهات
              السياحية، واستعراض الرحلات المتاحة،
              وحجز تجارب تناسب اهتماماتهم بسهولة وراحة.
            </p>


            <div className="newsletter">

              <input
                type="email"
                placeholder="أدخل بريدك لتصلك اقتراحات مميزة"
              />

              <button>
                <span>➤</span>
              </button>

            </div>

          </div>


          {/* Pages */}
          <div className="footer-column">

            <h3>الصفحات</h3>

            <a href="/">الرئيسية</a>
            <a href="/explore">استكشاف</a>
            <a href="/trips">الرحلات</a>
            <a href="/bookings">حجوزاتي</a>
            <a href="/about">من نحن</a>

          </div>


          {/* Links */}
          <div className="footer-column">

            <h3>روابط</h3>

            <a href="/faq">الأسئلة الشائعة</a>
            <a href="/contact">تواصل معنا</a>
            <a href="/privacy">سياسة الخصوصية</a>
            <a href="/terms">الشروط والأحكام</a>

          </div>


          {/* Contact */}
          <div className="footer-column contact-column">

            <h3>تواصل معنا</h3>

            <span>رقم التواصل</span>
            <strong>+992334566</strong>

            <span>البريد الإلكتروني</span>
            <strong>baladnasv@gmail.com</strong>

          </div>

        </div>


        {/* =========================
            Social Media
        ========================== */}
        <div className="footer-social">

          <a href="#" aria-label="LinkedIn">
            <span>in</span>
            LinkedIn
          </a>

          <a href="#" aria-label="Instagram">
            <span>◎</span>
            Instagram
          </a>

          <a href="#" aria-label="X">
            <span>𝕏</span>
            X
          </a>

          <a href="#" aria-label="TikTok">
            <span>♪</span>
            TikTok
          </a>

        </div>


        {/* =========================
            Copyright
        ========================== */}
        <div className="footer-copyright">
          © BALADNA SY 2024
        </div>

      </div>

    </footer>
  );
};

export default Footer;