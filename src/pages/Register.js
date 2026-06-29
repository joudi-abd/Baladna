import { useState } from "react";
import "../styles/register.css";
import travel from "../assets/travel.jpg";
import logo from "../assets/Logo.png";
import { Link } from "react-router-dom";
import { FaLock, FaPhone } from "react-icons/fa";

function Register() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const submitRegister = (e) => {
    e.preventDefault();

    console.log({
      name,
      email,
      phone,
      password,
      confirm
    });
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
  <img src={logo} alt="logo"/>
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
                onChange={(e)=>setName(e.target.value)}
                />

              </div>

            </div>



            <div className="field">

              <label>البريد الإلكتروني</label>

              <div className="input-box">

                <input
                type="email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                />

              </div>

            </div>



            <div className="field">

              <label>
                <FaPhone/>
                رقم الهاتف
              </label>

              <div className="input-box">

                <input
                type="text"
                value={phone}
                onChange={(e)=>setPhone(e.target.value)}
                />

              </div>

            </div>



            <div className="field">

              <label>
                <FaLock/>
                كلمة المرور
              </label>

              <div className="input-box">

                <input
                type="password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                />

              </div>

            </div>



            <div className="field">

              <label>
                <FaLock/>
                تأكيد كلمة المرور
              </label>

              <div className="input-box">

                <input
                type="password"
                value={confirm}
                onChange={(e)=>setConfirm(e.target.value)}
                />

              </div>

            </div>



            <button type="submit">

              إنشاء حساب

            </button>



          </form>



          <p className="login-text">

            تملك حساب بالفعل؟

            <Link to="/Login">
              تسجيل الدخول
            </Link>

          </p>



        </div>


      </div>


    </div>

  );
}


export default Register;