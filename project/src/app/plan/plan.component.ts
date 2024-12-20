import { Component, OnInit } from '@angular/core';
import { SubscribeModel } from '../model/subscribe';
import { PlanLogicService } from '../services/plan-logic.service';
import { PlanService } from '../services/plan.service'; 


@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.css']
})
export class PlanComponent implements OnInit {
  subscriber!: SubscribeModel;
  workoutPlan: string[] = [];
  nutritionPlan: string = '';
  workoutSchedule: { day: string, workouts: string[] }[] = [];

  constructor(
    private planLogicService: PlanLogicService,
    private planService: PlanService
  ) {}

  ngOnInit(): void {
    // get current user's email from sessionStorage
    const currentUserEmail = sessionStorage.getItem('currentUser');

    if (currentUserEmail) {
      // fetch subscriber data using the email
      this.planService.getSubscriberByEmail(currentUserEmail).subscribe(subscriberData => {
        this.subscriber = subscriberData;

        // henerate the high-level workout plan
        this.workoutPlan = this.planLogicService.generateWorkoutPlan(this.subscriber);

        // nutrition; is yet to be implemented correctly
        this.nutritionPlan = this.planLogicService.generateNutritionPlan(this.subscriber);

        // generate the weekly workout schedule based on subscriber data
        this.workoutSchedule = this.planLogicService.generateWorkoutSchedule(this.subscriber);
      });
    } else {
      console.error('No user email found in sessionStorage.');
    }
  }
}
