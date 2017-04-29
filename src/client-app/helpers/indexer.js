import net from 'net';
import assert from 'assert';
import logger from './logger';
import fs from 'fs';
import db from './db';
import path from 'path';

let indexer = {};

function sendDirInformation(client){
	const dirCollection = db.get().collection('dir');
	dirCollection.find({}).toArray((err, data) => {
		const pubDir = data[0].publicPath;
		fs.readdir(path.normalize(pubDir), (err,files) => {
			client.write(files.toString());
		});
	});
}


indexer.createConnection = (host, port) => {
	const client = new net.Socket();
	client.connect(port,host, () => {
		logger.green('Connected successfully to the central server');
		sendDirInformation(client);
	});


	client.on('error', (err) => {
		switch(err.code){
			case 'ECONNREFUSED':
				logger.red(`Connection refused on ${host}:${port}`);
				logger.red('Please check if correct server address is provided');
				process.exit(1);
				break;
		}
	});

	client.on('data' , (data) => {
		console.log(data);
	});
};


export default indexer;