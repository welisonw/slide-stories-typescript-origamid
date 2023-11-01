
export class Timeout {
  id;
  handler;
  startMoment;
  timeLeft;

  constructor(handler: TimerHandler, time: number) {
    this.id = setTimeout(handler, time);
    this.handler = handler;
    this.startMoment = Date.now();
    this.timeLeft = time;
  };


  clearTimeout() {
    clearTimeout(this.id);
  };

  pauseMoment() {
    const timePassed = Date.now() - this.startMoment;
    this.timeLeft = this.timeLeft - timePassed;

    this.clearTimeout();
  };

  continue() {
    this.clearTimeout();

    this.id = setTimeout(this.handler, this.timeLeft);

    this.startMoment = Date.now();
  };
};
