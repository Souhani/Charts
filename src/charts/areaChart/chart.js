import React from "react";
import "./chart.css";


const AreaChart = ({data}) => {
  if(!data) {
    data=[]
  }
  const chartWidth = 500;
  const chartHeight = 300;
  const maxValue = Math.max(...data.map((d) => d.uv));
  const scaleX = chartWidth / (data.length - 1);
  const scaleY = chartHeight / maxValue;

  // Generate the smooth path for the line chart
  const linePath = data.reduce((path, point, index) => {
    const x = index * scaleX;
    const y = chartHeight - point.uv * scaleY;

    if (index === 0) {
      return `M ${x},${y}`; // Move to the first point
    }

    const prevX = (index - 1) * scaleX;
    const prevY = chartHeight - data[index - 1].uv * scaleY;

    // Calculate control points for smoothness
    const controlX1 = prevX + scaleX / 3;
    const controlY1 = prevY;
    const controlX2 = x - scaleX / 3;
    const controlY2 = y;

    return `${path} C ${controlX1},${controlY1} ${controlX2},${controlY2} ${x},${y}`;
  }, "");
  const areaPath = `${linePath} L ${chartWidth},${chartHeight} L 0,${chartHeight} Z`;


  return (
    <section className="area-chart-container">
      <h1 className="title">
        <span>Car</span>  Statistics
      </h1>
      <div className="area-chart-header">
        <h2>20 February 2022</h2>
        <ul>
          <li
            style={{ backgroundColor: "rgba(255, 118, 76, 1)", color: "white" }}
          >
            Day
          </li>
          <li>Week</li>
          <li>Month</li>
        </ul>
      </div>
      <svg
        className="area-chart"
        viewBox={`0 0 ${chartWidth} ${chartHeight}`}
        width="100%"
        height="300"
      >
        {/* Define the gradient */}
        <defs>
          <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop
              offset="0%"
              style={{ stopColor: "rgba(255, 118, 76, 0.24)" }}
            />
            <stop offset="100%" style={{ stopColor: "rgba(255, 126, 7, 0)" }} />
          </linearGradient>
        </defs>

        {/* Background Grid: Aligning Grid Lines with Dots */}
        <g className="grid">
          {data.map((_, i) => (
            <line
              key={i}
              x1={i * scaleX} 
              y1="0" 
              x2={i * scaleX}
              y2={chartHeight} 
              stroke="rgba(255, 118, 76, 0.24)"
            />
          ))}
        </g>

     {/* Filled Area */}
     <path className="area" d={areaPath} fill="url(#areaGradient)" />
        {/* Smooth Line */}
        <path className="line" d={linePath} />
      </svg>
      {/* Date and Vertical Line */}
      <div
        className="x-date"
        style={{
          position: "relative",
          display: "flex",
          justifyContent: "space-between", 
        }}
      >
        {data.map((d, i) => (
          <div
            key={i}
            className="date"
            style={{
              position: "absolute",
              left: `${i * scaleX}px`, // Align with each dot
            }}
          >
            <span
              style={{
                position: "absolute",
                transform: "translateX(-50%)",
                whiteSpace: "nowrap", 
                overflow: "hidden",
                textOverflow: "ellipsis", 
              }}
            >
              {d.date}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AreaChart;
