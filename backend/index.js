require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

const app = express();
app.use(cors());
app.use(express.json());

// connect to Supabase
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// contact endpoint
app.post('/contact', async (req, res) => {
    const { name, email, message } = req.body;

    // validate input
    if (!name || !email || !message) {
        return res.status(400).json({ error: 'Name, email, and message are required' });
    }

    const { data, error } = await supabase
        .from('contacts')
        .insert([{ name, email, message }]);

    if (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error saving message' });
    }

    res.status(200).json({ message: 'Message saved successfully' });
});

// health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK' });
});

// dynamic port for Railway
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));

module.exports = app;