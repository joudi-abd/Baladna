import React from "react";
import { FiShield, FiCompass, FiMessageCircle, FiFlag } from "react-icons/fi";

const ICONS = {
  shield: FiShield,
  compass: FiCompass,
  message: FiMessageCircle,
  flag: FiFlag,
};

function ServiceCard({ icon, title, description }) {
  const Icon = ICONS[icon] || FiShield;

  return (
    <div className="service-card">
      <div className="service-icon">
        <Icon />
      </div>

      <h3>{title}</h3>

      <p>{description}</p>
    </div>
  );
}

export default ServiceCard;
