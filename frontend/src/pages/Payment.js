import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/payment.css";
import Footer from "../components/Footer";
import logo from "../assets/Logo.png";
import travel from "../assets/travel.jpg";

function Payment() {
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState("sham-cash");
  const [notes, setNotes] = useState("");
  const [paymentFile, setPaymentFile] = useState(null);

  const totalPrice = 300000;

  // رفع ملف إثبات الدفع
  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setPaymentFile(file);
    }
  };

  // تغيير طريقة الدفع
  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);

    // إذا اختار الدفع النقدي، ما عاد نحتاج إثبات دفع
    if (e.target.value === "cash") {
      setPaymentFile(null);
    }
  };

  // إرسال الدفع
  const handlePayment = () => {
    // شام كاش أو بنك يحتاج إثبات دفع
    if (paymentMethod !== "cash" && !paymentFile) {
      alert("يرجى رفع إثبات الدفع أولاً");
      return;
    }

    // حالياً تجريبي
    // لاحقاً هون منربط POST Payment API

    alert("تم إرسال بيانات الدفع بنجاح");

    navigate("/BookingSuccess");
  };

  return (
    <div className="payment-page" dir="rtl">

      {/* ================= NAVBAR ================= */}

      <nav className="payment-navbar">

        <div className="payment-logo">
          <img src={logo} alt="بلدنا" />
        </div>

        <div className="payment-navbar-links">

          <Link to="/home">
            الرئيسية
          </Link>

          <Link to="/Exploration">
            استكشاف
          </Link>

          <Link to="/trips">
            الرحلات
          </Link>

          <Link to="/bookings">
            حجوزاتي
          </Link>

          <Link to="/about">
            من نحن
          </Link>

        </div>

        <div className="payment-navbar-buttons">

          <Link
            to="/login"
            className="payment-login-btn"
          >
            تسجيل الدخول
          </Link>

          <Link
            to="/BookingConfirmation"
            className="payment-book-btn"
          >
            احجز رحلتك
          </Link>

        </div>

      </nav>


      {/* ================= BREADCRUMB ================= */}

      <div className="payment-breadcrumb">

        <Link to="/home">
          الرئيسية
        </Link>

        <span>←</span>

        <Link to="/trips">
          الرحلات
        </Link>

        <span>←</span>

        <Link to="/TripDetails">
          تفاصيل الرحلة
        </Link>

        <span>←</span>

        <Link to="/BookingConfirmation">
          تأكيد الحجز
        </Link>

        <span>←</span>

        <span className="active">
          الدفع
        </span>

      </div>


      {/* ================= HEADER ================= */}

      <section className="payment-header">

        <h1>
          عملية إتمام الدفع
        </h1>

        <p>
          اختر طريقة الدفع المناسبة وأرسل إثبات الدفع لإكمال عملية حجز رحلتك.
        </p>

      </section>


      {/* ================= STEPS ================= */}

      <div className="payment-steps">

        <div className="payment-step completed">
          <span>✓</span>
          <p>تفاصيل الحجز</p>
        </div>

        <div className="payment-line"></div>

        <div className="payment-step active">
          <span>2</span>
          <p>الدفع</p>
        </div>

        <div className="payment-line"></div>

        <div className="payment-step">
          <span>3</span>
          <p>تم الحجز</p>
        </div>

      </div>


      {/* ================= MAIN ================= */}

      <main className="payment-content">

        {/* ================= PAYMENT CARD ================= */}

        <section className="payment-card">

          <h2>
            <span>▣</span>
            تفاصيل الدفع
          </h2>


          {/* TOTAL */}

          <div className="payment-total-box">

            <strong>
              {totalPrice.toLocaleString()} ل.س
            </strong>

            <span>
              تكلفة الرحلة الإجمالية
            </span>

          </div>


          {/* METHODS */}

          <label className="payment-label">
            طريقة الدفع
          </label>


          <div className="payment-methods">

            {/* شام كاش */}

            <label
              className={
                paymentMethod === "sham-cash"
                  ? "payment-method selected"
                  : "payment-method"
              }
            >

              <input
                type="radio"
                name="payment"
                value="sham-cash"
                checked={paymentMethod === "sham-cash"}
                onChange={handlePaymentMethodChange}
              />

              <div className="method-icon">
                ▣
              </div>

              <div className="method-info">

                <strong>
                  تحويل عبر شام كاش
                </strong>

                <span>
                  حول المبلغ إلى حساب شام كاش التالي
                </span>

              </div>

            </label>


            {/* البنك */}

            <label
              className={
                paymentMethod === "bank"
                  ? "payment-method selected"
                  : "payment-method"
              }
            >

              <input
                type="radio"
                name="payment"
                value="bank"
                checked={paymentMethod === "bank"}
                onChange={handlePaymentMethodChange}
              />

              <div className="method-icon">
                🏦
              </div>

              <div className="method-info">

                <strong>
                  تحويل عبر حساب بنكي
                </strong>

                <span>
                  حول المبلغ إلى الحساب البنكي التالي
                </span>

              </div>

            </label>


            {/* نقدي */}

            <label
              className={
                paymentMethod === "cash"
                  ? "payment-method selected"
                  : "payment-method"
              }
            >

              <input
                type="radio"
                name="payment"
                value="cash"
                checked={paymentMethod === "cash"}
                onChange={handlePaymentMethodChange}
              />

              <div className="method-icon">
                💵
              </div>

              <div className="method-info">

                <strong>
                  دفع نقدي
                </strong>

                <span>
                  ادفع عند نقطة التجمع يوم الرحلة
                </span>

              </div>

            </label>

          </div>


          {/* ================= SHAM CASH INFO ================= */}

          {paymentMethod === "sham-cash" && (

            <div className="sham-cash-box">

              <div className="sham-title">

                <strong>
                  ⓘ بيانات التحويل على شام كاش
                </strong>

              </div>

              <p>
                اسم الحساب:
                <strong>
                  {" "}Baladna Travel
                </strong>
              </p>

              <p>
                رمز الحساب:
                <strong>
                  {" "}331e4acd5e9d9a886d3057d35a3089
                </strong>
              </p>

              <small>
                يرجى إرسال إثبات الدفع بعد إتمام عملية التحويل.
              </small>

            </div>

          )}


          {/* ================= BANK INFO ================= */}

          {paymentMethod === "bank" && (

            <div className="sham-cash-box">

              <div className="sham-title">

                <strong>
                  ⓘ بيانات الحساب البنكي
                </strong>

              </div>

              <p>
                اسم الحساب:
                <strong>
                  {" "}Baladna Travel
                </strong>
              </p>

              <p>
                رقم الحساب:
                <strong>
                  {" "}000000000000
                </strong>
              </p>

              <small>
                يرجى تحويل المبلغ وإرسال إثبات الدفع بعد إتمام التحويل.
              </small>

            </div>

          )}


          {/* ================= PAYMENT PROOF ================= */}

          {paymentMethod !== "cash" && (

            <div className="payment-proof">

              <label>
                إثبات الدفع
              </label>

              <label className="upload-box">

                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={handleFileChange}
                />

                <div className="upload-icon">
                  ↑
                </div>

                <strong>
                  ارفع صورة إثبات الدفع
                </strong>

                <span>
                  يمكنك رفع صورة أو ملف PDF
                </span>

                {paymentFile && (

                  <small>
                    الملف المحدد: {paymentFile.name}
                  </small>

                )}

                <span className="choose-file">
                  استعرض الملفات
                </span>

              </label>

            </div>

          )}


          {/* ================= CASH MESSAGE ================= */}

          {paymentMethod === "cash" && (

            <div className="sham-cash-box">

              <div className="sham-title">

                <strong>
                  ⓘ الدفع النقدي
                </strong>

              </div>

              <small>
                سيتم دفع المبلغ نقداً عند نقطة التجمع في يوم الرحلة.
              </small>

            </div>

          )}


          {/* ================= NOTES ================= */}

          <div className="payment-notes">

            <label>
              ملاحظات إضافية
              <small>
                {" "}(اختياري)
              </small>
            </label>

            <textarea
              value={notes}
              maxLength={120}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="اكتب الملاحظات التي تود إضافتها مع حجزك"
            />

            <span>
              {notes.length}/120
            </span>

          </div>


          {/* ================= SUBMIT ================= */}

          <button
            className="payment-submit-btn"
            onClick={handlePayment}
          >
            إرسال الدفع
          </button>


          {/* SECURITY */}

          <div className="payment-security">
            🛡 يتم التحقق من الدفع خلال 24 ساعة عمل.
          </div>

        </section>


        {/* ================= SUMMARY ================= */}

        <aside className="payment-summary">

          <h2>
            ▣ ملخص الحجز
          </h2>

          <img
            src={travel}
            alt="رحلة اكتشاف دمشق القديمة"
          />

          <h3>
            رحلة اكتشاف دمشق القديمة
          </h3>


          <div className="summary-row">

            <span>
              التاريخ
            </span>

            <strong>
              15 يوليو 2026
            </strong>

          </div>


          <div className="summary-row">

            <span>
              المدة
            </span>

            <strong>
              يوم كامل
            </strong>

          </div>


          <div className="summary-row">

            <span>
              المشاركون
            </span>

            <strong>
              2 أشخاص
            </strong>

          </div>


          <hr />


          <h4>
            تفاصيل السعر
          </h4>


          <div className="summary-row">

            <span>
              سعر الرحلة للفرد
            </span>

            <strong>
              150,000 ل.س
            </strong>

          </div>


          <div className="summary-row">

            <span>
              عدد المشاركين
            </span>

            <strong>
              × 2
            </strong>

          </div>


          <hr />


          <div className="summary-total">

            <span>
              السعر الإجمالي
            </span>

            <strong>
              {totalPrice.toLocaleString()} ل.س
            </strong>

          </div>


          <div className="summary-warning">

            <strong>
              ⓘ مهم
            </strong>

            <p>
              لن يتم تأكيد حجزك إلا بعد التحقق من الدفع.
            </p>

          </div>

        </aside>

      </main>


      {/* ================= FOOTER ================= */}

      <Footer />

    </div>
  );
}

export default Payment;