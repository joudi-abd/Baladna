import { useState } from "react";
import "../styles/login.css";
import travel from "../assets/travel.jpg";
import { Link, useNavigate } from "react-router-dom";

import {
	HiOutlineMail,
	HiOutlineLockClosed,
} from "react-icons/hi";

import { apiRequest } from "../api/api";

import {
	IoGlobeOutline,
	IoChevronDownOutline,
} from "react-icons/io5";

import {
	FaFacebookF,
	FaApple,
} from "react-icons/fa";

import { FcGoogle } from "react-icons/fc";

function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	
	const navigate = useNavigate();
	
	const submitLogin = async (e) => {
		e.preventDefault();
		
		try {
			const response = await apiRequest("/login", {
        method: "POST",
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
			
			const data = await response.data;
						
			if (response.ok && (data.success === true || data.token)) {
				localStorage.setItem("token", data.token);
				localStorage.setItem("user", JSON.stringify(data.user));
				
				navigate("/home");
			} else {
				alert(
					data.message ||
					"البريد الإلكتروني أو كلمة المرور غير صحيحة"
				);
			}
		} catch (error) {
			console.error(error);
			alert("تعذر الاتصال بالخادم");
		}
	};
	
	return (
		<>


		<div className="login-page">

		{/* ================= LEFT SIDE ================= */}
      <section className="image-side">
        <img src={travel} alt="Travel" />
        <div className="image-topbar">
          <div className="language-selector">
            <IoChevronDownOutline className="language-arrow" />
            <span>العربية</span>
            <IoGlobeOutline className="globe-icon" />
          </div>
          <div className="image-links">
            <Link to="/Support">
            الدعم والمساعدة
            </Link>
            <Link to="/PrivacyPolicy">
            سياسة الخصوصية
            </Link>
          </div>
        </div>
      </section>

      {/* ================= RIGHT SIDE ================= */}
      <section className="form-side">
        {/* DECORATIVE PLANE */}
        <div className="plane-decoration">
          <div className="plane-path" />
          <span className="plane">
            ✈
            </span>
            
        </div>
        {/* LOGIN BOX */}
        <div className="login-box">	
          <div className="login-title">
              <h1>أهلاً بعودتك</h1>
              
              <p>
              تسجيل الدخول باستخدام إيميلك
              </p>
          </div>
          <form onSubmit={submitLogin}>
            {/* EMAIL */}
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
                <HiOutlineMail className="field-icon" />
              </div>
            </fieldset>
            {/* PASSWORD */}
            <fieldset className="input-field">
              <legend>
              كلمة المرور
              </legend>
              <div className="input-content">
                <input
                type="password"
                placeholder="********"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                required
                />
                <HiOutlineLockClosed className="field-icon" />
              </div>
            </fieldset>
            <Link
            to="/forgot-password"
            className="forgot-password"
            >
            هل نسيت كلمة المرور؟
            </Link>
            <button
            type="submit"
            className="login-button"
            >
            تسجيل الدخول
            </button>
          </form>
          {/* OR */}
          <div className="or-divider">
            <span />
              <p>أو</p>
            <span />
          </div>
          {/* SOCIAL */}
          {/* تسجيل الدخول عبر هذه المزودات يتطلب تهيئة OAuth حقيقية من الخلفية، غير متاحة بعد */}
          <div className="social-login">
            <button
            type="button"
            className="social-button"
            aria-label="Google"
            onClick={() => alert("تسجيل الدخول عبر Google غير متاح حالياً")}
            >
            <FcGoogle />
            </button>
            <button
            type="button"
            className="social-button facebook"
            aria-label="Facebook"
            onClick={() => alert("تسجيل الدخول عبر Facebook غير متاح حالياً")}
            >
            <FaFacebookF />
            </button>
            <button
            type="button"
            className="social-button apple"
            aria-label="Apple"
            onClick={() => alert("تسجيل الدخول عبر Apple غير متاح حالياً")}
            >
            <FaApple />
            </button>
          </div>

          {/* REGISTER */}
          <p className="register-text">
          لا تملك حساب مسبقاً؟
            <Link to="/Register">
            إنشاء حساب
            </Link>
          </p>
      
        </div>
      </section>
		</div>
		</>
	);
}

export default Login;
