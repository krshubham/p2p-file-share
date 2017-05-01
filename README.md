## Peer to Peer file sharing system

This project was made for an assignment for CSE2005 Operating Systems Class Win 2016-17
### What is it?
The application is explained below:
+ There is a central indexing server that maintains an index of all the files present on each of the client connected to it.
+ There are several clients called as **peers** which act as both client as well as server
+ Whenever a client has to ask for a file, the request goes to the central server which finds the client which has the file. The central server, then returns the ip address of the peer which has the required file
+ The client then directly connects to the peer which has the file and establishes a connection with it and downloads the file in the shared directory.

### Setup
+ The project directory contains two folders ```client``` and ```server```
+ The ```client``` folder contains the source code for the peer application and the ```server``` folder contains the code for central indexing server.
+ If you want to start the central indexing server follow these steps:
    + ``` p2p-file-share$ cd server```
    + ``` npm install``` or if you use yarn then ```yarn```
    + ```npm start``` will transpile all the code and start the central server on port 7000
+ If you want to start the client follow these steps:
    + ``` p2p-file-share$ cd client```
    + ``` npm install ```
    + create a directory named ``` shared ``` in the root of client folder.
    + ```client$ cd public/static``` and run ```bower install``` to install the static     dependencies for the client html app.
    + Run ```npm start``` and the client will be running on **localhost:8081**

