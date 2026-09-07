import React from "react";
import ServiceCard from "./ServiceCard";
import SectionHeading from "./SectionHeading";
import { services } from "../data/homeMockData";

function Services() {
  return (
    <section className="home-section services-section">
      <SectionHeading
        title="خدماتنا"
        subtitle="نساعدك على اتخاذ أفضل القرارات بثقة ووضوح، من خلال إرشاد واضح وتجربة سياحية بسيطة دون تعقيد."
      />

      <div className="services-grid">
        {services.map((service) => (
          <ServiceCard
            key={service.id}
            icon={service.icon}
            title={service.title}
            description={service.description}
          />
        ))}
      </div>
    </section>
  );
}

export default Services;
