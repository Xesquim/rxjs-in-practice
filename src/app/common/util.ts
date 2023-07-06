import { Observable } from "rxjs";

export function createHttpObservable(url: string): Observable<any> {
  return new Observable((observer) => {
    const controller = new AbortController();
    const signal = controller.signal;

    fetch(url, { signal })
      .then((response) => {
        if (!response.ok) {
          observer.error("Request failed with status code: " + response.status);
        }
        return response.json();
      })
      .then((body) => {
        observer.next(body);
        observer.complete();
      })
      .catch((err) => {
        observer.error(err);
      });

    return () => controller.abort();
  });
}
