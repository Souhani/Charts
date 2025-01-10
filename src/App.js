import './App.css';
import CircularProgressBar from './charts/circularProgress/chart';

//import icons
import lightining from './assets/icons/lightning.svg';
import range from './assets/icons/range.svg';
import fluid from './assets/icons/fluid.svg';
import tire from './assets/icons/tire.svg';


import BarProgressChart from './charts/barChart/chart';
import AreaChart from './charts/areaChart/chart';
import AreaWeekChart from './charts/areaWeekChart/chart';
import BarTwoChart from './charts/barTwoChart/chart';

import { useState } from 'react';




function App() {
  
  // circularProgressBarData
  const [circularProgressBarData, setCircularProgressBarData] = useState([{
    percentage: 67,
    icon:  lightining,
    title: "Energy",
    color: 'rgba(255, 255, 255, 1)',
    iconBgColor:"rgb(179, 125, 255)",
    bgColor: "rgba(161, 98, 247, 1)",
    textColor:"rgba(255, 255, 255, 1)"
  },
  {
    percentage: 58,
    icon: range,
    title: "Range",
    color: 'rgba(255, 126, 134, 1)',
    iconBgColor:"rgba(255, 126, 134, 0.3)",
    bgColor: "rgba(255, 255, 255, 1)",
    textColor:"rgba(36, 39, 49, 1)"
  },
  {
    percentage: 9,
    icon: fluid,
    title: "Break fluid",
    color: 'rgba(161, 98, 247, 1)',
    iconBgColor:"rgba(161, 98, 247, 0.3)",
    bgColor: "rgba(255, 255, 255, 1)",
    textColor:"rgba(36, 39, 49, 1)"
  },
  {
    percentage: 80,
    icon: tire,
    title: "Tire Wear",
    color: 'rgba(246, 204, 13, 1)',
    iconBgColor:"rgba(246, 204, 13, 0.3)",
    bgColor: "rgba(255, 255, 255, 1)",
    textColor:"rgba(36, 39, 49, 1)"
  },
])

  // AreaWeekChart
  const [areaWeekChart, setAreaWeekChart] = useState( [
    { name: "Page A", uv: 2000, date: "M" },
    { name: "Page A", uv: 1000, date: "T" },
    { name: "Page A", uv: 500, date: "W" },
    { name: "Page A", uv: 4000, date: "T" },
    { name: "Page B", uv: 3000, date: "F" },
    { name: "Page C", uv: 2000, date: "S" },
    { name: "Page D", uv: 2780, date: "S" },
  ])

    // BarTwoChart
    const [barTwoChart, setBarTwoChart] = useState(  [
      { day: "M", value: 50, expectedValue: 100 },
      { day: "T", value: 30, expectedValue: 80 },
      { day: "W", value: 10, expectedValue: 20 },
      { day: "Th", value: 70, expectedValue: 100 },
      { day: "F", value: 40, expectedValue: 90 },
    ])
 // BarChart
 const [barChart, setBarChart] = useState( [ { name: "Page A", value: 8000, date: "1 PM" },
  { name: "Page B", value: 3000, date: "2 PM" },
  { name: "Page C", value: 2000, date: "3 PM" },
  { name: "Page D", value: 2780, date: "4 PM" },
  { name: "Page E", value: 1890, date: "5 PM" }])

   // AreaChart
 const [areaChart, setAreaChart] = useState( [
  { name: "Page A", uv: 2000, date: "10 AM" },
  { name: "Page A", uv: 1000, date: "11 AM" },
  { name: "Page A", uv: 500, date: "12 AM" },
  { name: "Page A", uv: 4000, date: "1 PM" },
  { name: "Page B", uv: 3000, date: "2 PM" },
  { name: "Page C", uv: 2000, date: "3 PM" },
  { name: "Page D", uv: 2780, date: "4 PM" },
  { name: "Page E", uv: 1890, date: "5 PM" },
  { name: "Page F", uv: 2390, date: "6 PM" },
  { name: "Page G", uv: 3490, date: "7 PM" },
])

  return (
    <div className='app'>
    <div className='app-container'>
      <h1 className='app-title'>Circular Progress Bar:</h1>
      <div >
      <label className='app-label'>chart data (please past  a valid JSON OBJECT DATA):</label>
      <textarea
        value={JSON.stringify(circularProgressBarData)}
        rows="4"
        cols="50"
        placeholder="chart data here..."
        onChange = {(e) => { setCircularProgressBarData(JSON.parse(e.target.value))}}
      />
      </div>
      <div className='app-cmp-container'>
      {circularProgressBarData.map((item, index) => (
              <CircularProgressBar percentage={item.percentage} icon={item.icon}  title={item.title} color={item.color} iconBgColor={item.iconBgColor} bgColor={item.bgColor} textColor={item.textColor} />
      ))}
      </div>
    </div>
    <div className='app-container'>
      <h1 className='app-title'>Weekly Data Area Chart:</h1>
      <div >
      <label className='app-label'>chart data (please past a valid JSON OBJECT DATA):</label>
      <textarea
        value={JSON.stringify(areaWeekChart)}
        rows="4"
        cols="50"
        placeholder="chart data here..."
        onChange = {(e) => { setAreaWeekChart(JSON.parse(e.target.value))}}
      />
      </div>
      <div className='app-cmp-container'>
              <AreaWeekChart  data={areaWeekChart} color={"rgba(255, 91, 91, 1)"} id={"wc1"}/>
      </div>
    </div>
    <div className='app-container'>
      <h1 className='app-title'>Weekly Data Area Chart:</h1>
      <div >
      <label className='app-label'>chart data (please past a valid JSON OBJECT DATA):</label>
      <textarea
        value={JSON.stringify(areaWeekChart)}
        rows="4"
        cols="50"
        placeholder="chart data here..."
        onChange = {(e) => { setAreaWeekChart(JSON.parse(e.target.value))}}
      />
      </div>
      <div className='app-cmp-container'>
              <AreaWeekChart  data={areaWeekChart} color={"rgba(40, 132, 255, 1)"} id={"wc2"}/>
      </div>
    </div>
    <div className='app-container'>
      <h1 className='app-title'>Weekly Data Bar Chart:</h1>
      <div >
      <label className='app-label'>chart data (please past a valid JSON OBJECT DATA):</label>
      <textarea
        value={JSON.stringify(barTwoChart)}
        rows="4"
        cols="50"
        placeholder="chart data here..."
        onChange = {(e) => { setBarTwoChart(JSON.parse(e.target.value))}}
      />
      </div>
      <div className='app-cmp-container'>
              <BarTwoChart  data={barTwoChart} mainColor={"rgba(255, 91, 91, 1)"} minColor={"rgba(255, 168, 0, 1)"}  minColorExp={"rgba(246, 217, 161, 1)"}/>
      </div>
    </div>
    <div className='app-container'>
      <h1 className='app-title'>Weekly Data Bar Chart:</h1>
      <div >
      <label className='app-label'>chart data (please past a valid JSON OBJECT DATA):</label>
      <textarea
        value={JSON.stringify(barTwoChart)}
        rows="4"
        cols="50"
        placeholder="chart data here..."
        onChange = {(e) => { setBarTwoChart(JSON.parse(e.target.value))}}
      />
      </div>
      <div className='app-cmp-container'>
              <BarTwoChart  data={barTwoChart} mainColor={"rgba(41, 131, 254, 1)"} minColor={"rgba(161, 98, 247, 1)"}  minColorExp={"rgba(161, 98, 247, 0.3)"}/>
      </div>
    </div>
    <div className='app-container'>
      <h1 className='app-title'>Area Chart:</h1>
      <div >
      <label className='app-label'>chart data (please past a valid JSON OBJECT DATA):</label>
      <textarea
        value={JSON.stringify(areaChart)}
        rows="4"
        cols="50"
        placeholder="chart data here..."
        onChange = {(e) => { setAreaChart(JSON.parse(e.target.value))}}
      />
      </div>
      <div className='app-cmp-container'>
              <AreaChart data={areaChart}/>
      </div>
    </div>
    <div className='app-container'>
      <h1 className='app-title'>Bar Chart:</h1>
      <div >
      <label className='app-label'>chart data (please past a valid JSON OBJECT DATA):</label>
      <textarea
        value={JSON.stringify(barChart)}
        rows="4"
        cols="50"
        placeholder="chart data here..."
        onChange = {(e) => { setBarChart(JSON.parse(e.target.value))}}
      />
      </div>
      <div className='app-cmp-container'>
              <BarProgressChart data={barChart}/>
      </div>
    </div>
    </div>
  );
}

export default App;