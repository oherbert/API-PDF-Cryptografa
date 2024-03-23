import 'express-async-errors';
import express from 'express';
import router from './routes/document.routes';
import appConfig from './util/configResolve';
import cors from 'cors';
import handleError from './midleware/handleError';


const app = express();
app.use(express.json());
app.use(cors());

app.use(router);
app.use(handleError);

const { port } = appConfig.server;

app.listen(port, () => console.info(`App Start on: http://localhost:${port}/`));
