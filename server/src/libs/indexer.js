import assert from 'assert';
import logger from '../helpers/logger';
import fs from 'fs';

let contents = [];


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

		/**
		 * This listener gets the list of all the files that the client has
		 * @event {readSharedDirectory}
		 */
		socket.on('readSharedDirectory', (data) => {
			const indexedData = {
				id: socket.id,
				files: data.files,
				port: data.port
			}
			contents.push(indexedData);
			console.log(contents);
		});

		/**
		 * Recognise the disconncted client and then remove it from the array
		 * @event {disconnect}
		 */
		socket.on('disconnect', () => {
			for(let i=0; i < contents.length; i++){
				if(contents[i].id === socket.id){
					contents.splice(i,1);
					break;
				}
			}
			//logging the array when we remove a client
			console.log(contents);
		});
	});
};