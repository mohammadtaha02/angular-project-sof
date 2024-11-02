import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WorkoutApiService {
  private apiUrl = 'https://wger.de/api/v2/exercise/';

  constructor(private http: HttpClient) {}

  // Fetch workout details by category or specific workout id
  getWorkoutsByCategory(categoryId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}?category=${categoryId}`);
  }

  // Fetch workout by its ID (for detailed view if needed)
  getWorkoutById(workoutId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}${workoutId}/`);
  }
}
