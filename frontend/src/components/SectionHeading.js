import React from "react";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";

// عنوان قسم قابل لإعادة الاستخدام (خدماتنا / أماكن مميزة / الرحلات المتاحة / آراء الزوار)
// showArrows: يعرض أسهم تنقل زخرفية بجانب العنوان كما في التصميم
function SectionHeading({ title, subtitle, showArrows }) {
  return (
    <div className="section-heading">
      <div className="section-heading-row">
        <h2>{title}</h2>

        {showArrows && (
          <div className="section-arrows">
            {/* لا يوجد محتوى إضافي للتنقل إليه حاليًا (كل العناصر معروضة على الصفحة)؛
                الأسهم معطّلة بدل أن تكون بلا وظيفة */}
            <button type="button" aria-label="السابق" className="section-arrow-btn" disabled>
              <FiChevronRight />
            </button>
            <button type="button" aria-label="التالي" className="section-arrow-btn" disabled>
              <FiChevronLeft />
            </button>
          </div>
        )}
      </div>

      {subtitle && <p>{subtitle}</p>}
    </div>
  );
}

export default SectionHeading;
