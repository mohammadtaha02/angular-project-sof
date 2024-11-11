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

  constructor(private planLogicService: PlanLogicService, private subscriberService: SubscribeService) {}

  ngOnInit(): void {
    const currentUserEmail = sessionStorage.getItem('currentUser');

    if (currentUserEmail) {
      // Fetch subscriber details
      this.subscriberService.getSubscriber(currentUserEmail).subscribe(subscriberData => {
        if (!subscriberData.error) {
          console.log(subscriberData)
          const fitnessGoal = subscriberData.fitness_goal;
          const activityLevel = subscriberData.activity_level;
          const difficulty = subscriberData.fitness_level;
          const age = subscriberData.age;
          const ageGroup = this.groupByAge(age);

          // Generate weekly workout schedule from the database
          this.planLogicService.generateCustomizedWorkoutSchedule(fitnessGoal, activityLevel, difficulty, ageGroup)
            .subscribe(response => {
              this.weeklySchedule = response; // Directly assign response to weeklySchedule
              console.log('Weekly Schedule:', this.weeklySchedule);
            });
        } else {
          console.error('Subscriber not found or no subscription:', subscriberData.error);
        }
      });
    } else {
      console.error('No user is currently logged in.');
    }
  }
  groupByAge(age: number): string {
    if (age >= 12 && age <= 16) {
      return 'adolescent';
    } else if (age >= 17 && age <= 21) {
      return 'young_adult';
    } else if (age >= 22 && age <= 30) {
      return 'prime';
    } else if (age >= 31 && age <= 40) {
      return 'mature_adult';
    } else {
      return 'senior';
    }
  }
}
