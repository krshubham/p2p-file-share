import logger from './helpers/logger';
import registration from './helpers/registration';
import db from './helpers/db';
import conf from './client-conf';
import assert from 'assert';
const databaseUrl = conf.db.url;

/**
 * Connecting to the database
 */
db.connect(databaseUrl, (err) => {
	assert.equal(err,null);
});


registration.registerPeer();



