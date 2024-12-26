const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;


app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
const MONGO_URI = 'mongodb+srv://username:<db_pass>@cluster0.jimo5.mongodb.net/CodeOptimization?retryWrites=true&w=majority&appName=Cluster0'; // Replace with your MongoDB U
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// Define a User Schema
const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});
const CodeSchema = new mongoose.Schema({
    email: { type: String, required: true },
    code: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
});

// Create a User Model
const User = mongoose.model('User', userSchema);
const Code = mongoose.model('Code', CodeSchema);

// Signup Route
app.post('/signup', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        // Create and save a new user
        const newUser = new User({ email, password });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Login Route
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
       
        const user = await User.findOne({ email, password });
        if (user) {
            return res.status(200).json({ message: 'Login successful' });
        } else {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});
app.post('/save-code', async (req, res) => {
    const { email, code } = req.body;

    try {
        // Validate email and code
        if (!email || !code) {
            return res.status(400).json({ message: 'Email and code are required' });
        }

        // Create a new instance and save it
        const newCode = new Code({ email, code });
        await newCode.save();

        // Send a success response
        return res.status(200).json({ message: 'Code saved successfully', data: newCode });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// app.post('/save-code', async (req, res) => {
//     const { email, code } = req.body;
//     console.log(email, code);
//     // console.log(email,generated_code)
//     try {
//         const newCode = new Code({ email, code });
//         console.log(newCode);
//         await newCode.save();
//         // const user = await Code.create({ email, generated_code });

//         if () {
//     return res.status(200).json({ message: 'Code Saved' });
//         } else {
//             return res.status(401).json({ message: err.message });
//         }
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: 'Server error' });
//     }
// });



app.get('/', (req, res) => {
    res.send('<h1>Data is saved in MongoDB</h1>');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
