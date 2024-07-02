import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Training } from '../model/training';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  private baseUrl = 'http://localhost/backend';

  constructor(private http: HttpClient) {}

  addTraining(training: Training): Observable<any> {
    return this.http.post(`${this.baseUrl}/addTraining.php`, training);
  }

  updateTraining(training: Training): Observable<any> {
    return this.http.post(`${this.baseUrl}/updateTraining.php`, training);
  }

  getTrainings(): Observable<Training[]> {
    return this.http.get<Training[]>(`${this.baseUrl}/getTrainings.php`);
  }

  searchTraining(params: any): Observable<Training[]> {
    return this.http.post<Training[]>(`${this.baseUrl}/searchTraining.php`, params);
  }

  filterTraining(params: any): Observable<Training[]> {
    return this.http.post<Training[]>(`${this.baseUrl}/filterTraining.php`, params);
  }
}
