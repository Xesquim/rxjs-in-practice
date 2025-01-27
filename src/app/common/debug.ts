import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

export enum RxJsLoggingLevel {
  TRACE,
  DEBUG,
  INFO,
  ERROR,
}

let rxjsLoggingLevel = RxJsLoggingLevel.INFO;

export function setRxJsLogginLevel(level: RxJsLoggingLevel) {
  rxjsLoggingLevel = level;
}

export const debug =
  (level: RxJsLoggingLevel, message: string) => (source: Observable<any>) =>
    source.pipe(
      tap((val) => {
        if (level >= rxjsLoggingLevel) {
          console.log(message + ": ", val);
        }
      })
    );
