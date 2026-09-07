import React from "react";
import SectionHeading from "./SectionHeading";
import TestimonialCard from "./TestimonialCard";
import { testimonials } from "../data/homeMockData";

function Reviews() {
  return (
    <section className="home-section reviews-section">
      <SectionHeading
        title="آراء زوار Baladna"
        subtitle="آراء عملائنا حول تجربة استخدام الخدمات، من خلال آراء زوار موقعنا"
        showArrows
      />

      <div className="reviews-grid">
        {testimonials.map((testimonial) => (
          <TestimonialCard key={testimonial.id} testimonial={testimonial} />
        ))}
      </div>
    </section>
  );
}

export default Reviews;
