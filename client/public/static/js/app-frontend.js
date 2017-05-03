/**
* Enter the IP of the central server here
*/
const server = {
	port: 7000,
	ip: "127.0.0.1"
}
const serverUrl = `http://${server.ip}:${server.port}`;

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
	Materialize.toast('Client application running successfully', 2000);
});

centralSocket.on('fileFound', (client) => {
	Materialize.toast('Connecting to the client on which the file was found ....',1000)
	mySocket.emit('connectToPeer', client);
});

centralSocket.on('fileNotFound', () => {
	Materialize.toast('File not found on any of the clients', 2000);
});


mySocket.on('connect_error', (error) => {
	console.error(error);
});

mySocket.on('fileDownloaded', (data) => {
	Materialize.toast(`File ${data.fileName} successfully downloaded in shared directory`,2000);
	Materialize.toast(`It took ${data.time} seconds to complete the transfer`,5000);
	console.log(data);
});

mySocket.on('errorInDownload', (err) => {
	console.error(err);
});

mySocket.on('receive.start', () => {
	console.log('This was fired');
	Materialize.toast('Download started', 2000);
});