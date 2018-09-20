export class BreakablePromise {

  promise;
  unbroken = true;
  
  constructor(promise: Promise<any>){
    this.promise = promise;
  }

  then(handler: (any) => Promise<any>){
    this.promise = this.promise.then(result => {
      if (this.unbroken) return handler(result)
    });
    return this;
  }

  catch(handler: (any) => Promise<any>){
    this.promise = this.promise.catch(result => {
      if (this.unbroken) return handler(result)
    });
    return this;
  }

  break(handler: (any) => Promise<any>){
    this.promise = this.promise.catch(result => {
      if (this.unbroken) {
        this.unbroken = false;
        return handler(result)
      }
    });
    return this;
  }

}