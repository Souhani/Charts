import React, { useState } from "react";
import "./chart.css";

export default function BarProgressChart({data}) {
  if(!data) {
    data=[]
  }
  const maxValue = Math.max(...data.map((item) => item.value));

  return (
    <section className="bars-container">
      <h1 className="title">
        <span>Miles</span> Statistics
      </h1>
      <div className="bars-header">
        <ul>
          <li
            style={{ backgroundColor: "rgba(40, 132, 255, 1)", color: "white" }}
          >
            Day
          </li>
          <li>Week</li>
          <li>Month</li>
        </ul>
        <h2>256 Miles</h2>
      </div>
      <div className="chart">
        {data.map((item, index) => (
          <div key={item.name} className="bar-container">
            <div>
            <div
              className={`bar`}
              style={{
                height: `${(item.value / maxValue) * 300}px`,
              }}
            >
                          <div className="label">
            <div className="date">{item.date}</div>
              <div className="value">
                <div className="circle"></div>
                {item.value}
              </div>
            </div>
              {index !== 0 && index !== data.length && (
                <div className="sperate-line"></div>
              )}
            </div>
            <div className="date">{item.date}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
