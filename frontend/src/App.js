import { BrowserRouter , Routes , Route } from "react-router-dom";
//import logo from './logo.svg';
import './App.css';
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Support from "./pages/Support";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Trips from './pages/Trips'

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
  
        {/* السطر الجديد الذي ستضيفه لصفحة الرحلات */}
        <Route path="/trips" element={<Trips/>} />
      </Routes>

    </BrowserRouter>
  



  );

}

export default App;
