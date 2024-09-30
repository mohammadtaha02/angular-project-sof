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


  //subscribers
  
  private wgerApiUrl = 'https://wger.de/api/v2/exercise';

  getMuscleGainWorkouts(): Observable<any> {
    const params = {
      language: '2',  // english language
      status: '2',    // approved exercises only
      category: '8',  // category ID for strength training (based on API docs)
      difficulty: '1' // difficulty level 1 for beginner
    };

    return this.http.get(`${this.wgerApiUrl}/exercise/`, { params });
  }

  
}
