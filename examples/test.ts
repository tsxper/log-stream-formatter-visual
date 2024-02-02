import { Logger } from '@tsxper/log-stream';
import { FormatterVisual } from '../src';

class A {
  prop = 'abc';
  constructor(public a: A[]) { }
}

Logger.replaceLogStreams(process.stdout, process.stderr);
const logger = new Logger(4, 'std');
const formatter = new FormatterVisual();
logger.setFormatter(formatter.formatter.bind(formatter));

const log = async () => {
  const pause = 500;
  await new Promise(r => setTimeout(r, pause));
  logger.debug('debug');
  await new Promise(r => setTimeout(r, pause));
  logger.log('info', [1, 2]);
  await new Promise(r => setTimeout(r, pause));
  logger.error('error', new Error('test'));
  await new Promise(r => setTimeout(r, pause));
  logger.warn('info', { a: { b: { c: { d: 'f' } } } });
  await new Promise(r => setTimeout(r, pause));

  const arr: A[] = [];
  const obj = new A(arr);
  arr.push(obj);
  logger.log('info', { arr });
};

log();
