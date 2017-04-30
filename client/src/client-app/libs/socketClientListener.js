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
};