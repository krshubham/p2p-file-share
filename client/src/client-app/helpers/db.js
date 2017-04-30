import mongodb from 'mongodb';
const MongoClient = mongodb.MongoClient;

let state = {
	db: null,
};

function connect(url, done) {
	if (state.db) return done();
	
	MongoClient.connect(url, function(err, db) {
		if (err) return done(err);
		state.db = db;
		done();
	});
}

function get() {
	return state.db;
}

function close(done) {
	if (state.db) {
		state.db.close(function(err, result) {
			state.db = null;
			state.mode = null;
			done(err);
		});
	}
}

export default {
	connect,
	get,
	close
}