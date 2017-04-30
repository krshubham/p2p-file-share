import assert from 'assert';
import path from 'path';
import logger from '../helpers/logger';

export default (io) => {
	io.on('connection', (socket) => {
		logger.green('Connection established with the client');
	});

	
};