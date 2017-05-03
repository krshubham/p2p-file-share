import assert from 'assert';
import path from 'path';
import logger from '../helpers/logger';
import socketIOClient from 'socket.io-client';
import fs from 'fs';
let start=0,end=0;
const fileDirectory = path.join(__dirname,'../../../shared');


/**
* This file basically connects with the UI part of the client application ,
* Talking with the express server and baanki gawaaar users se baat krna
* Will not be able to handle all the exceptions.
* Since this is not a *FOOLPROOF* program.
* Chill and inform {krshubham} in case of any issues.
*/
export default (io) => {
	io.on('connection', (socket) => {
		logger.green('Connection established with the client');
		
		socket.on('connectToPeer', (peer) => {
			start = new Date()
			peer.ip = peer.ip.split(':')[3];
			/**
			* Connect to the second client and ask it for the file
			*/
			console.log(`http://${peer.ip}:${peer.port}`);
			const client = socketIOClient(`http://${peer.ip}:${peer.port}`);
			client.on('connect', () => {
				console.log('Successfully connected to the peer');
			});
			
			client.emit('sendFile', peer.fileName);
			client.on('saveFile', (data) => {
				socket.emit('receive.start',{start: true});
				console.log('received this data from different client');
				fs.writeFile(`${fileDirectory}/${peer.fileName}`, data, (err) => {
					if(err){
						socket.emit('errorInDownload',err);
						logger.red('Error in donwloading the file from the client');
					}
					else{
						end = new Date()
						let time = (end - start)/1000;
						start = end = 0;
						socket.emit('fileDownloaded',{
							fileName: peer.fileName,
							time
						});
					}
				});
			});
		});
		
		socket.on('sendFile', (fileName) => {
			const filePath = path.join(__dirname,`../../../shared/${fileName}`);
			fs.readFile(filePath, (err, data) => {
				try{
					assert.equal(err, null);
					socket.emit('saveFile', data);
				}
				catch(err){
					console.log('File is not present on this client');
					console.log(err);
				}
			});
		});
	});
	
};