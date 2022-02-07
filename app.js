const express = require('express');
const app = express();
const userRoutes = require('./routes/users')
const db = require('./models');
const cookieParser = require("cookie-parser");
require('dotenv').config();

app.use(express.json())
app.use(cookieParser());

app.use('/api/v1/auth', userRoutes);

app.get('/api/v1/auth',(req, res) => {
    res.end(`Server Running!`);
});

const port = 5000;

db.sequelize.sync().then((req) => {
    app.listen(port, () => {
      console.log(`Server is Running on http://localhost:${port}`);
    });
})
