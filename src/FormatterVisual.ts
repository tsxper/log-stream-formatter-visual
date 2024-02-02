import util from 'util';

export type LOG_LEVEL = 0 | 1 | 2 | 3 | 4;

export class FormatterVisual {
  protected colors = true;
  protected depth = 2;
  protected logLevelsMap = {
    0: '',
    1: 'ERROR',
    2: 'WARN',
    3: 'INFO',
    4: 'DEBUG',
  };

  setColors(useColors: boolean): this {
    this.colors = useColors;
    return this;
  }

  setDepth(depth: number): this {
    this.depth = depth;
    return this;
  }

  formatter(ts: number, name: string, scope: string, level: LOG_LEVEL, data?: unknown): string {
    let logLevelC = this.logLevelsMap[level];
    let titleC = name;
    const formats: string[] = ['%s', '%s', '(%s):', '%s'];
    if (data) {
      formats.push('%O');
    }
    if (this.colors) {
      if (level === 4) {
        logLevelC = this.wrapInBlue(logLevelC);
      } else if (level === 3) {
        logLevelC = this.wrapInGreen(logLevelC);
      } else if (level === 2) {
        logLevelC = this.wrapInYellow(logLevelC);
      } else if (level === 1) {
        logLevelC = this.wrapInRed(logLevelC);
      }
      titleC = this.wrapInCyan(titleC);
    }
    const params = [new Date(ts).toISOString(), logLevelC, scope, titleC, data].filter((v) => v !== undefined);
    return util.formatWithOptions({ compact: false, depth: this.depth }, formats.join(' '), ...params);
  }

  protected wrapInRed(str: string): string {
    const redCode = 31;
    return this.wrapInColor(redCode, str);
  }

  protected wrapInYellow(str: string): string {
    const redCode = 33;
    return this.wrapInColor(redCode, str);
  }

  protected wrapInGreen(str: string): string {
    const greenCode = 32;
    return this.wrapInColor(greenCode, str);
  }

  protected wrapInBlue(str: string): string {
    const blueCode = 34;
    return this.wrapInColor(blueCode, str);
  }

  protected wrapInCyan(str: string): string {
    const cyanCode = 36;
    return this.wrapInColor(cyanCode, str);
  }

  protected wrapInColor(color: number, str: string): string {
    return `\x1b[${color}m${str}\x1b[0m`;
  }
}
