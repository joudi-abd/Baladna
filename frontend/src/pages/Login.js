import { useState } from "react";
import "../styles/login.css";
import travel from "../assets/travel.jpg";
import logo from "../assets/Logo.png";
import { Link, useNavigate } from "react-router-dom";

import {
	HiOutlineMail,
	HiOutlineLockClosed,
} from "react-icons/hi";

import {
	IoGlobeOutline,
	IoChevronDownOutline,
} from "react-icons/io5";

import {
	FaFacebookF,
	FaApple,
	FaPlane,
  
} from "react-icons/fa";

import { FcGoogle } from "react-icons/fc";

function Login() {
	const [email, setEmail] = useState("example@gmail.com");
	const [password, setPassword] = useState("password");
	
	const navigate = useNavigate();
	
	const submitLogin = async (e) => {
		e.preventDefault();
		
		try {
			const response = await fetch("http://127.0.0.1:8000/api/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
				},
				body: JSON.stringify({
					email: email,
					password: password,
				}),
			});
			
			const data = await response.json();
			
			console.log(data);
			
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
        {/* NAVBAR */}
        <div className="right-navbar">
          <Link to="/home" className="home-nav-link">
            <img src={logo} alt="Baladna" />
            <span className="navbar-divider" />
            <span>الرئيسية</span>
          </Link>
        </div>
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
                placeholder={email}
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
                placeholder={password}
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
          <div className="social-login">
            <button
            type="button"
            className="social-button"
            aria-label="Google"
            >
            <FcGoogle />
            </button>
            <button
            type="button"
            className="social-button facebook"
            aria-label="Facebook"
            >
            <FaFacebookF />
            </button>
            <button
            type="button"
            className="social-button apple"
            aria-label="Apple"
            >
            <FaApple />
            </button>
          </div>

          {/* REGISTER */}
          <p className="register-text">
          لا تملك حساب مسبقاً؟
            <Link to="/register">
            إنشاء حساب
            </Link>
          </p>
      
        </div>
      </section>
		</div>
	);
}

export default Login;
