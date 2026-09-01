import "../styles/privacy.css";
import travel from "../assets/travel.jpg";
import logo from "../assets/Logo.png";
import { Link } from "react-router-dom";

function PrivacyPolicy() {
  return (
    <div className="privacy-page">

      {/* IMAGE SIDE */}
      <div className="image-side">
        <img src={travel} alt="travel" />

        <div className="overlay">
          <div className="links">
            <Link to="/support">الدعم والمساعدة</Link>
            
          </div>
        </div>
      </div>

      {/* FORM SIDE */}
      <div className="form-side">

        <div className="home-link">
          <Link to="/home" className="home-link-content">
  <span>الرئيسية</span>
  <span className="divider"></span>
  <img src={logo} alt="logo" />
</Link>
        </div>

        <div className="privacy-box">
          <h1>سياسة الخصوصية</h1>

          <p>
            نحن نحترم خصوصيتك ونلتزم بحماية بياناتك الشخصية.
          </p>

          <div className="text">
            <h3>1. البيانات التي نجمعها</h3>
            <p>الاسم، البريد الإلكتروني، رقم الهاتف.</p>

            <h3>2. استخدام البيانات</h3>
            <p>لإنشاء الحساب وتحسين الخدمة.</p>

            <h3>3. الحماية</h3>
            <p>نستخدم وسائل أمان لحماية بياناتك.</p>

            <h3>4. مشاركة البيانات</h3>
            <p>لا يتم مشاركة البيانات مع أي طرف ثالث.</p>
          </div>

        </div>

      </div>

    </div>
  );
}

export default PrivacyPolicy;