import { Component, OnInit } from '@angular/core';
import { PlanLogicService } from '../services/plan-logic.service';
import { SubscribeService } from '../services/subscribe.service';

@Component({
  selector: 'app-actual-workouts',
  templateUrl: './actual-workouts.component.html',
  styleUrls: ['./actual-workouts.component.css']
})
export class ActualWorkoutsComponent implements OnInit {
  weeklySchedule: any[] = [];
  workoutDays: number[] = [];

  // Mapping of category IDs to muscle groups
  private categoryMapping: { [key: number]: string } = {
    8: 'Chest',
    9: 'Back',
    10: 'Legs',
    11: 'Arms',
    12: 'Shoulders',
    13: 'Abs',
    14: 'Cardio', // Example cardio categories, can be adjusted
    15: 'HIIT',
    // Add other categories as needed
  };

  constructor(private planLogicService: PlanLogicService, private subscriberService: SubscribeService) {}

  ngOnInit(): void {
    const currentUserEmail = sessionStorage.getItem('currentUser');

    if (currentUserEmail) {
      // Fetch subscriber details from the server
      this.subscriberService.getSubscriber(currentUserEmail).subscribe(subscriberData => {
        if (!subscriberData.error) {
          const fitnessGoal = subscriberData.fitness_goal;
          const activityLevel = subscriberData.activity_level;

          // Fetch detailed workouts and schedule from the API based on the user's plan
          this.planLogicService.generateCustomizedWorkoutSchedule(fitnessGoal, activityLevel)
            .subscribe(response => {
              this.weeklySchedule = response; // Assign response directly to weeklySchedule

              // Filter workouts logically by mapping category IDs to muscle groups
              this.weeklySchedule.forEach((day: any) => {
                if (day.bigMuscleExercises && day.smallMuscleExercises) {
                  // Filter big muscle workouts
                  day.bigMuscleWorkouts = day.bigMuscleExercises.filter((workout: { category: number }) => {
                    const muscleGroup = this.categoryMapping[workout.category];
                    return muscleGroup && ['Chest', 'Back', 'Legs'].includes(muscleGroup);
                  });

                  // Filter small muscle workouts
                  day.smallMuscleWorkouts = day.smallMuscleExercises.filter((workout: { category: number }) => {
                    const muscleGroup = this.categoryMapping[workout.category];
                    return muscleGroup && ['Arms', 'Shoulders', 'Abs'].includes(muscleGroup);
                  });

                  // Limit the number of exercises
                  day.bigMuscleWorkouts = day.bigMuscleWorkouts.slice(0, 3);
                  day.smallMuscleWorkouts = day.smallMuscleWorkouts.slice(0, 2);
                }
              });
            });
        } else {
          console.error('Subscriber not found or no subscription:', subscriberData.error);
        }
      });
    } else {
      console.error('No user is currently logged in.');
    }
  }
}
