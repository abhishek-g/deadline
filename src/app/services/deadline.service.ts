import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';


export interface Deadline {
  secondsLeft: number;
}

@Injectable({
  providedIn: 'root'
})
export class DeadlineService {

  httpClient: HttpClient = inject(HttpClient);

  constructor() { }

  getDeadline(): Observable<Deadline> {
    return this.httpClient.get<Deadline>('/api/deadline');
  }

}
