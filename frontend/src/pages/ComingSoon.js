import React from "react";
import { Link } from "react-router-dom";
import { FiTool } from "react-icons/fi";

import Header from "../components/Header";
import Footer from "../components/Footer";

import "../styles/ComingSoon.css";

// صفحة عامة قابلة لإعادة الاستخدام لأي مسار موجود في التنقل حاليًا
// دون أن يكون له تصميم/محتوى نهائي بعد (مثل "من نحن" أو "الشروط والأحكام")
// الهدف: تفادي وجود روابط تنقل ميتة إلى مسارات غير موجودة، دون اختلاق محتوى فعلي
function ComingSoon({ title, message }) {
  return (
    <>
      <Header />

      <div className="coming-soon-page">
        <FiTool className="coming-soon-icon" />

        <h1>{title}</h1>

        <p>{message || "هذه الصفحة قيد التطوير حاليًا، سيتم إضافتها قريبًا."}</p>

        <Link to="/home" className="coming-soon-link">
          العودة إلى الرئيسية
        </Link>
      </div>

      <Footer />
    </>
  );
}

export default ComingSoon;
