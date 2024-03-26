import { Router } from 'express';
import { Request, Response } from 'express';
import { pdfManagerController } from '../controller/pdfManagerController';
import fileManager from '../models/FileManager';
import { requestManagerController } from '../controller/requestManagerController';
import config from '../util/configResolve';


const router: Router = Router();

router.post('/pdf/encrypt', fileManager.upload.single('arquivo'), pdfManagerController);

router.get('/pdf/response', requestManagerController);

router.get('/pdf/teste', (_, res) => {

  return res.sendFile(config.testFileDownload);

})

router.get('/', (_: Request, res: Response) => {
  return res.status(200).send({
    mensagem: 'Serviço On-line',
  });
});

export default router;
