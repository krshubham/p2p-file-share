import assert from 'assert';
import logger from '../helpers/logger';
import fs from 'fs';


export default (io) => {
	io.on('connection', (socket) => {
		/**
		 * This event is emitted to a client whenever it joins the server.
		 * Basically we ask the client to send us the contents of the shared directory 
		 * and then store it somewhere
		 * I am still thinking about the place
		 * Might be an array, a file or a database
		 * @event {sendSharedDirectory}
		 */
		socket.emit('sendSharedDirectory');
		
	});
};