
import { useState } from "react";
import "../styles/login.css";
import travel from "../assets/travel.jpg";
import { Link, useNavigate } from "react-router-dom";
import { FaLock } from "react-icons/fa";
import logo from "../assets/Logo.png";



function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

const submitLogin = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch("http://127.0.0.1:8000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();
    console.log(data);
    if (response.ok && (data.success===true|| data.token)) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      alert(data.message);
      navigate("/home");
    } else {
      alert(data.message || "البريد الإلكتروني أو كلمة المرور غير صحيحة");
    }
  } catch (error) {
    console.error(error);
    alert("تعذر الاتصال بالخادم");
  }
};

  return (
  
  

    <div className="login-page">

      
      <div className="image-side">
        <img src={travel} alt="travel" />

        <div className="overlay">
          <div className="links">
            <Link to="/Support" className="nav-link">
                الدعم والمساعدة
            </Link>
            <Link to="/PrivacyPolicy">سياسة الخصوصية</Link>
          </div>
        </div>
      </div>

     
      <div className="form-side">

        <div className="home-link">
       <Link to="/home" className="home-link-content">
    <img src={logo} alt="Logo" />
    <span className="divider"></span>
    <span>الرئيسية</span>
  </Link>
        </div>

        <div className="login-box">

          <h1>أهلاً بعودتك</h1>
          <p>تسجيل الدخول باستخدام إيميلك</p>

          <form onSubmit={submitLogin}>

           
            <div className="field">
              <label>
                ✉ البريد الإلكتروني
              </label>

              <div className="input-box">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

         
            <div className="field">
              <label>
                <FaLock /> كلمة المرور
              </label>

              <div className="input-box">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button type="submit">
              تسجيل الدخول
            </button>

          </form>
  <p className="register">

            لا تملك حساب مسبقاً؟
            
            <Link to="/register">
  إنشاء حساب
</Link>

          </p>
        </div>
      </div>
     

    </div>
    
  );
}

export default Login;