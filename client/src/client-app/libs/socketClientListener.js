import fs from 'fs';
import assert from 'assert';
import logger from '../helpers/logger';


/**
 * This file is important because it does all the MAGIC
 * This file connects to the central server and does all the talking with
 * the central server
 */
export default (socket) => {
	socket.on('connect', () => {
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
	});


	/**
	 * Logging the error in case server stops working
	 */
	socket.on('connect_error', (error) => {
		console.log('error in connection');
		console.log(err);
	});


	/**
	 * In future we are going to write the getFile event listener here
	 * In this listener we will have an ip of a peer given along with its port on which it is runnning
	 * we will emit an event to it and in response expect a file
	 * or Not available if its not avaialable
	 */
};