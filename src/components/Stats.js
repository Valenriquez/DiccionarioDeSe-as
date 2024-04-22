import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import NavbarUser from '../components/NavbarUser';
import Sidebar from '../components/Sidebar';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PieChart, Pie, BarChart, Bar, XAxis, YAxis, Tooltip, Cell, Legend } from 'recharts';
import './Stats.css'; // Import the CSS file



function Stats() {
  const buttons = [
     { label: 'Tutorial', link: '/tutorial' },
  ];

  const [tracker, setTracker] = useState([]);
  const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#0088aa'];

  useEffect(() => {
    axios.get('https://vc5kqp87-3000.usw3.devtunnels.ms/api/v1/tracker/getall')
      .then(res => {
        console.log('API Response tracker:', res.data); // Log the API response data
        const sortedTracker = res.data.tracker.sort((a, b) => b.counter - a.counter);
        setTracker(sortedTracker); 
      })
      .catch(err => console.log('API Error:', err)); // Log any API errors
  }, []); // Empty dependency array to run the effect only once

  console.log('tracker Array:', tracker); // Log the state of the ad

  return (
    <>
      <div className='grid-container-inicio'>
        <Sidebar />
        <div className='navbar'>
          <NavbarUser buttons={buttons} />
        </div>
       </div>
      <div className="container-stats">
        <h1>Estadísticas y Gráficas</h1>  
          <ul>
            {tracker.map((item, index) => (
              <div className='box'> <li key={index}>{item.word} fue usado {item.counter} veces</li></div>
            ))}
          </ul>

          <div className='chart-container-pie'>  
          
          <PieChart width={900} height={900}>
          <Pie
            data={tracker}
            dataKey="counter" // Counter is used as the value for the chart
            nameKey="word" // Word is used as the label for the chart
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            label
          >
            {tracker.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
       
        
         <BarChart width={400} height={300} data={tracker}>
        <XAxis dataKey="word" />
        <YAxis />
        <Bar dataKey="counter" fill="#8884d8" />
        <Tooltip />
        <Legend />
        </BarChart>
        </div>

       </div>
    </>
  );
}

export default Stats
