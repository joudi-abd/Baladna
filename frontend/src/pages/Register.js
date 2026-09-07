import { useState } from "react";
import "../styles/register.css";
import travel from "../assets/travel.jpg";
import logo from "../assets/Logo.png";
import { Link, useNavigate } from "react-router-dom";
import { FaLock, FaPhone } from "react-icons/fa";

function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");


  const submitRegister = async (e) => {
    e.preventDefault();

    // تأكيد كلمة المرور فقط بالواجهة
    if (password !== confirm) {
      alert("كلمتا المرور غير متطابقتين");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          password_confirmation: confirm,
        }),
      });

      const data = await response.json();

      console.log("response:",response)
      console.log("data:",data);

      if (response.ok&& data.success) {
        alert(data.message);
        navigate("/login");
        // حفظ التوكن + المستخدم
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

      } else {
        alert(data.message || "فشل إنشاء الحساب");
      }
    } catch (error) {
      console.error("Register Error:", error);
      alert("خطأ في الاتصال بالسيرفر");
    }
  };

  return (
    <div className="register-page">
      {/* IMAGE SIDE */}

      <div className="image-side">
        <img src={travel} alt="travel" />

        <div className="overlay">
          <div className="links-left">
            <Link to="/Support" className="nav-link">
              الدعم والمساعدة
            </Link>

            <Link to="/PrivacyPolicy" className="nav-link">
              سياسة الخصوصية
            </Link>
          </div>
        </div>
      </div>

      <div className="form-side">
        <div className="home-link">
          <Link to="/home" className="home-link-content">
            <span>الرئيسية</span>
            <span className="divider"></span>
            <img src={logo} alt="logo" />
          </Link>
        </div>

        <div className="register-box">
          <h1>إنشاء حساب</h1>

          <p>أنشئ حسابك الجديد</p>

          <form onSubmit={submitRegister}>
            <div className="field">
              <label>الاسم الكامل</label>

              <div className="input-box">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>

            <div className="field">
              <label>البريد الإلكتروني</label>

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
                <FaPhone />
                رقم الهاتف
              </label>

              <div className="input-box">
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>

            <div className="field">
              <label>
                <FaLock />
                كلمة المرور
              </label>

              <div className="input-box">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="field">
              <label>
                <FaLock />
                تأكيد كلمة المرور
              </label>

              <div className="input-box">
                <input
                  type="password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                />
              </div>
            </div>

            <button type="submit">إنشاء حساب</button>
          </form>

          <p className="login-text">
            تملك حساب بالفعل؟
            <Link to="/Login">تسجيل الدخول</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
