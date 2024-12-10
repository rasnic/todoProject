const express = require('express');
const isLoggedIn = require('./middleware/isLoggedIn');
const router = express.Router();

const loginRoute = require('./routes/loginRoute');
const registerRoute = require('./routes/registerRoute');
const readDataRoute = require('./routes/readDataRoute');
const postTaskRoute = require('./routes/createTaskRoute');
const updateTaskRoute = require('./routes/updateTaskRoute');
const deleteTaskRoute = require('./routes/deleteTaskRoute');
const createProjectRoute = require('./routes/createProjectRoute');
const readActivityLogRoute = require('./routes/readActivityLogRoute');

router.post('/login', loginRoute);
router.post('/register', registerRoute);
router.get('/data', isLoggedIn, readDataRoute);
router.post('/task', isLoggedIn, postTaskRoute);
router.patch('/task/:id', isLoggedIn, updateTaskRoute);
router.delete('/task/:id', isLoggedIn, deleteTaskRoute);
router.post('/project', isLoggedIn, createProjectRoute);
router.get('/activity', isLoggedIn, readActivityLogRoute);
module.exports = router;
