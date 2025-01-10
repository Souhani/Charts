import React, { useState } from "react";
import "./chart.css";
import arr from "../../assets/icons/arrowR.svg";

const BarTwoChart = ({data, mainColor, minColor, minColorExp}) => {
  if(!data) {
    data =  [];
  }
    const [showDatePicker, setShowDatePicker] = useState(false); // Controls visibility of the date picker
    const [selectedDate, setSelectedDate] = useState("19 JULY 2024"); // Default selected date
  
    const handleArrowClick = () => {
      setShowDatePicker(!showDatePicker); // Toggle date picker visibility
    };
  
    const handleDateChange = (event) => {
      const date = new Date(event.target.value).toLocaleDateString("en-US", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });
      setSelectedDate(date); // Update the selected date
      setShowDatePicker(false); // Hide the date picker after selection
    };

    
  const maxExpectedValue = Math.max(...data.map((d) => d.expectedValue));
  const minValue = Math.min(...data.map((d) => d.value));

  return (
    <section className="bar-tow-chart">
      <h1>
        <div className="title">Cash Flow</div>
        <div className="total">$33,567,00</div>
      </h1>
      <div className="chart-area">
        {/* Dashed horizontal line */}
        <div
          className="dashed-line"
          style={{
            bottom: `${(maxExpectedValue / 2 / maxExpectedValue) * 100}%`,
          }}
        ></div>

        {/* Bars */}
        {data.map((d, index) => {
          const isMinValue = d.value === minValue;
          return (
            <div className="bar-group" key={index}>
              {/* Expected bar */}
              <div
                className={`bar expected  ${isMinValue ? "min" : ""}`} 
                style={
                  {
                    backgroundColor: isMinValue ?  minColorExp : "rgba(233, 236, 243, 1)",
                  height: `${(d.expectedValue / maxExpectedValue) * 100}%`,
                }}
              >
                {/* hover dot */}
                <div className="dot-container">
                  <div className="dot" style={{backgroundColor:mainColor }}></div>
                </div>

                {/* hover value */}
                <div className="value-container">
                  <div className="value">{d.expectedValue}</div>
                </div>
              </div>

              {/* Value bar */}
              <div
                className={`bar value ${isMinValue ? "min" : ""}` } 
                style={{
                  backgroundColor: isMinValue ?  minColor : mainColor,
                  height: `${(d.value / maxExpectedValue) * 100}%`,
                }}
              ></div>
              {/* Day label */}
              <div className="day-label">{d.day}</div>
            </div>
          );
        })}
      </div>
      <div className="select-date">
        <div className="date-text">
          <h2>Date</h2>
          <p>{selectedDate}</p>
        </div>
        <div
          className={`date-arr pointer ${showDatePicker ? "flipped" : ""}`}
          onClick={handleArrowClick}
        >
          <img src={arr} alt="Select Date" />
        </div>
      </div>
      {showDatePicker && (
        <div className="date-input">
          <input
            type="date"
            onChange={handleDateChange}
            style={{
              marginTop: "10px",
              padding: "5px",
              fontSize: "16px",
            }}
          />
        </div>
      )}
    </section>
  );
};

export default BarTwoChart;
