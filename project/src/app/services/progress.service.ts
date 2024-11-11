import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProgressModel } from '../model/progress';

@Injectable({
  providedIn: 'root'
})
export class ProgressService {
  constructor(private http: HttpClient) {}

  saveUserProgress(userEmail: string, progress: ProgressModel): Observable<any> {
    return this.http.post('http://localhost/backend/php/progress/saveProgress.php', {
      email: userEmail,
      workout_done: progress.workoutDone,
      calories_consumed: progress.caloriesConsumed,
      progress_date: new Date().toISOString().slice(0, 10) // current date
    });
  }

  getUserProgress(userEmail: string): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost/backend/php/progress/getProgress.php?email=${userEmail}`);
  }
}
