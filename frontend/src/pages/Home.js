import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Services from "../components/Services";
import Places from "../components/Places";
import About from "../components/About";
import Footer from "../components/Footer";

import "../styles/home.css";


function Home(){

return (

<div className="home">
<Navbar/>

<Hero/>

<Services/>

<Places/>

<About/>

<Footer/>
</div>

)

}


export default Home;
//import Navbar from "../components/Navbar";
/*import Hero from "../components/Hero";
function Home(){

return (

<div>

<h1>
قبل النافبار
</h1>



<h1>
بعد النافبار
</h1>


</div>

)

}

/ظ*export default Home;*/
/*export default function Home() {
  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      background: "red",
      color: "white"
    }}>
      HOME TEST FULL SCREEN
    </div>
  );
}*/