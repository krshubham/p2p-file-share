import express from 'express';
import conf from './conf';
const app = express();




app.listen(Number(conf.port));
export default app;