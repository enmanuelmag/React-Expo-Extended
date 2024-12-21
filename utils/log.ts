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

    //show only hh:mm:ss
    const timestamp = new Date().toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });

    if (process.env.EXPO_PUBLIC_IS_DEV) {
      console[type](
        prefix.text + ` [${timestamp}] ` + texts.join(' '),
        ...(objects ?? []),
        ..._objects,
      );
    }
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

  ds(...text: any[]): void {
    this.print('info', ['[DS]', ...text]);
  }
}

export const Logger = new LoggerImpl();

export type LogType = 'error' | 'warn' | 'debug' | 'info';
