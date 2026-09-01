import "../styles/support.css";
import travel from "../assets/travel.jpg";
import logo from "../assets/Logo.png";
import { Link } from "react-router-dom";
import { FaSearch, FaEnvelope, FaPhone } from "react-icons/fa";

function Support() {
  return (
    <div className="support-page">

      {/* IMAGE SIDE */}
      <div className="image-side">
        <img src={travel} alt="travel" />

        <div className="overlay">
          <div className="links">
            
             <Link to="/PrivacyPolicy">سياسة الخصوصية</Link>
          </div>
        </div>
      </div>

      {/* FORM SIDE */}
      <div className="form-side">

        {/* HOME / LOGO */}
        <div className="home-link">
          <Link to="/home" className="home-link-content">
  <span>الرئيسية</span>
  <span className="divider"></span>
  <img src={logo} alt="logo"/>
</Link>
        </div>

        <div className="support-box">

          <h1>الدعم والمساعدة</h1>
          <p>كيف يمكننا مساعدتك؟</p>

          {/* SEARCH */}
          <div className="search-box">
            <FaSearch />
            <input type="text" placeholder="ابحث عن مشكلة..." />
          </div>

          {/* FAQ */}
          <div className="faq">

            <div className="faq-item">
              <h3>كيف أحجز رحلة؟</h3>
              <p>اختر الوجهة والتاريخ ثم اضغط حجز.</p>
            </div>

            <div className="faq-item">
              <h3>نسيت كلمة المرور؟</h3>
              <p>اضغط على نسيت كلمة المرور واتبع الخطوات.</p>
            </div>

            <div className="faq-item">
              <h3>كيف ألغي الحجز؟</h3>
              <p>من صفحة الحجوزات يمكنك الإلغاء بسهولة.</p>
            </div>

          </div>

          {/* CONTACT */}
          <div className="contact">

            <div className="contact-card">
              <FaEnvelope />
              <p>support@example.com</p>
            </div>

            <div className="contact-card">
              <FaPhone />
              <p>+90 xxx xxx xxxx</p>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

export default Support;