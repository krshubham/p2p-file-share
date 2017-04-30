import assert from 'assert';
import path from 'path';
import logger from '../helpers/logger';


/**
 * This file basically connects with the UI part of the client application ,
 * Talking with the express server and baanki gawaaar users se baat krna
 * Will not be able to handle all the exceptions.
 * Since this is not a *FOOLPROOF* program.
 * Chill and inform {krshubham} in case of any issues.
 */
export default (io) => {
	io.on('connection', (socket) => {
		logger.white('Connection established with the client');
	});

};