const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const createError = require('http-errors');
const http = require('http');
const { Server } = require('socket.io');

// Project import
const appRoute = require('./api/v1/routes');
require('./api/v1/databases/init.multi.mongodb');
const errorHandler = require('./api/v1/helpers/errorHandler');

// ========================================== APP - setting project ===============================================

const app = express();

// Create the http server
const server = http.createServer(app);

// Create the Socket IO server on
// the top of http server
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5000',
        methods: ['GET', 'POST'],
    },
});

app.use(cors());
app.use(helmet());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// eslint-disable-next-line no-undef
app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
    // console.log(JSON.stringify(socket.handshake.query));
    
    socket.on('msg', data => {
        socket.broadcast.emit('msg', 'Hei hei!')
    })
});

app.use('/api/v1', appRoute);

app.use((req, res, next) => {
    next(createError.NotFound('This route does not exist.'));
});

app.use((err, req, res, next) => {
    errorHandler(err, req, res, next);
});

module.exports = { app, server };
