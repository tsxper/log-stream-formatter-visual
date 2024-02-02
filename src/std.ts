#!/usr/bin/env node
import { stdin, stdout } from 'node:process';
import { pipeline, Transform, TransformCallback } from 'node:stream';
import { LOG_LEVEL, FormatterVisual } from './FormatterVisual';
import { EOL } from 'os';

type DEFAULT_FORMAT = {
  t: number;
  l: LOG_LEVEL;
  s: string;
  n: string;
  d?: unknown;
  e?: Error;
};

const formatter = new FormatterVisual();
pipeline(
  stdin,
  new Transform({
    transform(chunk: Buffer, encoding: BufferEncoding, callback: TransformCallback) {
      let line = chunk.toString().trim();
      try {
        const decoded = JSON.parse(line) as DEFAULT_FORMAT;
        if (decoded.t) {
          line = formatter.formatter(decoded.t, decoded.n, decoded.s, decoded.l, decoded.e || decoded.d);
        }
      } catch (e) {
        //
      }
      callback(null, `${line}${EOL}`);
    },
  }),
  stdout,
  (err) => {
    if (err) throw err;
  }
);
