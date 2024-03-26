import { Request, Response } from 'express';
import responsesManager from '../models/ResponsesManager';
import { IResponse } from '../interfaces/IResponse';



export const requestManagerController = async (req: Request, res: Response) => {
  const idReq = req.query && 'id' in req.query && typeof req.query.id === 'string' ? req.query.id : '';

  if (!idReq) return res.status(200).send('Não request não encontrada!');

  let times = 0;
  let resInfo: IResponse | undefined;

  while (times < 5 && !resInfo) {
    times++;
    resInfo = responsesManager.getResponse(idReq);

    if (resInfo) return res.send(resInfo.resSended);
    await responsesManager.delay(1000);

    console.log(resInfo);

  }

  return res.send('Dados não encontrados!');

}