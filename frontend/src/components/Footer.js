// src/components/Footer.js

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiArrowUpLeft, FiSend } from 'react-icons/fi';
import { FaLinkedinIn, FaInstagram, FaXTwitter, FaTiktok } from 'react-icons/fa6';
import logo from '../assets/Logo.png';
import '../styles/Footer.css';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// لا تتوفر روابط صفحات تواصل اجتماعي حقيقية لـ Baladna حتى الآن
// لذلك تبقى هذه أزرارًا موثّقة توضّح عدم توفر الحساب بدل روابط مزيّفة أو href="#"
const SOCIAL_LINKS = [
  { key: 'linkedin', label: 'LinkedIn', icon: FaLinkedinIn },
  { key: 'instagram', label: 'Instagram', icon: FaInstagram },
  { key: 'x', label: 'X', icon: FaXTwitter },
  { key: 'tiktok', label: 'TikTok', icon: FaTiktok },
];

const Footer = () => {
  const navigate = useNavigate();

  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterMessage, setNewsletterMessage] = useState('');

  const handleNewsletterSubmit = (event) => {
    event.preventDefault();

    if (!EMAIL_PATTERN.test(newsletterEmail)) {
      setNewsletterMessage('يرجى إدخال بريد إلكتروني صحيح.');
      return;
    }

    // لا يوجد اتصال بخلفية فعلية بعد؛ لا يتم تخزين البريد فعليًا
    setNewsletterMessage('سيتم تفعيل خدمة الاشتراك قريبًا.');
    setNewsletterEmail('');
  };

  return (
    <footer className="site-footer" dir="rtl">

      <div className="footer-container">

        {/* =========================
            Top Footer
        ========================== */}
        <div className="footer-top">

          <div className="footer-logo">
            <div className="footer-logo-circle">
              <img src={logo} alt="Baladna" />
            </div>
          </div>

          <button
            type="button"
            className="footer-book-btn"
            onClick={() => navigate('/trips')}
          >
            <FiArrowUpLeft />
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


            <form className="newsletter" onSubmit={handleNewsletterSubmit}>

              <input
                type="email"
                placeholder="أدخل بريدك لتصلك اقتراحات مميزة"
                value={newsletterEmail}
                onChange={(event) => {
                  setNewsletterEmail(event.target.value);
                  setNewsletterMessage('');
                }}
                aria-label="البريد الإلكتروني للاشتراك في النشرة"
              />

              <button type="submit" aria-label="اشتراك">
                <FiSend />
              </button>

            </form>

            {newsletterMessage && (
              <p className="newsletter-message">{newsletterMessage}</p>
            )}

          </div>


          {/* Pages */}
          <div className="footer-column">

            <h3>الصفحات</h3>

            <Link to="/home">الرئيسية</Link>
            <Link to="/exploration">استكشاف</Link>
            <Link to="/trips">الرحلات</Link>
            <Link to="/bookings">حجوزاتي</Link>
            <Link to="/about">من نحن</Link>

          </div>


          {/* Links */}
          <div className="footer-column">

            <h3>روابط</h3>

            <Link to="/Support">الأسئلة الشائعة</Link>
            <Link to="/home#contact">تواصل معنا</Link>
            <Link to="/PrivacyPolicy">سياسة الخصوصية</Link>
            <Link to="/terms">الشروط والأحكام</Link>

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

          {SOCIAL_LINKS.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              type="button"
              className="footer-social-btn"
              aria-label={`${label} (غير متوفر حالياً)`}
              title="الحساب غير متوفر حالياً"
              onClick={() => alert(`حساب Baladna على ${label} غير متوفر حالياً`)}
            >
              <span><Icon /></span>
              {label}
            </button>
          ))}

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