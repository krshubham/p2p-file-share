import express from 'express';
import socketIO from 'socket.io';
import assert from 'assert';
import bodyParser from 'body-parser';
import http from 'http';
import logger from './helpers/logger';
import path from 'path';
import morgan from 'morgan';
import socketListen from './libs/listener';

const port = 8080;
const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,'../../public/static')));

const server = app.server = http.Server(app);

const io = socketIO(server);

socketListen(io);

app.get('/', (req,res) => {
	res.sendFile(path.join(__dirname, '../../public/index.html'));
});

/**
 * Change the port here if you get any error for 
 * the port being busy
 */
server.listen(Number(port), () => {
	logger.magenta(`Server is runnning on port ${port}`);
});
