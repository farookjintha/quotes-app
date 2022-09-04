require('dotenv').config();
const express = require('express');
const cors = require('cors');

//Importing DB Connection
const { getDb, connectToServer } = require('./db/connect');

//Importing routes
const generalRoutes = require('./routes/general.routes');
const quoteRoutes = require('./routes/quotes.routes');
const { db } = require('./db/connectUsingMongoose');

const app = express();
db();

// try{
//     db.connectToServer(function (err) {
//         if (err) console.error(err);
//     })
// }catch(err){
//     console.log(err)
// }

app.use(cors());
app.use(express.json());

//Adding custom middleware
app.use('/api', generalRoutes);
app.use('/api', quoteRoutes);


const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`App is listening in port ${PORT}`);
})