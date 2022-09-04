require('dotenv').config();
const express = require('express');
const cors = require('cors');

//Importing routes
const generalRoutes = require('./routes/general.routes');
const quoteRoutes = require('./routes/quotes.routes');

const app = express();

app.use(cors());
app.use(express.json());

//Adding custom middleware
app.use('/api', generalRoutes);
app.use('/api', quoteRoutes);


const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`App is listening in port ${PORT}`);
})