/**
 * Enter the IP of the central server here
 */
let mySocket = io();
/**
 * TODO: Un comment this line below to allow communication with the central server
 */
// let centralSocket = io(/* Insert the IP of the server here */);

/**
 * Helper Methods
 */


function getFile(event){
	event.preventDefault();
	//do something
	let fileName = $('#fileName').val().trim();
	if(!fileName){
		Materialize.toast('Filename should not be blank',2000);
		return false;
	}
	
	/**
	 * TODO: Uncomment these lines below
	 */
	// centralSocket.emit('searchFile',{
	// 	query: fileName
	// });
	// centralSocket.on('fileFound', (data) => {
	// 	console.log(data);
	// });
	// centralSocket.on('fileNotFound', (data) => {
	// 	console.log(data);
	// });
	return false;
}

mySocket.on('connect', () => {
	console.info('Connection established with the client application');
});

mySocket.on('connect_error', (error) => {
	console.error(error);
});