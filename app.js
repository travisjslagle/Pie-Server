//! ENV
require('dotenv').config();

//! EXPRESS
const express = require('express');
const app = express();

//! CONTROLLERS
const pies = require('./controllers/piecontroller');
const user = require('./controllers/usercontroller');

//! DATABASE
const sequelize = require('./db');
sequelize.sync();
app.use(express.json());
app.use(require('./middleware/headers'));

//! ROUTES
app.use('/auth', user)
app.use(require('./middleware/validate-session'));
app.use('/pies', pies)

//! LISTENING
app.listen(process.env.PORT, () => console.log(`app is listening on ${process.env.PORT}`));