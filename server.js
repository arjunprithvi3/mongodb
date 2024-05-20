const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB Atlas
mongoose.connect('mongodb+srv://dinaker4304:1234@cluster0.yin1rha.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('Error connecting to MongoDB Atlas:', err));

// Student Model
const Student = require('./models/Student');

// Initialize Multer for file uploads
const upload = multer();

// Initialize Dropbox API
const Dropbox = require('dropbox').Dropbox;
const dbx = new Dropbox({ accessToken: 'sl.B1nVFLWRIsZ_c1-JjoglG1eOgk5giCFK1z-DVrVWzVS4nxGyci9EiJlD-tpeudFSeRjfQjouG2CgVC9r-0MdI7Ud-tnJBNUoA--aHey2XxLxkUiVeHGSr3m0f_b22QS25_YaLz1PiKWi' });

// Create a new student
app.post('/api/students', upload.single('bill'), async (req, res) => {
  try {
    // Save student details to MongoDB
    const student = new Student(req.body); // Use the model correctly here
    await student.save();

    // Upload the bill image to Dropbox
    const response = await dbx.filesUpload({
      path: `/bills/${req.body.name}_${Date.now()}.jpg`,
      contents: req.file.buffer
    });

    res.status(201).json({ message: 'Student created successfully', student });
  } catch (err) {
    console.error('Error creating student:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all students
app.get('/api/students', async (req, res) => {
  try {
    const students = await Student.find(); // Use the model correctly here
    res.status(200).json(students);
  } catch (err) {
    console.error('Error getting students:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get a specific student by ID
app.get('/api/students/:id', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id); // Use the model correctly here
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.status(200).json(student);
  } catch (err) {
    console.error('Error getting student:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update a student by ID
app.put('/api/students/:id', async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true }); // Use the model correctly here
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.status(200).json({ message: 'Student updated successfully', student });
  } catch (err) {
    console.error('Error updating student:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete a student by ID
app.delete('/api/students/:id', async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id); // Use the model correctly here
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.status(200).json({ message: 'Student deleted successfully', student });
  } catch (err) {
    console.error('Error deleting student:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
