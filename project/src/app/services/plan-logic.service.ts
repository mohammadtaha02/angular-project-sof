import { Injectable } from '@angular/core';
import { SubscribeModel } from '../model/subscribe';
import { WorkoutApiService } from './workout-api.service'; 
import { forkJoin, map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PlanLogicService {

  private apiUrl = 'https://wger.de/api/v2';

  constructor(private workoutApiService: WorkoutApiService, private http: HttpClient) {}

  generateCustomizedWorkoutSchedule(
    fitnessGoal: string,
    activityLevel: string
  ): Observable<any> {
    let categoryIds: { bigMuscles: number[]; smallMuscles: number[] } = {
      bigMuscles: [],
      smallMuscles: [],
    };
  
    // Adjust the categories based on the fitness goal
    if (fitnessGoal === 'muscle_gain') {
      categoryIds = {
        bigMuscles: [8, 9, 10], // Chest, Back, Legs
        smallMuscles: [11, 12, 13], // Arms, Shoulders, Abs
      };
    } else if (fitnessGoal === 'weight_loss') {
      categoryIds = {
        bigMuscles: [14, 15, 16], // Cardio categories
        smallMuscles: [17, 18], // Mixed cardio and endurance
      };
    } else if (fitnessGoal === 'endurance') {
      categoryIds = {
        bigMuscles: [19], // Endurance workouts
        smallMuscles: [20], // Additional endurance
      };
    }
  
    // Determine weekly schedule based on activity level
    let weeklySchedule: number[] = [];
  
    if (activityLevel === 'sedentary') {
      weeklySchedule = [1, 0, 0, 1, 0, 0, 1];
    } else if (activityLevel === 'lightly_active') {
      weeklySchedule = [1, 0, 1, 0, 1, 0, 1];
    } else if (activityLevel === 'active') {
      weeklySchedule = [1, 1, 0, 1, 1, 0, 1];
    } else if (activityLevel === 'very_active') {
      weeklySchedule = [1, 1, 0, 1, 1, 0, 1];
    }
  
    // Fetch workouts for both big and small muscle groups
    const bigMuscleObservables = categoryIds.bigMuscles.map((id) =>
      this.http.get<any>(`${this.apiUrl}/exercise/?category=${id}&language=2`)
    );
    const smallMuscleObservables = categoryIds.smallMuscles.map((id) =>
      this.http.get<any>(`${this.apiUrl}/exercise/?category=${id}&language=2`)
    );
  
    return forkJoin([...bigMuscleObservables, ...smallMuscleObservables]).pipe(
      map((results) => {
  
        // Flatten the results to extract the workout details
        const bigMuscleWorkouts = results
          .slice(0, categoryIds.bigMuscles.length)
          .flatMap((result) => result.results);
        const smallMuscleWorkouts = results
          .slice(categoryIds.bigMuscles.length)
          .flatMap((result) => result.results);
          
        // Structure workouts by week based on schedule
        const weeklyPlan = weeklySchedule.map((isWorkoutDay, index) => {
          if (isWorkoutDay) {
            return {
              day: `Workout Day ${index + 1}`,
              bigMuscleExercises: this.pickRandomExercises(bigMuscleWorkouts, 3),
              smallMuscleExercises: this.pickRandomExercises(smallMuscleWorkouts, 2),
            };
          } else {
            return {
              day: `Rest Day ${index + 1}`,
              message: 'Take rest and let your muscles recover.',
            };
          }
        });
  
  
        return weeklyPlan;
      })
    );
  }
  

  private pickRandomExercises(workouts: any[], count: number): any[] {
    const shuffled = workouts.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }
  
  // 1. Group by age
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

  // 2. Calculate BMI from height and weight
  calculateBMI(height: number, weight: number): number {
    const heightInMeters = height / 100;
    return weight / (heightInMeters * heightInMeters);
  }

  groupByBMI(bmi: number): string {
    if (bmi < 18.5) {
      return 'underweight';
    } else if (bmi >= 18.5 && bmi <= 24.9) {
      return 'normal';
    } else if (bmi >= 25 && bmi <= 29.9) {
      return 'overweight';
    } else {
      return 'obese';
    }
  }

  // 3. Group by fitness level
  groupByFitnessLevel(fitnessLevel: string): string {
    switch (fitnessLevel) {
      case 'beginner':
        return 'beginner';
      case 'intermediate':
        return 'intermediate';
      case 'advanced':
        return 'advanced';
      default:
        return 'beginner';
    }
  }

  // 4. Generate workout plan based on rules
  generateWorkoutPlan(subscriber: SubscribeModel): string[] {
    const ageGroup = this.groupByAge(subscriber.age);
    const bmi = this.calculateBMI(subscriber.height, subscriber.weight);
    const bmiGroup = this.groupByBMI(bmi);
    const fitnessLevel = this.groupByFitnessLevel(subscriber.fitness_level);
    const fitnessGoal = subscriber.fitness_goal;
    const gender = subscriber.gender;
  
    let workoutPlan: string[] = [];
  
    // Gender-based adjustments
    if (gender === 'male') {
      workoutPlan.push('Strength training focus');
    } else if (gender === 'female') {
      workoutPlan.push('Endurance and flexibility focus');
    }
  
    // Example logic: Customize workout plan based on age, BMI, and fitness goal
    if (ageGroup === 'adolescent') {
      workoutPlan.push('Bodyweight exercises');
      workoutPlan.push('Light cardio');
    } else if (ageGroup === 'prime') {
      if (bmiGroup === 'underweight') {
        workoutPlan.push('Strength training');
        workoutPlan.push('Weight lifting');
      } else if (bmiGroup === 'overweight') {
        workoutPlan.push('HIIT');
        workoutPlan.push('Cardio-focused workouts');
      }
    } else if (ageGroup === 'mature_adult' || ageGroup === 'senior') {
      workoutPlan.push('Low-impact cardio');
      workoutPlan.push('Flexibility and balance exercises');
    }
  
    // Adjust intensity based on fitness level
    if (fitnessLevel === 'beginner') {
      workoutPlan.push('3 sets, 12 reps');
    } else if (fitnessLevel === 'intermediate') {
      workoutPlan.push('4 sets, 10 reps');
    } else {
      workoutPlan.push('5 sets, 8 reps');
    }
  
    // Adjust workout plan based on fitness goal
    if (fitnessGoal === 'muscle_gain' && ageGroup !== 'adolescent') { 
      workoutPlan.push('Focus on heavy lifting');
      workoutPlan.push('Progressive overload');
    }else if (fitnessGoal === 'weight_loss') {
      workoutPlan.push('High-intensity interval training');
      workoutPlan.push('Focus on fat burning');
    }
    return workoutPlan;
  }
  

  // Generate nutrition plan based on goal and BMI
  generateNutritionPlan(subscriber: SubscribeModel): string {
    const bmi = this.calculateBMI(subscriber.height, subscriber.weight);
    const fitnessGoal = subscriber.fitness_goal;

    let nutritionPlan: string = '';

    // Adjust based on fitness goal and BMI
    if (fitnessGoal === 'muscle_gain') {
      if (bmi < 18.5) {
        nutritionPlan = 'Aggressive caloric surplus, high protein, moderate carbs';
      } else {
        nutritionPlan = 'Moderate caloric surplus, high protein, balanced carbs';
      }
    } else if (fitnessGoal === 'weight_loss') {
      if (bmi >= 30) {
        nutritionPlan = 'Aggressive caloric deficit, high protein, low carbs, moderate fat';
      } else {
        nutritionPlan = 'Moderate caloric deficit, balanced macronutrients (higher protein, lower carbs)';
      }
    } else if (fitnessGoal === 'maintenance') {
      nutritionPlan = 'Maintenance calories, balanced macronutrients (protein, carbs, fat)';
    } else if (fitnessGoal === 'endurance') {
      nutritionPlan = 'High carbs, moderate protein, low fat for sustained energy';
    }

    return nutritionPlan;
  }


  generateWorkoutSchedule(subscriber: SubscribeModel): { day: string, workouts: string[] }[] {
    const ageGroup = this.groupByAge(subscriber.age);
    const gender = subscriber.gender;
    const bmi = this.calculateBMI(subscriber.height, subscriber.weight);
    const fitnessLevel = this.groupByFitnessLevel(subscriber.fitness_level);
    const fitnessGoal = subscriber.fitness_goal;
    const activityLevel = subscriber.activity_level;
  
    // Create a list of days
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
    // Define the structure for the schedule and explicitly set workouts as a string[]
    let schedule: { day: string, workouts: string[] }[] = [];
  
    // Define workout and rest patterns based on fitness level and activity level
    let workoutDaysPattern: number[] = [];
  
    // Fitness Level + Activity Level based logic for workout and rest distribution
    if (fitnessLevel === 'beginner') {
      // Beginner level: Day On, Day Off (3 workouts, 4 rest days)
      workoutDaysPattern = [1, 0, 1, 0, 1, 0, 0]; // 1 = Workout, 0 = Rest
    } else if (fitnessLevel === 'intermediate') {
      // Intermediate level: Two Days On, One Day Off (5 workout days)
      workoutDaysPattern = [1, 1, 0, 1, 1, 0, 0]; // 5 workout days, rest on Wednesday & weekend
    } else if (fitnessLevel === 'advanced') {
      // Advanced level: Three Days On, One Day Off (6 workout days)
      workoutDaysPattern = [1, 1, 1, 0, 1, 1, 1]; // 6 workout days, rest on Thursday
    }
  
    if (activityLevel === 'sedentary') {
      workoutDaysPattern = [1, 0, 0, 1, 0, 0, 1]; // 3 workouts, more rest
    }  else if (activityLevel === 'lightly_active') {
      workoutDaysPattern = [1, 0, 1, 0, 1, 0, 1]; // 4 workout days, balanced rest
    }else if (activityLevel === 'active') {
      workoutDaysPattern = [1, 1, 0, 1, 1, 0, 1]; // 5 workout days
    } else if (activityLevel === 'very_active') {
      workoutDaysPattern = [1, 1, 0, 1, 1, 0, 1]; // 6 workout days
    }
    
  
    // Distribute workouts over the week, incorporating deeper considerations
    for (let i = 0; i < 7; i++) {
      let daySchedule: { day: string, workouts: string[] } = { day: daysOfWeek[i], workouts: [] };
  
      if (workoutDaysPattern[i] === 1) {
        // Assign workouts based on the fitness goal and deeper considerations
        if (fitnessGoal === 'muscle_gain') {
          if (ageGroup === 'adolescent') {
            // For adolescents, focus on bodyweight and light resistance exercises
            daySchedule.workouts = this.getAdolescentMuscleGainWorkoutsForDay(i);
          } else {
            // For adults, heavy lifting is fine
            daySchedule.workouts = this.getMuscleGainWorkoutsForDay(i, ageGroup, gender, bmi);
          }
        }
        else if (fitnessGoal === 'weight_loss') {
          daySchedule.workouts = this.getWeightLossWorkoutsForDay(i, ageGroup, gender, bmi);
        } else if (fitnessGoal === 'endurance') {
          daySchedule.workouts = this.getEnduranceWorkoutsForDay(i, ageGroup, gender);
        } else if (fitnessGoal === 'maintenance') {
          daySchedule.workouts = this.getMaintenanceWorkoutsForDay(i, ageGroup, gender);
        }
      } else {
        daySchedule.workouts = ['Rest or Active Recovery']; // Rest day
      }
  
      schedule.push(daySchedule);
    }
  
    return schedule;
  }
  
  private getAdolescentMuscleGainWorkoutsForDay(dayIndex: number): string[] {
    // Focus on bodyweight and light resistance training for adolescents
    const bodyweightExercises = ['Push-ups', 'Pull-ups', 'Squats', 'Lunges', 'Planks'];
    const workouts = [`Bodyweight exercise: ${bodyweightExercises[dayIndex % bodyweightExercises.length]}`];
  
    return workouts;
  }
  

  // Adjusting workout selection to account for age and gender
  private getMuscleGainWorkoutsForDay(dayIndex: number, ageGroup: string, gender: string, bmi: number): string[] {
    let workoutFocus = gender === 'male' ? 'Heavy lifting' : 'Moderate strength training';

    if (ageGroup === 'adolescent') {
      workoutFocus = 'Bodyweight exercises';
    } else if (bmi >= 30) {
      workoutFocus = 'Low-impact strength training';
    }

    const muscleGroups = ['Chest', 'Back', 'Legs', 'Shoulders', 'Arms'];
    const workouts = [`${workoutFocus}: ${muscleGroups[dayIndex % muscleGroups.length]}`];
    return workouts;
  }

  private getWeightLossWorkoutsForDay(dayIndex: number, ageGroup: string, gender: string, bmi: number): string[] {
    let workoutFocus = 'Cardio and HIIT';

    if (ageGroup === 'senior') {
      workoutFocus = 'Low-impact cardio';
    } else if (gender === 'female') {
      workoutFocus = 'Mixed cardio and toning';
    }

    const workouts = [`${workoutFocus}`];
    return workouts;
  }

  private getEnduranceWorkoutsForDay(dayIndex: number, ageGroup: string, gender: string): string[] {
    return ['Long-distance Running', 'Cycling', 'Swimming'];
  }

  private getMaintenanceWorkoutsForDay(dayIndex: number, ageGroup: string, gender: string): string[] {
    const workouts = ['Mixed Cardio and Strength', 'Functional Training', 'Yoga/Pilates'];
    return [workouts[dayIndex % workouts.length]];
  }
  
}

