require('dotenv').config();
const express = require('express');
const cors = require('cors');

//Importing DB Connection
const { db } = require('./db/connectUsingMongoose');

//Importing routes
const generalRoutes = require('./routes/general.routes');
const quoteRoutes = require('./routes/quotes.routes');
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');

const app = express();
db();

app.use(cors());
app.use(express.json());

//Adding custom middleware
app.use('/api', generalRoutes);
app.use('/api', authRoutes);

app.use('/api',  quoteRoutes);
app.use('/api',  userRoutes);



const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`App is listening in port ${PORT}`);
})