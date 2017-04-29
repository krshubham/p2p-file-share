import net from 'net';
import conf from './server-lib/conf';
import chalk from 'chalk';
import cuid from 'cuid';
const port = Number(conf.port);


const server = net.createServer((server) => {
	console.log(chalk.magenta('Server running fine!'));
});

server.on('connection', (conn) => {
	conn.id = cuid();

	conn.on('data', (data) => {
		console.log(conn.id);
		console.log(data.toString());
	});
});



server.listen(7000);
export default server;