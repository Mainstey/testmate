import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../core/http.service';
import { IQuestions } from '../data-interfaces/questions.interface';
import { ISelectedOptions } from '../data-interfaces/selected_options.interface';

@Injectable()
export class TestRemoteService {
  constructor(private httpService: HttpService) {}

  public getQuestions(): Observable<IQuestions[]> {
    return this.httpService.get();
  }

  public getResults(requestBody: ISelectedOptions[]): Observable<any> {
    return this.httpService.post(JSON.stringify(requestBody));
  }
}
