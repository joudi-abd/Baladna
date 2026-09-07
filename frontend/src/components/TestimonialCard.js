import React from "react";
import { FiStar } from "react-icons/fi";

// كرت رأي زائر يُستخدم في قسم "آراء زوار Baladna"
// لا تتوفر صور شخصية حقيقية للزوار حاليًا، لذلك يتم عرض الأحرف الأولى من الاسم كصورة رمزية بديلة
function TestimonialCard({ testimonial }) {
  const initials = testimonial.name.trim().charAt(0);

  return (
    <div className="home-review-card">
      <div className="review-stars">
        {Array.from({ length: 5 }).map((_, index) => (
          <FiStar
            key={index}
            className={index < testimonial.rating ? "star-filled" : "star-empty"}
          />
        ))}
      </div>

      <p className="review-comment">{testimonial.comment}</p>

      <div className="review-user-row">
        <div className="home-review-avatar">{initials}</div>

        <div className="review-user-info">
          <strong className="home-review-user">{testimonial.name}</strong>
          <span className="review-target">{testimonial.role}</span>
        </div>
      </div>
    </div>
  );
}

export default TestimonialCard;
