import "./chart.css";
import React, { useEffect, useState } from "react";

export default function CircularProgressBar({
  icon,
  color,
  iconBgColor,
  bgColor,
  textColor,
  percentage: targetPercentage,
  title,
}) {
  return (
    <section
      className="circular-bar-container"
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      <div
        className="icon-container"
        style={{ backgroundColor: iconBgColor, color: color }}
      >
        <div className="icon">
          {" "}
          <img src={icon} alt={title} />{" "}
        </div>
      </div>
      <h1 className="text">{title}</h1>
      <div className="bar">
        <CircularGauge
          iconBgColor={iconBgColor}
          color={color}
          targetPercentage={targetPercentage}
        />
      </div>
    </section>
  );
}

const CircularGauge = ({
  targetPercentage = 50,
  startAngle = 140,
  endAngle = 400,
  iconBgColor,
  color,
}) => {
  const [percentage, setPercentage] = useState(0);
  useEffect(() => {
    let start = 0;
    const duration = 300;
    const interval = 1;
    const increment = targetPercentage / (duration / interval);

    const timer = setInterval(() => {
      start += increment;
      if (start >= targetPercentage) {
        start = targetPercentage;
        clearInterval(timer);
      }
      setPercentage(Math.ceil(start));
    }, interval);

    return () => clearInterval(timer);
  }, [targetPercentage]);

  const radius = 80;
  const strokeWidth = 15;
  const normalizedRadius = radius - strokeWidth / 2;

  // Ensure percentage is between 0 and 100
  const clampedPercentage = Math.min(100, Math.max(0, percentage));

  const degreesToRadians = (degrees) => degrees * (Math.PI / 180);

  const generateArcPath = (radius) => {
    const startAngleRad = degreesToRadians(startAngle);
    const endAngleRad = degreesToRadians(endAngle);
    const startX = 90 + radius * Math.cos(startAngleRad);
    const startY = 90 + radius * Math.sin(startAngleRad);
    const endX = 90 + radius * Math.cos(endAngleRad);
    const endY = 90 + radius * Math.sin(endAngleRad);

    // Calculate the total arc span
    const arcSpan = endAngle - startAngle;
    const largeArcFlag = arcSpan > 180 ? 1 : 0;

    return `M ${startX} ${startY} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}`;
  };

  const getProgressPath = () => {
    const arcSpan = endAngle - startAngle;
    const progressAngle = startAngle + arcSpan * (clampedPercentage / 100);

    const startAngleRad = degreesToRadians(startAngle);
    const progressAngleRad = degreesToRadians(progressAngle);

    const startX = 90 + normalizedRadius * Math.cos(startAngleRad);
    const startY = 90 + normalizedRadius * Math.sin(startAngleRad);
    const endX = 90 + normalizedRadius * Math.cos(progressAngleRad);
    const endY = 90 + normalizedRadius * Math.sin(progressAngleRad);

    // Calculate the actual arc span of the progress
    const progressSpan = progressAngle - startAngle;
    const largeArcFlag = progressSpan > 180 ? 1 : 0;

    return `M ${startX} ${startY} A ${normalizedRadius} ${normalizedRadius} 0 ${largeArcFlag} 1 ${endX} ${endY}`;
  };

  return (
    <div className="circular-gauge">
        <svg height="100%" width="100%" viewBox="0 0 180 180">
          {/* Static Background Arc */}
          <path
            d={generateArcPath(normalizedRadius)}
            fill="none"
            stroke={iconBgColor}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            className="opacity-30"
          />
          {/* Dynamic Progress Arc */}
          <path
            d={getProgressPath()}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
        </svg>
        {/* Percentage Text */}
        <h2 className="text">{percentage}%</h2>
    </div>
  );
};
