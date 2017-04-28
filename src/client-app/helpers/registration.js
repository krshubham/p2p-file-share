/**
* @module registration
* Built by Kumar Shubham on Sat 29 Apr 02:38 IST
*/
import logger from './logger';
import ask from './question';
import db from './db';

function registerPeer(){
	ask('Enter the IP address of the central server: ', (host) => {
		ask('Enter the port number of the central server: ', (port) => {
			console.log(`The complete address is : ${host}:${port}`);
			logger.yellow('saving this configuration in the db');
			const configDb = db.get().collection('config');
			configDb.insertOne({host,port})
			.then(() => {
				logger.green('Saved the configuration successfully');
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