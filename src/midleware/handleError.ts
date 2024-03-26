import { NextFunction, Request, Response } from 'express';
import { AppError } from '../errors/AppError';
import responsesManager from '../models/ResponsesManager';

export default function handleError(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {

  const idReq = req.query && 'id' in req.query && typeof req.query.id === 'string' ? req.query.id : '';

  if (!err) return next();

  if (err instanceof AppError) {

    if (idReq) responsesManager.addResponse(idReq, 200, err.message);

    return res.status(err.statusCode).json({
      Erro: true,
      Mensagem: err.message,
    });
  }

  if (idReq) responsesManager.addResponse(idReq, 200, err.message);

  return res
    .status(500)
    .json({
      Erro: true,
      Mensagem: `Internal server error - ${err.message}`,
    });
}
