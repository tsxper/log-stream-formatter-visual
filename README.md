# @tsxper/log-stream-formatter-visual
Visual formatter for [@tsxper/log-stream](https://www.npmjs.com/package/@tsxper/log-stream).

[![NPM Version](https://img.shields.io/npm/v/@tsxper/log-stream-formatter-visual.svg?style=flat-square)](https://www.npmjs.com/package/@tsxper/log-stream-formatter-visual)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)
![npm type definitions](https://img.shields.io/npm/types/@tsxper/log-stream-formatter-visual)
[![NPM Downloads](https://img.shields.io/npm/dt/@tsxper/log-stream-formatter-visual.svg?style=flat-square)](https://www.npmjs.com/package/@tsxper/log-stream-formatter-visual)

```bash
npm i @tsxper/log-stream-formatter-visual -D
```

## Configuration

There are 2 possible options of configuration:
- Piped output.
- Replace default formatter.

### Piped Output
Piped output can be useful when formatter is installed as a dev dependency.

```bash
npx ts-node service.ts | npx @tsxper/log-stream-formatter-visual
```

### Replace Default Formatter
```JavaScript
import { FormatterVisual } from '@tsxper/log-stream-formatter-visual';
const formatter = new FormatterVisual();
logger.setFormatter(formatter.formatter.bind(formatter));
```

### Disable Colors
```JavaScript
formatter.setColors(false);
```
