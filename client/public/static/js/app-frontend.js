/**
* Enter the IP of the central server here
*/
const serverUrl = 'http://localhost:7000';

let mySocket = io();

let centralSocket = io(serverUrl);

/**
* Helper Methods
*/


function getFile(event){
	event.preventDefault();
	
	let fileName = $('#fileName').val().trim();
	if(!fileName){
		Materialize.toast('Filename should not be blank',2000);
		return false;
	}
	
	centralSocket.emit('searchFile', fileName);

	return false;
}

mySocket.on('connect', () => {
	console.info('Connection established with the client application');
});

centralSocket.on('fileFound', (client) => {
	console.log('Connecting to the client on which the file was found ....')
	mySocket.emit('connectToPeer', client);
});

centralSocket.on('fileNotFound', () => {
	Materialize.toast('File not found on any of the clients', 2000);
});


mySocket.on('connect_error', (error) => {
	console.error(error);
});