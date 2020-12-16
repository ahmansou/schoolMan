const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


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
app.use('/parents', parentsRouter);

app.listen(port, () => {
	console.log("server running on port:" + port);
})