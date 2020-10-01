import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { IDataSubjectMessage } from '../data-interfaces/data-subject-message.interface';

@Injectable({
  providedIn: 'root',
})
export class DataSubjectService {
  private readonly dataSubject: Subject<IDataSubjectMessage>;
  constructor() {
    this.dataSubject = new Subject<IDataSubjectMessage>();
  }

  public cast(key: string, data?: any): void {
    if (key) {
      this.dataSubject.next({ key: key, data: data });
    } else {
      throw new Error(
        'Given key is a falsy value (null,undefined or empty string'
      );
    }
  }

  public on(key: string): Observable<any> {
    return this.dataSubject.asObservable().pipe(
      filter((message: IDataSubjectMessage) => {
        return message.key === key;
      }),
      map((message: IDataSubjectMessage) => {
        return message.data;
      })
    );
  }
}
