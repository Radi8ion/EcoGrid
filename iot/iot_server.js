// server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const mqtt = require('mqtt');
const cors = require('cors');

// Express app setup
const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/energyMonitor', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Create Energy Reading Schema
const EnergyReadingSchema = new mongoose.Schema({
  voltage: Number,
  current_ma: Number,
  power_w: Number,
  energy_wh: Number,
  timestamp: { type: Date, default: Date.now }
});

const EnergyReading = mongoose.model('EnergyReading', EnergyReadingSchema);

// MQTT Client setup - using HiveMQ with the free tier
const mqttOptions = {
  host: '6c48254db4364e7cb5eeedd038e010f5.s1.eu.hivemq.cloud',
  port: 8883,
  protocol: 'mqtts',
  username: 'hivemq.webclient.1741373967180',
  password: 'hivemq.webclient.1741373967180'
};

const mqttClient = mqtt.connect(mqttOptions);

mqttClient.on('connect', () => {
  console.log('Connected to MQTT broker');
  
  // Subscribe to the energy meter topic
  mqttClient.subscribe('home/energy/meter1', (err) => {
    if (!err) {
      console.log('Subscribed to energy meter topic');
    } else {
      console.error('MQTT Subscription error:', err);
    }
  });
});

// Process incoming MQTT messages
mqttClient.on('message', async (topic, message) => {
  try {
    console.log(`Message received from ${topic}`);
    
    // Parse the JSON message
    const data = JSON.parse(message.toString());
    
    // Create a new reading document
    const energyReading = new EnergyReading({
      voltage: data.voltage,
      current_ma: data.current_ma,
      power_w: data.power_w,
      energy_wh: data.energy_wh,
      timestamp: new Date()
    });
    
    // Save to MongoDB
    await energyReading.save();
    console.log('Energy reading saved to database');
    
    // Emit to all connected clients via Socket.io
    io.emit('energy-update', data);
    
  } catch (error) {
    console.error('Error processing MQTT message:', error);
  }
});

// Socket.io connection
io.on('connection', (socket) => {
  console.log('New client connected');
  
  // Send historical data when a client connects
  EnergyReading.find().sort({ timestamp: -1 }).limit(100)
    .then(readings => {
      socket.emit('historical-data', readings);
    })
    .catch(err => console.error('Error fetching historical data:', err));
  
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// API Routes
app.get('/api/readings', async (req, res) => {
  try {
    const { hours = 24 } = req.query;
    const timeFilter = new Date(Date.now() - hours * 60 * 60 * 1000);
    
    const readings = await EnergyReading.find({ 
      timestamp: { $gte: timeFilter } 
    }).sort({ timestamp: 1 });
    
    res.json(readings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/readings/summary', async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const todayEnergy = await EnergyReading.find({ 
      timestamp: { $gte: today } 
    }).sort({ timestamp: -1 }).limit(1);
    
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    const yesterdayEnergy = await EnergyReading.find({ 
      timestamp: { $gte: yesterday, $lt: today } 
    }).sort({ timestamp: -1 }).limit(1);
    
    res.json({
      today: todayEnergy[0]?.energy_wh || 0,
      yesterday: yesterdayEnergy[0]?.energy_wh || 0
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});