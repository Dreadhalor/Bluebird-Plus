export class Queue {

  queue = [];
  running = false;

  constructor(){}

  queuePromise(args, fxn) {
    let pair = {
      args: args,
      fxn: fxn
    }
    this.queue.push(pair);
    if (!this.running) this.advanceQueue();
  }
  advanceQueue() {
    this.running = true;
    if (this.queue.length > 0){
      let pair = this.queue.pop();
      pair.fxn(pair.args)
        .then(success => this.advanceQueue())
        .catch(error => this.advanceQueue());
    } else this.running = false;
  }

}