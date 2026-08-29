// داخل مكون الـ Navbar الخاص بك
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-links">
        <Link to="/about">من نحن</Link>
        
        {/* هنا نربط كلمة الرحلات بالمسار المخصص لها */}
        <Link to="/trips">الرحلات</Link> 
        
        <Link to="/explore">استكشف</Link>
        <Link to="/">الرئيسية</Link>
      </div>
    </nav>
  );
};

export default Navbar;