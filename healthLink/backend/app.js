const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

const userRoute = require('./routes/user');
const appointmentRoute = require('./routes/appointment');
const adminDashboardRoute = require('./routes/adminDashboard');


const axios = require("axios");



app.use(cors());
// app.use(cors({ origin: 'http://20.194.199.67:3000'}));

app.use(bodyParser.json());
app.use("/api/user", userRoute);
app.use("/api/appointment", appointmentRoute);
app.use("/api/admin", adminDashboardRoute);

module.exports = app;
