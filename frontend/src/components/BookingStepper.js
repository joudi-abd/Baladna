import React from "react";
import { FiCheck } from "react-icons/fi";

const STEPS = [
  { number: 1, label: "تفاصيل الحجز" },
  { number: 2, label: "الدفع" },
  { number: 3, label: "تم الحجز", icon: FiCheck },
];

// شريط تقدّم الحجز القابل لإعادة الاستخدام عبر شاشات "تفاصيل الحجز / الدفع / تم الحجز"
function BookingStepper({ activeStep }) {
  return (
    <ol className="booking-stepper">
      {STEPS.map((step) => {
        const status =
          step.number < activeStep
            ? "completed"
            : step.number === activeStep
            ? "active"
            : "upcoming";

        // الخطوات المكتملة تعرض علامة صح دائمًا، وكذلك الخطوة صاحبة أيقونة ثابتة (مثل "تم الحجز")
        const showCheck = status === "completed" || Boolean(step.icon);
        const progressed = step.number <= activeStep;

        return (
          <li
            className={`booking-stepper-step is-${status} ${
              progressed ? "has-progress" : ""
            }`}
            key={step.number}
          >
            <span className="booking-stepper-circle">
              {showCheck ? <FiCheck /> : step.number}
            </span>

            <span className="booking-stepper-label">{step.label}</span>
          </li>
        );
      })}
    </ol>
  );
}

export default BookingStepper;
