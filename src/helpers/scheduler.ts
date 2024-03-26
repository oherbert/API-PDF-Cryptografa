import { IntervalBasedCronScheduler, parseCronExpression } from 'cron-schedule';
/*
--- cronExpression Exemplo:

 # ┌────────────── second (optional)
 # │ ┌──────────── minute
 # │ │ ┌────────── hour
 # │ │ │ ┌──────── day of month
 # │ │ │ │ ┌────── month
 # │ │ │ │ │ ┌──── day of week
 # │ │ │ │ │ │
 # │ │ │ │ │ │
 # * * * * * *
*/
// exec cada 1 segundo: '*/1 * * * * *'
// exec cada 1 minuto:    '*/1 * * * *'

class Scheduler {
  public taskIds: number[];

  private scheduler: IntervalBasedCronScheduler;

  public constructor() {
    this.scheduler = new IntervalBasedCronScheduler(1);
    this.taskIds = [];
  }

  /**
   * @description Inicia o scheduler
   */
  public start() {
    this.scheduler.start();
  }

  /**
  * @description Para o scheduler
  */
  public stop() {
    this.scheduler.stop();
  }

  /**
   * @param second Opcional a quantidade de segundos
   * @param minute Opcional a quantidade de minutos
   * @param hour Opcional a quantidade de horas
   * @returns Expressão Cron para determinar o intevalo segundos ou minutos ou horas
   */
  public getCronExpression(second = 0, minute = 0, hour = 0) {
    if (second && !minute && !hour) return `*/${second} * * * * *`;
    if (minute && !hour) return `${second} */${minute} * * * *`;
    if (hour) return `${second} ${minute} */${hour} * * *`;
    return `*/1 * * * * *`;
  }

  /**
   * @param cronExpression Expressão cron para deterniar o intervalo do schedule possivel obter através da função getCronExpression;
   * @param task A função que será executada de acordo com o intervalo;
   * @example Ex: Execução a cada 5 minutos -> scheduler.registerTask(scheduler.getCronExpression(0, 5), () => {console.log('taks');})
   * @returns Id do registro na fila das Tasks;
   */
  public registerTask(
    cronExpression: string,
    task: () => void
  ): number /* id */ {
    const taskId = this.scheduler.registerTask(
      parseCronExpression(cronExpression),
      task,
      {
        isOneTimeTask: false,
        errorHandler: err => console.log(err),
      }
    );

    this.taskIds.push(taskId);

    return taskId;
  }

  /**
   * @param id Id da Taks
   * @description Remove a taks da fila do schedule
   */
  public unregisterTask(id: number) {
    this.scheduler.unregisterTask(id);
  }

  /**
   * @description Limpa todos os Schedules
   */
  public unregisterAllTaks() {
    this.taskIds.forEach(id => this.unregisterTask(id));
    this.taskIds = [];
  }
}

export default new Scheduler();
