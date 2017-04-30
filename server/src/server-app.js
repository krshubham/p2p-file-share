import socketIO from 'socket.io';
import http from 'http';
import express from 'express';
import logger from './helpers/logger';
import indexer from './libs/indexer';
const port  = 7000;

const app = express();

const server = app.server = http.Server(app);
const io = socketIO(server);

indexer(io);


/**
 * Let the server listen on the given port
 * The server starts listening on this port
 * @param {port} port 
 * 
 */
server.listen(Number(port),() => {
	logger.magenta(`Central server is listening on port ${port}`);
});



