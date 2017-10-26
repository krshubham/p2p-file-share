import express from 'express';
import socketIO from 'socket.io';
import socketIOClient from 'socket.io-client';
import assert from 'assert';
import bodyParser from 'body-parser';
import http from 'http';
import logger from './helpers/logger';
import path from 'path';
import morgan from 'morgan';
import socketListen from './libs/listener';
import socketClientListen from './libs/socketClientListener';
import config from '../client-config';

let port = config.client.port;
let serverport = config.server.port;
const app = express();

//app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,'../../public/static')));

const server = app.server = http.Server(app);

const io = socketIO(server);
const socket = socketIOClient(`http://${config.server.ip}:${config.server.port}`);

socketListen(io);
socketClientListen(socket,port);

app.get('/', (req,res) => {
	res.sendFile(path.join(__dirname, '../../public/index.html'));
});

/**
* Change the port here if you get any error for 
* the port being busy
*/
function listen(port){
	server.listen(Number(port), () => {
		logger.magenta(`Server is runnning on port ${serverport}`);
	});
}
listen(port);
process.on('uncaughtException', (error) => {
	console.log(error);
	switch(error.code){
		case 'EADDRINUSE':
			++port;
			listen(port);
	}
});