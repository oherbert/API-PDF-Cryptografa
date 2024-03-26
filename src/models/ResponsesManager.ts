import { IResponse } from '../interfaces/IResponse';
import config from '../util/configResolve';

class ResponsesManager {
  responses: IResponse[];

  constructor() {
    this.responses = [];
  }

  /**
   * @description Função que grava as requisições enviadas
   * @param resId Id da requisição
   * @param resCode Codigo da resposta da requisição
   * @param resSended Oquê foi enviado como resposta
   * @returns void
   */
  public addResponse(resId: string, resCode: number, resSended: string) {

    const resDate = Date.now();

    this.responses.push({
      resId,
      resDate,
      resCode,
      resSended
    });
  }
  /**
   * 
   * @param resId Id da requisição
   * @returns IResponse
   */
  public getResponse(resId: string) {
    return this.responses.find(f => f.resId === resId);
  }

  /**
   *  @description Limpa as requisições maiores que o tempo previsto na configuração cleanerInterval
   *  @returns void
   */
  public flushOlds() {
    const expiredTime = (60 * 1000 * config.server.cleanerInterval);
    const fresh = this.responses.filter(f => f.resDate + expiredTime > Date.now());

    console.log(fresh);

    this.responses = fresh;
  }

  /**
   * 
   * @param ms Tempo do delay em Milissegundos 
   * @returns Void apos o tempo em Milissegundos
   */
  public delay(ms = 1000) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}

export default new ResponsesManager();