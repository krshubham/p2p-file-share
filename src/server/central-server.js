import net from 'net';
import conf from './server-lib/conf';
import chalk from 'chalk';
import cuid from 'cuid';
import jsonSocket from 'json-socket';
const port = Number(conf.port);

var server = net.createServer();
server.listen(port);

server.on('connection', (socket) => {
	socket = new jsonSocket(socket);
	socket.on('message', (message) => {
		console.log(message);
	});
});



export default server;