import React, { useState } from "react";
import "./chart.css";
import chartIcon from '../../assets/icons/redChart.svg';

const AreaWeekChart = ({data, color, id}) => {
  if(!data) {
    data = [];
  }
  const [hoverIndex, setHoverIndex] = useState(2);
  const chartWidth = 100;
  const chartHeight = 58;
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
    <section className="area-week-chart-container">
      <div className="week-container">
        <div className="week">
          <div className="date" style={{ backgroundColor: color}} >
            <div className="month-container">
              <div className="month">Jun</div>
            </div>
            <div className="day">02</div>
          </div>
          <div className="chart .week-chart">
            <svg
              className="area-chart area-chart-week"
              viewBox={`0 0 ${chartWidth} ${50}`}
            >
              {/* Define the gradients */}
              <defs>
                <linearGradient
                  id={"weekAreaGradient"+id}
                  x1="0%"
                  y1="0%"
                  x2="0%"
                  y2="100%"
                >
                  <stop
                    offset="0%"
                    style={{ stopColor: color, stopOpacity: 1 }}
                  />
                  <stop
                    offset="100%"
                    style={{ stopColor: "#D9D9D9", stopOpacity: 0 }}
                  />
                </linearGradient>
                <linearGradient
                  id={"weekBarAreaGradient"+id}
                  x1="0%"
                  y1="0%"
                  x2="0%"
                  y2="100%"
                >
                  <stop
                    offset="0%"
                    style={{
                      stopColor: "rgba(246, 230, 199, 1)",
                      stopOpacity: 1,
                    }}
                  />
                  <stop
                    offset="100%"
                    style={{
                      stopColor: color,
                      stopOpacity: 1,
                    }}
                  />
                </linearGradient>
                {/* ***************** Define a clipPath based on the path line ***************** */}
                <clipPath id="barClip">
                  {/* Area under the linePath */}
                  <path 
                    d={`${linePath} L ${chartWidth},${chartHeight} L 0,${chartHeight} Z`}
                  />
                </clipPath>
              </defs>
              {/* Filled Area */}
              <path

                className="area pointer"
                d={areaPath}
                fill={"url(#weekAreaGradient"+id+")"}
              />
              {/* Smooth Line */}
              <path className="week-line pointer" style={{  stroke: color}}  d={linePath} />

              {/* Vertical Bar on Hover */}
              {data.map((item, index) => {
                return (
                  <rect
                    className="week-bar pointer"
                    x={index * scaleX - scaleX / 2.5}
                    y={chartHeight - data[index].uv * scaleY}
                    width={scaleX * 0.8}
                    height={data[index].uv * scaleY}
                    fill={
                      index === hoverIndex
                        ? "url(#weekBarAreaGradient"+id+")"
                        : "rgba(255, 91, 91, 0)"
                    }
                    onMouseEnter={() => setHoverIndex(index)}
                  />
                );
              })}
        
            
              {/* Dots and Values */}
              {data.map((item, index) => (
                <g key={`dot-group-${index}`}>
                  {/* Outer circle */}
                  <circle
                    cx={index * scaleX}
                    cy={chartHeight - data[index].uv * scaleY}
                    r="3"
                    fill={index === hoverIndex ? "rgba(246, 227, 227, 1)" : "rgba(246, 227, 227, 0)"}
                  />
                  {/* Inner circle */}
                  <circle
                    cx={index * scaleX}
                    cy={chartHeight - data[index].uv * scaleY}
                    r="1.5"
                    fill={index === hoverIndex ? color : "rgba(255, 91, 91, 0)"}
                  />
                  {/* UV Value with background */}
                  {index === hoverIndex && (
                    <g className="uv-value-container">
                      {/* Background rect */}
                      <rect
                        x={(index!==0 && index !== data.length-1)? index * scaleX - 8 : (index === 0 ? (index * scaleX - 0) : (index * scaleX - 16))}
                        y={(item.uv !== maxValue) ? ((chartHeight - data[index].uv * scaleY) - 10): ((chartHeight - data[index].uv * scaleY) +5)}
                        width="16"
                        height="6"
                        rx="2.25"
                        ry="5"
                        fill="rgba(30, 27, 57, 1)"
                        className="uv-value-bg"
                      />
                      {/* Value text */}
                      <text
                        x={(index!==0 && index !== data.length-1)? index * scaleX  : (index === 0 ? (index * scaleX + 8) : (index * scaleX - 8))}
                        y={(item.uv !== maxValue) ? ((chartHeight - data[index].uv * scaleY) - 5.5): ((chartHeight - data[index].uv * scaleY) + 9.5)}
                        textAnchor="middle"
                        fill="rgba(255, 255, 255, 1)"
                        fontWeight = "700"
                        fontSize="4"
                        className="uv-value"
                      >
                       ${item.uv}
                      </text>
                    </g>
                  )}
                </g>
              ))}
            </svg>

            {/* days */}
            <div className="x-date-week">
              {data.map((d, i) => {
                const x = i * scaleX;
                return (
                  <div
                    key={i}
                    className="week-day"
                    style={{ left: `${(x / chartWidth) * 100}%` }}
                    onMouseEnter={() => setHoverIndex(i)}
                  >
                    <span>{d.date}</span>
                 
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="profit-container">
        <div className="profit">
          <h2>$33,567</h2>
          <span>Profit</span>
        </div>
        <div className="color">
          <div className="circle" style={{ backgroundColor: color}}></div>
        </div>
      </div>

      <div className="total-container">
        <h2>Total Income</h2>
        <div className="small-chart">
          {/* <img src={chartIcon} alt="total" width={85} /> */}
        </div>
        <h2>368,90</h2>
      </div>
    </section>
  );
};

export default AreaWeekChart;
