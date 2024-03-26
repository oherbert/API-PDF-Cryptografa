import { Request, Response } from 'express';
import pdfManager from '../models/PdfManager'
import path from "path";
import responsesManager from '../models/ResponsesManager';

export const pdfManagerController = (req: Request, res: Response) => {

  if (!req.file) {
    return res.status(400).send('Nenhum arquivo enviado.');
  }

  const passwordQuery = req.query && 'password' in req.query && typeof req.query.password === 'string' ? req.query.password : '';

  const idReq = req.query && 'id' in req.query && typeof req.query.id === 'string' ? req.query.id : '';

  const { originalname, destination, path: inputPath } = req.file;

  const regexSenha = /#@(.*?)@#/;
  const match = regexSenha.exec(originalname);

  // Verifica se houve uma correspondência
  if (!(match && match.length > 1) && !passwordQuery)
    return res.status(400).json({ erro: 'Senha não encontrada!' });

  const password = match && match.length > 1 ? match[1] : passwordQuery;

  // Expressão regular para encontrar e substituir o texto entre '#@' e '@#'
  const regex = /#@(.*?)@#/g;
  const result = originalname.replace(regex, '');
  const fileName = path.basename(result);

  const output = pdfManager.encrypt(destination, inputPath, fileName, password);

  if (idReq) responsesManager.addResponse(idReq, 200, 'Sucesso!');

  return res.sendFile(output);

}