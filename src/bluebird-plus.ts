import { BreakablePromise } from './breakable-promise';
import { Queue } from './queue';

export module BluebirdPlus {
  const Promise = require('bluebird');

  const nestedPromiseAll = (groups, fxn) => {
    return Promise.all(groups.map(
      group => Promise.all(group.map(
        single => fxn(single)
      ))
    ));
  }

  const sequentialPromiseAll = (groups: any[][], fxn) => {
    return Promise.each(
      groups,
      group => Promise.all(group.map(
        single => fxn(single)
      ))
    )
  }

  const convertToBreakable = (promise) => new BreakablePromise(promise);

  exports.Queue = Queue;
  exports.convertToBreakable = convertToBreakable;
  exports.nestedPromiseAll = nestedPromiseAll;
  exports.sequentialPromiseAll = sequentialPromiseAll;
}