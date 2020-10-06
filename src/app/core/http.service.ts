import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { APP_CONSTANTS } from '../data-constants/app-constants';
import { IQuestions } from '../data-interfaces/questions.interface';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  private httpOption = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  public get(): Observable<IQuestions[]> {
    return this.http
      .get(
        APP_CONSTANTS.ENV + APP_CONSTANTS.API_URL + APP_CONSTANTS.GET_QUESTIONS
      )
      .pipe(
        map((res: IQuestions[]) => {
          if (res) {
            return res;
          }
        }),
        catchError(this.handleError)
      );
  }

  public post(requestBody: any): Observable<any> {
    return this.http
      .post(
        APP_CONSTANTS.ENV + APP_CONSTANTS.API_URL + APP_CONSTANTS.GET_RESULTS,
        requestBody,
        this.httpOption
      )
      .pipe(
        map((res: any) => {
          if (res) {
            return res;
          }
        }),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(error);
  }
}
