import multer from 'multer';
import config from './configResolve';
import os from 'os';
import path from 'path';
import { AppError } from '../errors/AppError';

const dest = config.uploadFolder ? config.uploadFolder : path.join(os.tmpdir(), config.uploadFolderName ? config.uploadFolderName : 'uploads/');

// Configuração do multer para lidar com o upload de arquivos
const upload = multer({
  storage: multer.diskStorage({ destination: dest }),
  fileFilter: function (_, file, cb) {
    const extensao = path.extname(file.originalname);

    // console.log(file);

    if (extensao !== '.pdf') {
      return cb(new AppError('Apenas arquivos PDF são permitidos', 400));
    }
    cb(null, true);
  }
});

export default upload;