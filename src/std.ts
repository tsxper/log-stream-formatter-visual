#!/usr/bin/env node
import { argv, stdin, stdout } from 'node:process';
import { pipeline, Transform, TransformCallback } from 'node:stream';
import { LOG_LEVEL, FormatterVisual } from './FormatterVisual';
import { EOL } from 'os';

const args = argv.slice(2);
const logDepth = parseInt(args[0] || '');

type DEFAULT_FORMAT = {
  t: number;
  l: LOG_LEVEL;
  s: string;
  n: string;
  d?: unknown;
  e?: Error;
};

const formatter = new FormatterVisual();
if (!isNaN(logDepth)) {
  formatter.setDepth(logDepth);
}
pipeline(
  stdin,
  new Transform({
    transform(chunk: Buffer, encoding: BufferEncoding, callback: TransformCallback) {
      const lines = chunk.toString().trim().split(`}${EOL}{`).map((l) => l.trim());
      if (!lines.length) {
        return callback(null, `${EOL}`);
      }
      for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
        if (!line) continue;
        if (!line.startsWith('{')) line = `{${line}`;
        if (!line.endsWith('}')) line = `${line}}`;
        try {
          const decoded = JSON.parse(line) as DEFAULT_FORMAT;
          if (decoded.t) {
            line = formatter.formatter(decoded.t, decoded.n, decoded.s, decoded.l, decoded.e || decoded.d);
          }
        } catch (e) {
          //
        }
        lines[i] = line;
      }
      
      callback(null, `${lines.join(EOL)}${EOL}`);
    },
  }),
  stdout,
  (err) => {
    if (err) throw err;
  }
);
