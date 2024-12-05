const express = require('express');
const isLoggedIn = require('./middleware/isLoggedIn');
const router = express.Router();

const loginRoute = require('./routes/loginRoute');
const registerRoute = require('./routes/registerRoute');
const getTasksRoute = require('./routes/readTasksRoute');
const postTaskRoute = require('./routes/createTaskRoute');
const updateTaskRoute = require('./routes/updateTaskRoute');
const deleteTaskRoute = require('./routes/deleteTaskRoute');

router.post('/login', loginRoute);
router.post('/register', registerRoute);
router.get('/tasks', isLoggedIn, getTasksRoute);
router.post('/tasks', isLoggedIn, postTaskRoute);
router.patch('/tasks/:id', isLoggedIn, updateTaskRoute);
router.delete('/tasks/:id', isLoggedIn, deleteTaskRoute);

module.exports = router;
