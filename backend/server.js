const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const withAuth = require('./middleware');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(cookieParser());


const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
	console.log("mongoDB database connection established successfully");
})


const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');
const studentsRouter = require('./routes/students');
const parentsRouter = require('./routes/parents');



app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);
app.use('/students', studentsRouter);
// app.use('/parents', withAuth, parentsRouter);
app.use('/parents', parentsRouter);

// app.get('/secret', withAuth, function(req, res) {
// 	res.send('The password is potato');
// })

// app.get('/checkToken', withAuth, function(req, res) {
// 	res.sendStatus(200);
//   });

app.listen(port, () => {
	console.log("server running on port:" + port);
})