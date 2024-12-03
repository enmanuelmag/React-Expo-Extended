/* eslint-disable @typescript-eslint/no-explicit-any */

class LoggerImpl {
  private getPrefix() {
    return {
      text: '[APP]',
      css: 'color:#ef9234;',
    };
  }

  private print(type: LogType, text: string[], objects?: object[]): void {
    const prefix = this.getPrefix();
    const texts: string[] = [];
    const _objects: any[] = [];

    text.forEach((t) => {
      if (typeof t === 'string') {
        texts.push(t);
      } else {
        _objects.push(t);
      }
    });

    console[type](prefix.text + ' ' + texts.join(' '), ...(objects ?? []), ..._objects);
  }

  debug(...text: any[]): void {
    this.print('debug', ['[DEBUG]', ...text]);
  }

  debugWithObjects(text: any[], objects: any[]): void {
    this.print('debug', ['[DEBUG]', ...text], objects);
  }

  info(...text: any[]): void {
    this.print('info', ['[INFO]', ...text]);
  }

  warn(...text: any[]): void {
    this.print('warn', ['[WARN]', ...text]);
  }

  error(...text: any[]): void {
    this.print('error', ['[ERROR]', ...text]);
  }
}

export const Logger = new LoggerImpl();

export type LogType = 'error' | 'warn' | 'debug' | 'info';
