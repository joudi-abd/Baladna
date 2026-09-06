import React from "react";

function Contact() {
  return (
    <section className="home-section contact-section">

      <div className="contact-content">

        <span className="about-small-title">
          نحن هنا لمساعدتك
        </span>

        <h2>
          تواصل معنا
        </h2>

        <p>
          لديك سؤال أو استفسار؟
          تواصل معنا وسنكون سعداء بمساعدتك.
        </p>

        <form className="contact-form">

          <input
            type="text"
            placeholder="الاسم"
          />

          <input
            type="email"
            placeholder="البريد الإلكتروني"
          />

          <textarea
            placeholder="اكتب رسالتك..."
            rows="4"
          />

          <button
            type="submit"
            className="green-button"
          >
            إرسال الرسالة
          </button>

        </form>

      </div>

      <div className="contact-image">

        <div className="contact-icon">
          💬
        </div>

        <h3>
          نحن دائمًا هنا لمساعدتك
        </h3>

        <p>
          لا تتردد في التواصل معنا
        </p>

      </div>

    </section>
  );
}

export default Contact;