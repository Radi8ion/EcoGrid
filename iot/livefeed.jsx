// EnergyDashboard.jsx
import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import io from 'socket.io-client';
import axios from 'axios';

// Register Chart.js components
Chart.register(...registerables);

// Socket.io connection
const ENDPOINT = 'http://localhost:5000';

const EnergyDashboard = () => {
  const [liveData, setLiveData] = useState({
    voltage: 0,
    current_ma: 0,
    power_w: 0,
    energy_wh: 0
  });
  
  const [historicalData, setHistoricalData] = useState({
    labels: [],
    powerData: [],
    voltageData: [],
    currentData: []
  });
  
  const [timeRange, setTimeRange] = useState('1h');
  const [socket, setSocket] = useState(null);
  
  // Initialize Socket.io connection
  useEffect(() => {
    const newSocket = io(ENDPOINT);
    
    newSocket.on('connect', () => {
      console.log('Connected to server');
    });
    
    newSocket.on('energy-update', (data) => {
      setLiveData(data);
      
      // Add to historical data
      setHistoricalData(prev => {
        const newLabels = [...prev.labels, new Date().toLocaleTimeString()].slice(-50);
        const newPowerData = [...prev.powerData, data.power_w].slice(-50);
        const newVoltageData = [...prev.voltageData, data.voltage].slice(-50);
        const newCurrentData = [...prev.currentData, data.current_ma].slice(-50);
        
        return {
          labels: newLabels,
          powerData: newPowerData,
          voltageData: newVoltageData,
          currentData: newCurrentData
        };
      });
    });
    
    newSocket.on('historical-data', (data) => {
      const labels = data.map(item => new Date(item.timestamp).toLocaleTimeString());
      const powerData = data.map(item => item.power_w);
      const voltageData = data.map(item => item.voltage);
      const currentData = data.map(item => item.current_ma);
      
      setHistoricalData({
        labels,
        powerData,
        voltageData,
        currentData
      });
    });
    
    setSocket(newSocket);
    
    // Cleanup on unmount
    return () => {
      newSocket.disconnect();
    };
  }, []);
  
  // Fetch historical data based on time range
  useEffect(() => {
    const fetchHistoricalData = async () => {
      const hours = timeRangeToHours(timeRange);
      const response = await axios.get(`${ENDPOINT}/api/readings?hours=${hours}`);
      
      const data = response.data;
      const labels = data.map(item => new Date(item.timestamp).toLocaleTimeString());
      const powerData = data.map(item => item.power_w);
      const voltageData = data.map(item => item.voltage);
      const currentData = data.map(item => item.current_ma);
      
      setHistoricalData({
        labels,
        powerData,
        voltageData,
        currentData
      });
    };
    
    fetchHistoricalData();
  }, [timeRange]);
  
  const timeRangeToHours = (range) => {
    switch(range) {
      case '1h': return 1;
      case '6h': return 6;
      case '24h': return 24;
      case '7d': return 24 * 7;
      case '30d': return 24 * 30;
      default: return 1;
    }
  };
  
  // Chart configuration for power data
  const powerChartData = {
    labels: historicalData.labels,
    datasets: [
      {
        label: 'Power (W)',
        data: historicalData.powerData,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderWidth: 2,
        fill: true,
        tension: 0.4
      }
    ]
  };
  
  // Chart configuration for voltage data
  const voltageChartData = {
    labels: historicalData.labels,
    datasets: [
      {
        label: 'Voltage (V)',
        data: historicalData.voltageData,
        borderColor: 'rgba(153, 102, 255, 1)',
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderWidth: 2,
        fill: true,
        tension: 0.4
      }
    ]
  };
  
  // Chart configuration for current data
  const currentChartData = {
    labels: historicalData.labels,
    datasets: [
      {
        label: 'Current (mA)',
        data: historicalData.currentData,
        borderColor: 'rgba(255, 159, 64, 1)',
        backgroundColor: 'rgba(255, 159, 64, 0.2)',
        borderWidth: 2,
        fill: true,
        tension: 0.4
      }
    ]
  };
  
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Energy Monitor'
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };
  
  // Handle sending reset command to device
  const handleReset = () => {
    axios.post(`${ENDPOINT}/api/command`, { command: 'reset' })
      .then(res => console.log('Reset command sent'))
      .catch(err => console.error('Error sending reset command:', err));
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">IoT Energy Monitor Dashboard</h1>
      
      {/* Current Readings */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-lg font-semibold text-gray-700">Voltage</h3>
          <p className="text-3xl font-bold">{liveData.voltage.toFixed(2)} V</p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-lg font-semibold text-gray-700">Current</h3>
          <p className="text-3xl font-bold">{liveData.current_ma.toFixed(2)} mA</p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-lg font-semibold text-gray-700">Power</h3>
          <p className="text-3xl font-bold">{liveData.power_w.toFixed(3)} W</p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-lg font-semibold text-gray-700">Energy</h3>
          <p className="text-3xl font-bold">{liveData.energy_wh.toFixed(3)} Wh</p>
        </div>
      </div>
      
      {/* Time Range Selector */}
      <div className="flex mb-4">
        <select 
          className="p-2 border rounded mr-4"
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
        >
          <option value="1h">Last Hour</option>
          <option value="6h">Last 6 Hours</option>
          <option value="24h">Last 24 Hours</option>
          <option value="7d">Last 7 Days</option>
          <option value="30d">Last 30 Days</option>
        </select>
        
        <button 
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          onClick={handleReset}
        >
          Reset Energy Counter
        </button>
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 gap-8 mb-8">
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-lg font-semibold mb-4">Power Consumption</h3>
          <Line data={powerChartData} options={chartOptions} />
        </div>
        
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-lg font-semibold mb-4">Voltage</h3>
          <Line data={voltageChartData} options={chartOptions} />
        </div>
        
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-lg font-semibold mb-4">Current</h3>
          <Line data={currentChartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default EnergyDashboard;