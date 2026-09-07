import { useMemo, useState } from "react";
import "../styles/support.css";
import travel from "../assets/travel.jpg";
import { Link } from "react-router-dom";
import { FaSearch, FaEnvelope, FaPhone } from "react-icons/fa";
import Header from "../components/Header";

const FAQ_ITEMS = [
  {
    question: "كيف أحجز رحلة؟",
    answer: "اختر الوجهة والتاريخ ثم اضغط حجز.",
  },
  {
    question: "نسيت كلمة المرور؟",
    answer: "اضغط على نسيت كلمة المرور واتبع الخطوات.",
  },
  {
    question: "كيف ألغي الحجز؟",
    answer: "من صفحة الحجوزات يمكنك الإلغاء بسهولة.",
  },
];

function Support() {
  const [search, setSearch] = useState("");

  const filteredFaq = useMemo(() => {
    const query = search.trim();

    if (!query) return FAQ_ITEMS;

    return FAQ_ITEMS.filter(
      (item) => item.question.includes(query) || item.answer.includes(query)
    );
  }, [search]);

  return (
    <>
    <Header />

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

        <div className="support-box">

          <h1>الدعم والمساعدة</h1>
          <p>كيف يمكننا مساعدتك؟</p>

          {/* SEARCH */}
          <div className="search-box">
            <FaSearch />
            <input
              type="text"
              placeholder="ابحث عن مشكلة..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>

          {/* FAQ */}
          <div className="faq">

            {filteredFaq.length === 0 ? (
              <p className="faq-empty">لا توجد نتائج مطابقة لبحثك.</p>
            ) : (
              filteredFaq.map((item) => (
                <div className="faq-item" key={item.question}>
                  <h3>{item.question}</h3>
                  <p>{item.answer}</p>
                </div>
              ))
            )}

          </div>

          {/* CONTACT */}
          <div className="contact">

            <a className="contact-card" href="mailto:support@example.com">
              <FaEnvelope />
              <p>support@example.com</p>
            </a>

            <a className="contact-card" href="tel:+90xxxxxxxxxx">
              <FaPhone />
              <p>+90 xxx xxx xxxx</p>
            </a>

          </div>

        </div>
      </div>
    </div>
    </>
  );
}

export default Support;
