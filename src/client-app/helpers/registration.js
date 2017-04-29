/**
* @module registration
* Built by Kumar Shubham on Sat 29 Apr 02:38 IST
*/
import logger from './logger';
import ask from './question';
import db from './db';
import path from 'path';
import indexer from './indexer';
import assert from 'assert';

function sendIndex(){
	const configDb = db.get().collection('config');
	configDb.find({}).toArray((err, data) => {
		assert.equal(err, null);
		if(!data || data.length >1)
		logger.red('There is some error, please start over!');
		else{
			const serverUrl = `${data[0].host}:${data[0].port}`;
			logger.yellow(`Connecting to server on the Url ${serverUrl}`);
			const host = data[0].host;
			const port = data[0].port;
			indexer.createConnection(host,port);
		}
	});
}





function selectDir(){
	ask('Enter the absolute path of the directory you want to be publicly available: ', (publicDir) => {
		const publicPath = path.normalize(publicDir);
		const dir = db.get().collection('dir');
		dir.drop().then(() => {
			dir.insertOne({publicPath})
			.then(() => {
				logger.blue('Sending the path for indexing...');
				sendIndex();
			});
		})
		.catch((err) => {
			logger.red(err);
		});
	});
}


function registerPeer(){
	ask('Enter the IP address of the central server: ', (host) => {
		ask('Enter the port number of the central server: ', (port) => {
			console.log(`The complete address is : ${host}:${port}`);
			logger.yellow('saving this configuration in the db');
			const configDb = db.get().collection('config');
			configDb.drop();
			configDb.insertOne({host,port})
			.then(() => {
				logger.green('Saved the configuration successfully');
				selectDir();
			})
			.catch((err) => {
				logger.red('There is some error in saving the configuration in the db');
			});
		});
	});
}

export default {
	registerPeer
}