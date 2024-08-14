import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {
  private baseUrl = 'http://localhost/backend/php/workouts';

  constructor(private http: HttpClient) { }

  getWorkouts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/getWorkouts.php`);
  }
  getWorkoutById(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/getWorkoutById.php`, { params: { id } });
  }
  getWorkoutsByTrainingId(trainingId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/getWorkoutsByTrainingId.php`, { params: { training_id: trainingId } });
  }  
}
