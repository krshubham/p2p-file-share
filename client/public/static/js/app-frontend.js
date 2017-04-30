let mySocket = io();


mySocket.on('connect', () => {
	console.info('Connection established with the client application');
});

mySocket.on('connect_error', (error) => {
	console.error(error);
});