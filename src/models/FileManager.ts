import fs from 'fs';
import path from "path";
import config from '../util/configResolve';
import os from 'os';
import multer, { Multer } from 'multer';
import { AppError } from '../errors/AppError';


class FileManager {

  public upload: Multer;

  private tempFolderPath = config.uploadFolder ? config.uploadFolder
    : path.join(os.tmpdir(), config.uploadFolderName ?
      config.uploadFolderName : 'uploads/');

  public cleanerIntevarl = Date.now() - (60 * 1000 * config.server.cleanerInterval);

  constructor() {
    this.upload = multer({
      storage: multer.diskStorage({ destination: this.tempFolderPath }),
      fileFilter: function (_, file, cb) {
        const extensao = path.extname(file.originalname);

        console.log(file);

        if (`${extensao}`.toLowerCase() !== '.pdf') {
          return cb(new AppError('Apenas arquivos PDF são permitidos', 400));
        }
        cb(null, true);
      }
    });
  }

  /**
   * @description Limpa a pasta Temporária a cada config.server.cleanerInterval minutos
   */
  public cleanTempFolder() {
    fs.readdir(this.tempFolderPath, (err, files) => {
      if (err) {
        console.error('Erro ao listar arquivos temporários:', err);
        return;
      }

      // Remove os arquivos da pasta temporária criados há mais de cinco minuto
      files.forEach(file => {
        const filePath = path.join(this.tempFolderPath, file);
        fs.stat(filePath, (erro, stats) => {
          if (erro) {
            console.error(`Erro ao obter informações do arquivo ${file}:`, erro);
            return;
          }
          const tempoCriacaoMs = stats.birthtimeMs; // Tempo de criação do arquivo em milissegundos
          if (tempoCriacaoMs < this.cleanerIntevarl) { // Se o arquivo foi criado há mais de um minuto, remova-o
            fs.unlink(filePath, error => {
              if (error) {
                console.error(`Erro ao remover o arquivo ${file}:`, error);
                return;
              }
              console.log(`Arquivo ${file} removido com sucesso.`);
            });
          }
        });
      });
    });
  }
}

export default new FileManager();