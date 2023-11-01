
export class Timeout {
  id;
  handler;

  constructor(handler: TimerHandler, time: number) {
    this.id = setTimeout(handler, time);
    this.handler = handler;
  };


  clearTimeout() {
    clearTimeout(this.id);
  }
};
