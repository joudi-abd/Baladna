import React from "react";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";

// أسهم تنقل عامة قابلة لإعادة الاستخدام لأي سلايدر/كاروسيل في الموقع
function CarouselArrows({ onPrevious, onNext, canGoPrevious, canGoNext, label }) {
  return (
    <div className="section-navigation" dir="ltr">
      <button
        type="button"
        className="section-arrow"
        onClick={onPrevious}
        disabled={!canGoPrevious}
        aria-label={`${label} السابقة`}
      >
        <FiChevronLeft />
      </button>

      <button
        type="button"
        className="section-arrow"
        onClick={onNext}
        disabled={!canGoNext}
        aria-label={`${label} التالية`}
      >
        <FiChevronRight />
      </button>
    </div>
  );
}

export default CarouselArrows;
