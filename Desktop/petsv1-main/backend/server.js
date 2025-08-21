const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5000;

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ MongoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/mypet', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB Connected Locally'))
.catch(err => console.log('❌ MongoDB Connection Error:', err));


// ✅ User Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  confirmPassword: { type: String, required: true },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

// 🔸 Signup
app.post('/api/signup', async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const newUser = new User({ name, email, password, confirmPassword });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// 🔸 Login
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    res.status(200).json({
      message: 'Login successful',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


// ✅ Event Schema
const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  short_description: { type: String },
  description: { type: String },
  location: { type: String, required: true },
  event_date: { type: String, required: true },
}, { timestamps: true });

const Event = mongoose.model('Event', eventSchema);

// 🔸 Create Event
app.post('/api/events', async (req, res) => {
  const { title, description, short_description, location, event_date } = req.body;

  if (!title || !location || !event_date) {
    return res.status(400).json({ message: 'Please fill in required fields.' });
  }

  try {
    const newEvent = new Event({ title, description, short_description, location, event_date });
    await newEvent.save();
    res.status(201).json({ message: 'Event created successfully!' });
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ message: 'Server error. Failed to create event.' });
  }
});

// 🔸 Get All Events
app.get('/api/events', async (req, res) => {
  try {
    const events = await Event.find().sort({ event_date: 1 });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching events' });
  }
});

// 🔸 Delete Event
app.delete('/api/events/:id', async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error('Error deleting event:', error);
    res.status(500).json({ message: 'Failed to delete event' });
  }
});


// ✅ Pet Schema
const petSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: String, required: true },
  breed: { type: String, required: true },
  description: { type: String, required: true },
  available: { type: Boolean, default: true },
  shelter: { type: String, required: true },
  image: { type: String },
  medicalStatus: { type: String },
}, { timestamps: true });

const Pet = mongoose.model('Pet', petSchema);

// 🔸 Create Pet
app.post('/api/pets', async (req, res) => {
  const { name, age, breed, description, available, shelter, image, medicalStatus } = req.body;

  if (!name || !age || !breed || !description || !shelter) {
    return res.status(400).json({ message: 'Please fill in required fields.' });
  }

  try {
    const newPet = new Pet({ name, age, breed, description, available, shelter, image, medicalStatus });
    await newPet.save();
    res.status(201).json({ message: 'Pet added successfully!', pet: newPet });
  } catch (error) {
    console.error('Error adding pet:', error);
    res.status(500).json({ message: 'Server error. Failed to add pet.' });
  }
});

// 🔸 Get All Pets
app.get('/api/pets', async (req, res) => {
  try {
    const pets = await Pet.find().sort({ createdAt: -1 });
    res.json(pets);
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching pets' });
  }
});

// 🔸 Delete Pet
app.delete('/api/pets/:id', async (req, res) => {
  try {
    await Pet.findByIdAndDelete(req.params.id);
    res.json({ message: 'Pet deleted successfully' });
  } catch (error) {
    console.error('Error deleting pet:', error);
    res.status(500).json({ message: 'Failed to delete pet' });
  }
});


// ✅ Message Schema
const messageSchema = new mongoose.Schema({
  sender: { type: String, required: true },
  receiver: { type: String, required: true },
  content: { type: String, required: true },
  time: { type: String, required: true },
}, { timestamps: true });

const Message = mongoose.model('Message', messageSchema);

// 🔸 Send Message
app.post('/api/messages', async (req, res) => {
  const { sender, receiver, content, time } = req.body;

  if (!sender || !receiver || !content || !time) {
    return res.status(400).json({ message: 'Please fill in all required fields.' });
  }

  try {
    const newMessage = new Message({ sender, receiver, content, time });
    await newMessage.save();
    res.status(201).json({ message: 'Message sent successfully!', data: newMessage });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ message: 'Server error. Failed to send message.' });
  }
});

// 🔸 Get All Messages
app.get('/api/messages', async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching messages' });
  }
});


// ✅ Settings Schema
const settingsSchema = new mongoose.Schema({
  breed: { type: String },
  region: { type: String },
  size: { type: String },
  minAge: { type: Number },
  notifyByEmail: { type: Boolean, default: false },
  notifyBySMS: { type: Boolean, default: false },
}, { timestamps: true });

const Settings = mongoose.model('Settings', settingsSchema);

// 🔸 Get Settings
app.get('/api/settings', async (req, res) => {
  try {
    const settings = await Settings.findOne();
    if (settings) {
      res.json(settings);
    } else {
      res.status(404).json({ message: 'No settings found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// 🔸 Create/Update Settings
app.post('/api/settings', async (req, res) => {
  const { breed, region, size, minAge, notifyByEmail, notifyBySMS } = req.body;

  try {
    let settings = await Settings.findOne();

    if (settings) {
      settings.breed = breed;
      settings.region = region;
      settings.size = size;
      settings.minAge = minAge;
      settings.notifyByEmail = notifyByEmail;
      settings.notifyBySMS = notifyBySMS;

      await settings.save();
      res.json({ message: 'Settings updated successfully', settings });
    } else {
      const newSettings = new Settings({ breed, region, size, minAge, notifyByEmail, notifyBySMS });
      await newSettings.save();
      res.status(201).json({ message: 'Settings created successfully', settings: newSettings });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});


// ✅ Dashboard Stats API
app.get('/api/dashboard-stats', async (req, res) => {
  try {
    const totalPets = await Pet.countDocuments();
    const activeAdopters = 10; // Replace with real data if available
    const pendingApplications = 4; // Replace with real data if available
    const eventStats = await Event.countDocuments();

    res.json({
      totalPets,
      activeAdopters,
      pendingApplications,
      eventStats,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching dashboard stats' });
  }
});


// ✅ Default Route
app.get('/', (req, res) => {
  res.send('API is running...');
});


// ✅ Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
