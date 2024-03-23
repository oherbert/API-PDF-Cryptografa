import muhammara from 'muhammara';
import fs from 'fs';
import path from "path";

class PdfManager {

  /**
   *@description Método responsavél para adicionar senha ao pdf
   */
  public encrypt(destination: string, inputPath: string, fileName: string, password: string) {

    if (!fs.existsSync(destination)) fs.mkdirSync(destination);

    const output = path.join(destination, fileName);

    const pdfDoc = new muhammara.Recipe(inputPath, output);

    pdfDoc.encrypt({
      userPassword: password,
      ownerPassword: password,
      userProtectionFlag: 4,
    }).endPDF();

    return output;
  }
}

export default new PdfManager();