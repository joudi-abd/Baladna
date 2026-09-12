import { useState } from "react";
import "../styles/register.css";
import travel from "../assets/travel.jpg";
import { Link, useNavigate } from "react-router-dom";

import {
  HiOutlineUser,
  HiOutlineMail,
  HiOutlineLockClosed,
} from "react-icons/hi";

import { HiOutlinePhone } from "react-icons/hi2";
import { apiRequest } from "../api/api";

import {
  IoGlobeOutline,
  IoChevronDownOutline,
} from "react-icons/io5";

function Register() {
  const navigate = useNavigate();

  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const submitRegister = async (e) => {
    e.preventDefault();

    if (password !== confirm) {
      alert("كلمتا المرور غير متطابقتين");
      return;
    }

    try {
      const response = await apiRequest("/register", {
        method: "POST",
        body: JSON.stringify({
          name,
          email,
          phone,
          password,
          password_confirmation:confirm
        }),
      });

      const data = await response.data;

      console.log("Status:", response.status);
      console.log("Response:", data);

      if (response.ok) {
        alert(data.message || "تم إنشاء الحساب بنجاح");

        if (data.token) {
          localStorage.setItem("token", data.token);
        }

        if (data.user) {
          localStorage.setItem(
            "user",
            JSON.stringify(data.user)
          );
        }

        navigate("/login");
      } else {
        alert(
          data.message ||
            "فشل إنشاء الحساب، يرجى التأكد من البيانات"
        );
      }
    } catch (error) {
      console.error("Register Error:", error);

      alert("تعذر الاتصال بالسيرفر");
    }
  };

  return (
    <>

    <div className="register-page">

      {/* =========================================
          IMAGE SIDE
      ========================================= */}

      <section className="image-side">

        <img
          src={travel}
          alt="Travel"
        />

        <div className="image-topbar">

          {/* Language */}
          <div className="language-selector">

            <IoChevronDownOutline />

            <span>العربية</span>

            <IoGlobeOutline />

          </div>

          {/* Links */}
          <div className="links-left">

            <Link to="/Support">
              الدعم والمساعدة
            </Link>

            <Link to="/PrivacyPolicy">
              سياسة الخصوصية
            </Link>

          </div>

        </div>

      </section>


      {/* =========================================
          FORM SIDE
      ========================================= */}

      <section className="form-side">

        {/* DECORATIVE PLANE */}

        <div className="plane-decoration">

          <div className="plane-line" />

          <span className="plane">
            ✈
          </span>

        </div>


        {/* REGISTER */}

        <div className="register-box">

          <h1>
            إنشاء حساب
          </h1>

          <p className="subtitle">
            أنشئ حسابك الجديد
          </p>


          <form onSubmit={submitRegister}>

            {/* =================================
                NAME
            ================================= */}

            <fieldset className="input-field">

              <legend>
                الاسم الكامل
              </legend>

              <div className="input-content">

                <input
                  type="text"
                  placeholder="الاسم الكامل"
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                  required
                />

                <HiOutlineUser
                  className="field-icon"
                />

              </div>

            </fieldset>


            {/* =================================
                EMAIL
            ================================= */}

            <fieldset className="input-field">

              <legend>
                البريد الإلكتروني
              </legend>

              <div className="input-content">

                <input
                  type="email"
                  placeholder="example@gmail.com"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  required
                />

                <HiOutlineMail
                  className="field-icon"
                />

              </div>

            </fieldset>


            {/* =================================
                PHONE
            ================================= */}

            <fieldset className="input-field">

              <legend>
                رقم الهاتف
              </legend>

              <div className="input-content">

                <input
                  type="tel"
                  placeholder="09xxxxxxxx"
                  value={phone}
                  onChange={(e) =>
                    setPhone(e.target.value)
                  }
                  required
                />

                <HiOutlinePhone
                  className="field-icon"
                />

              </div>

            </fieldset>


            {/* =================================
                PASSWORD
            ================================= */}

            <fieldset className="input-field">

              <legend>
                كلمة المرور
              </legend>

              <div className="input-content">

                <input
                  type="password"
                  placeholder="كلمة المرور"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  required
                />

                <HiOutlineLockClosed
                  className="field-icon"
                />

              </div>

            </fieldset>


            {/* =================================
                CONFIRM PASSWORD
            ================================= */}

            <fieldset className="input-field">

              <legend>
                تأكيد كلمة المرور
              </legend>

              <div className="input-content">

                <input
                  type="password"
                  placeholder="تأكيد كلمة المرور"
                  value={confirm}
                  onChange={(e) =>
                    setConfirm(e.target.value)
                  }
                  required
                />

                <HiOutlineLockClosed
                  className="field-icon"
                />

              </div>

            </fieldset>


            {/* =================================
                REGISTER BUTTON
            ================================= */}

            <button
              type="submit"
              className="register-button"
            >
              إنشاء حساب
            </button>

          </form>


          {/* =================================
              LOGIN
          ================================= */}

          <p className="login-text">

            تملك حساباً بالفعل؟

            <Link to="/login">
              تسجيل الدخول
            </Link>

          </p>

        </div>

      </section>

    </div>
    </>
  );
}

export default Register;