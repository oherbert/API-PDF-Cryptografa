import { Request, Response } from 'express';
import fs from 'fs';
import path from "path";

// Função para limpar a pasta temporária
function limparPastaTemporaria(tempFolderPath) {
  fs.readdir(tempFolderPath, (err, files) => {
    if (err) {
      console.error('Erro ao listar arquivos temporários:', err);
      return;
    }
    const umMinutoAtras = Date.now() - (60 * 1000);
    // Remove os arquivos da pasta temporária criados há mais de um minuto
    files.forEach(file => {
      const filePath = path.join(tempFolderPath, file);
      fs.stat(filePath, (erro, stats) => {
        if (erro) {
          console.error(`Erro ao obter informações do arquivo ${file}:`, erro);
          return;
        }
        const tempoCriacaoMs = stats.birthtimeMs; // Tempo de criação do arquivo em milissegundos
        if (tempoCriacaoMs < umMinutoAtras) { // Se o arquivo foi criado há mais de um minuto, remova-o
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

export const tempCleaner = (req: Request, res: Response) => {

  console.log('finish');

  res.on('finish', () => {
    try {
      limparPastaTemporaria(req.file.destination);
    } catch (error) {
      console.log(error);
    }
  });

}