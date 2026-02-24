const { createClient } = require('@supabase/supabase-js');

require('dotenv').config(); // loads .env variables

// read URL and KEY from .env
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

// create supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase; // you can use this in other files