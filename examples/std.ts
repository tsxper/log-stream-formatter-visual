import { Logger } from '@tsxper/log-stream';

class A {
  prop = 'abc';
  constructor(public a: A[]) { }
}

Logger.replaceLogStreams(process.stdout, process.stdout);
const logger = new Logger(4, 'std');

const log = async () => {
  const pause = 500;
  logger.debug('debug');
  logger.log('info', [1, 2]);
  await new Promise(r => setTimeout(r, pause));
  logger.error('error', new Error('test'));
  await new Promise(r => setTimeout(r, pause));
  logger.warn('info', { a: { b: { c: { d: 'f' } } } });

  const arr: A[] = [];
  const obj = new A(arr);
  arr.push(obj);
  logger.log('info', { arr });
};

log();
