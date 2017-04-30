import fs from 'fs';
import assert from 'assert';
import logger from '../helpers/logger';
import path from 'path';


/**
* This file is important because it does all the MAGIC
* This file connects to the central server and does all the talking with
* the central server
*/
export default (socket,port) => {
	socket.on('connect', () => {
		/**
		* Store the port in the session so we know the port on which we have to connect
		*/
		logger.green('Succesfully established the connection with the server');
	});
	
	
	/**
	* Emitted by the central server once we get connected to it
	* What we will do:
	* 	Read the directory named `shared` in the root of the client project
	* @event {sendSharedDirectory}
	*/
	socket.on('sendSharedDirectory', () => {
		console.log('Request received by the server to share my shared directory');
		/**
		* Read the shared directory and then send the names of all the files present in the shared directory
		*/
		const sharedDir = path.join(__dirname,'../../../shared/');
		console.log(sharedDir);
		fs.readdir(sharedDir, (err, files) => {
			if(err){
				switch(err.code){
					case 'ENOENT':
						logger.red('The directory named shared is not available. Please make it in the root of client folder');
				}
			}
			else{
				/**
				 * In this event we basically send the central server a list of file present with all this client
				 * @event {readSharedDirectory}
				 */
				const toSend = {
					files,
					port
				};
				socket.emit('readSharedDirectory',toSend);
			}
		});
	});
	
	
	/**
	* Logging the error in case server stops working
	*/
	socket.on('connect_error', (error) => {
		logger.red('error in connection');
	});
	
	
	/**
	* In future we are going to write the getFile event listener here
	* In this listener we will have an ip of a peer given along with its port on which it is runnning
	* we will emit an event to it and in response expect a file
	* or `Not available` if its not avaialable
	*/
};