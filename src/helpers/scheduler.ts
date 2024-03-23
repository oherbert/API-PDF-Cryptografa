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

  public start() {
    this.scheduler.start();
  }

  public stop() {
    this.scheduler.stop();
  }

  public getCronExpression(second = 0, minute = 0, hour = 0) {
    if (second && !minute && !hour) return `*/${second} * * * * *`;
    if (minute && !hour) return `${second} */${minute} * * * *`;
    if (hour) return `${second} ${minute} */${hour} * * *`;
    return `*/1 * * * * *`;
  }

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

  public unregisterTask(id: number) {
    this.scheduler.unregisterTask(id);
  }

  public unregisterAllTaks() {
    this.taskIds.forEach(id => this.unregisterTask(id));
    this.taskIds = [];
  }
}

export default new Scheduler();
