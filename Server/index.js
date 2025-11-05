const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UserModel = require('./models/Users');

const app = express();
app.use(cors());
app.use(express.json());

//  MongoDB Connection
mongoose.connect(
  'mongodb+srv://hasnainiftikhar930_db_user:DPvHRfnNa64l9Vnw@user.f0vmtvo.mongodb.net/mydatabase?retryWrites=true&w=majority&appName=user'
)
.then(() => console.log('Connected to MongoDB Atlas'))
.catch(err => console.error(' MongoDB connection error:', err));

// Create User
app.post('/create-user', async (req, res) => {
  try {
    const { username, email, age } = req.body;

    if (!username || !email || !age) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const user = await UserModel.create({ username, email, age });
    res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//  Get All Users
app.get('/users', async (req, res) => {
  try {
    const users = await UserModel.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//  Get Single User by ID
app.get('/getuser/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserModel.findById(id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update User by ID
app.put('/update-user/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, age } = req.body;

    const updatedUser = await UserModel.findByIdAndUpdate(
      id,
      { username, email, age },
      { new: true } 
    );

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ message: 'User updated successfully', updatedUser });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//  Delete User by ID
app.delete('/delete-user/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUser = await UserModel.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});




app.listen(3000, () => {
  console.log('🚀 Server is running on port 3000');
});
