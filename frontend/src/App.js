import { BrowserRouter , Routes , Route } from "react-router-dom";
//import logo from './logo.svg';
import './App.css';
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Support from "./pages/Support";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Trips from './pages/Trips'
import Exploration from "./pages/Exploration";
import PlaceDetails from "./pages/PlaceDetails";
import MyBookings from "./pages/MyBookings";
import TripDetails from "./pages/TripDetails";
import BookingConfirmation from "./pages/BookingConfirmation";
import Payment from "./pages/Payment";
import ComingSoon from "./pages/ComingSoon";
import BookingSuccess from "./pages/BookingSuccess";
import Profile from './pages/Profile';


function App() {
  return (
  
 <BrowserRouter>

      <Routes>
        <Route  path="/"  element={<Login />} />
        <Route  path="/home"  element={<Home />}  />
        <Route path="/login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Support" element={<Support />} />
        <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
        <Route path="/exploration" element={<Exploration />}/>
        <Route path="/places/:id" element={<PlaceDetails />}/>
        <Route path="/bookings" element={<MyBookings />}/>
        <Route path="/Profile" element={<Profile />} />


        {/* السطر الجديد الذي ستضيفه لصفحة الرحلات */}
        <Route path="/trips" element={<Trips/>} />
        <Route path="/trips/:id" element={<TripDetails/>} />
        <Route path="/booking/:tripId" element={<BookingConfirmation/>} />
        <Route path="/booking/:tripId/payment" element={<Payment/>} />

        {/* صفحات مرتبطة من التنقّل الحالي (Header/Footer) دون تصميم نهائي بعد */}
        <Route path="/about" element={<ComingSoon title="من نحن" />} />
        <Route path="/terms" element={<ComingSoon title="الشروط والأحكام" />} />
        <Route path="/forgot-password" element={<ComingSoon title="استعادة كلمة المرور" />} />

        <Route path="/booking-success" element={<BookingSuccess />}/>    
      
      </Routes>

    </BrowserRouter>
  



  );

}

export default App;
