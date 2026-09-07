import React from "react";

import Header from "../components/Header";
import Hero from "../components/Hero";
import Services from "../components/Services";
import Places from "../components/Places";
import About from "../components/About";
import AvailableTrips from "../components/AvailableTrips";
import Reviews from "../components/Reviews";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

import "../styles/home.css";

function Home() {
  return (
    <div className="home home-page">

      <Header />

      <Hero />

      <Services />

      <Places />

      <About />

      <AvailableTrips/>

      <Reviews/>

      <Contact/>

      <Footer />

    </div>
  );
}

export default Home;