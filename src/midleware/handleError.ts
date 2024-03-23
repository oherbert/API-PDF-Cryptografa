import { NextFunction, Request, Response } from 'express';
import { AppError } from '../errors/AppError';

export default function handleError(
  err: Error,
  _: Request,
  res: Response,
  next: NextFunction,
) {
  if (!err) return next();

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      Erro: true,
      Mensagem: err.message,
    });
  }


  return res
    .status(500)
    .json({
      Erro: true,
      Mensagem: `Internal server error - ${err.message}`,
    });
}
