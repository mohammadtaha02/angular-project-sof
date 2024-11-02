export class ProgressModel {
    workoutDone: number; // number of workouts completed
    caloriesConsumed: number; // total calories consumed
  
    constructor(workoutDone: number, caloriesConsumed: number) {
      this.workoutDone = workoutDone;
      this.caloriesConsumed = caloriesConsumed;
    }
  }
  