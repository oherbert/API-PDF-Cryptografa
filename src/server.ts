import 'express-async-errors';
import express from 'express';
import router from './routes/document.routes';
import appConfig from './util/configResolve';
import cors from 'cors';
import handleError from './midleware/handleError';
import scheduler from './helpers/scheduler';
import config from './util/configResolve';
import ResponsesManager from './models/ResponsesManager';
import FileManager from './models/FileManager';

const app = express();
app.use(express.json());
app.use(cors());

app.use(router);
app.use(handleError);

const { port } = appConfig.server;

app.listen(port, () => console.info(`App Start on: http://localhost:${port}/`));

scheduler.registerTask(scheduler.getCronExpression(0, config.server.cleanerInterval), () => {
  ResponsesManager.flushOlds();
  FileManager.cleanTempFolder();
})
