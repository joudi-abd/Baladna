import React, { useState } from "react";
import { FiUser, FiMail, FiPhone, FiMessageSquare, FiMonitor } from "react-icons/fi";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [feedback, setFeedback] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!name.trim() || !message.trim()) {
      setFeedback("يرجى تعبئة الاسم والرسالة.");
      return;
    }

    if (!EMAIL_PATTERN.test(email)) {
      setFeedback("يرجى إدخال بريد إلكتروني صحيح.");
      return;
    }

    if (!subject) {
      setFeedback("يرجى اختيار موضوع الرسالة.");
      return;
    }

    // لا يوجد اتصال بخلفية فعلية بعد؛ لا يتم إرسال الرسالة لأي خادم
    setFeedback("تم استلام رسالتك، سنقوم بالرد خلال 24-48 ساعة.");
    setName("");
    setEmail("");
    setSubject("");
    setMessage("");
  };

  return (
    <section id="contact" className="home-section contact-section">
      <div className="contact-content">
        <span className="about-small-title">نحن هنا لمساعدتك</span>

        <h2>تواصل معنا</h2>

        <p>
          إذا كان لديك أي استفسار أو ملاحظة، يسعدنا أن نسمع منك ونوفر
          لك الدعم الذي تحتاجه.
        </p>

        <div className="contact-illustration">
          <div className="contact-illustration-frame">
            <FiMonitor />
          </div>

          <div className="contact-floating-icon icon-phone">
            <FiPhone />
          </div>

          <div className="contact-floating-icon icon-message">
            <FiMessageSquare />
          </div>
        </div>
      </div>

      <form className="contact-form" onSubmit={handleSubmit}>
        <label className="form-field">
          <span className="form-label">
            <FiUser /> الاسم الكامل
          </span>
          <input
            type="text"
            placeholder="أدخل اسمك الكامل هنا"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </label>

        <label className="form-field">
          <span className="form-label">
            <FiMail /> البريد الإلكتروني
          </span>
          <input
            type="email"
            placeholder="ادخل بريدك الالكتروني هنا"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>

        <label className="form-field">
          <span className="form-label">الموضوع</span>
          <select value={subject} onChange={(event) => setSubject(event.target.value)}>
            <option value="" disabled>
              اختر من القائمة
            </option>
            <option value="booking">استفسار عن حجز</option>
            <option value="trip">استفسار عن رحلة</option>
            <option value="other">أخرى</option>
          </select>
        </label>

        <label className="form-field">
          <span className="form-label">
            <FiMessageSquare /> الرسالة
          </span>
          <textarea
            placeholder="اكتب رسالتك هنا..."
            rows="4"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
          />
        </label>

        {feedback && <p className="contact-feedback">{feedback}</p>}

        <button type="submit" className="green-button">
          إرسال الرسالة
        </button>

        <p className="contact-response-note">
          سيتم الرد خلال 24-48 ساعة
        </p>
      </form>
    </section>
  );
}

export default Contact;
