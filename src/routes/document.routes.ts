import { Router } from 'express';
import { Request, Response } from 'express';
import { pdfManagerController } from '../controller/pdfManagerController';
import upload from '../util/upload';
import { tempCleaner } from '../midleware/tempCleaner';


const router: Router = Router();

router.post('/pdf/encrypt', upload.single('arquivo'), pdfManagerController, tempCleaner);

router.get('/pdf/teste', (_, res) => {

  return res.sendFile('C:/Users/o_her/OneDrive/Documentos/A Arte da Guerra #@123@#.pdf');

})

router.get('/', (_: Request, res: Response) => {
  return res.status(200).send({
    mensagem: 'Serviço On-line',
  });
});

export default router;
