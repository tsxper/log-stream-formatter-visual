import { FormatterVisual } from '.';

describe('Logger', () => {
  it('should output without colors when switched to visual format with colors disabled', async () => {
    const formatter = new FormatterVisual();
    formatter.setColors(false);
    const res = formatter.formatter(0, 'test msg', 'VISUAL', 3, [1]);
    expect(res).toMatch(/INFO \(VISUAL\): test msg \[[\n\s]+1[\n]\]/);
  });

  it('should output with colors when switched to visual format', async () => {
    const formatter = new FormatterVisual();

    const infoRes = formatter.formatter(0, 'test msg', 'VISUAL', 3, null);
    expect(infoRes).toMatch(/[\x1B]\[32mINFO[\x1B]\[0m \(VISUAL\): [\x1B]\[36mtest msg[\x1B]\[0m/);

    const debugRes = formatter.formatter(0, 'test msg', 'VISUAL', 4, null);
    expect(debugRes).toMatch(/[\x1B]\[34mDEBUG[\x1B]\[0m \(VISUAL\): [\x1B]\[36mtest msg[\x1B]\[0m/);

    const warnRes = formatter.formatter(0, 'test msg', 'VISUAL', 2, null);
    expect(warnRes).toMatch(/[\x1B]\[33mWARN[\x1B]\[0m \(VISUAL\): [\x1B]\[36mtest msg[\x1B]\[0m/);

    const errRes = formatter.formatter(0, 'test msg', 'VISUAL', 1, null);
    expect(errRes).toMatch(/[\x1B]\[31mERROR[\x1B]\[0m \(VISUAL\): [\x1B]\[36mtest msg[\x1B]\[0m/);
  });
});
