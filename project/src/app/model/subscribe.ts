export class SubscribeModel {
  userEmail: string;
  start_date: Date;
  end_date: Date;
  is_active: boolean;
  age: number;
  height: number;
  weight: number;
  gender: string;
  fitness_goal: string;  
  fitness_level: string; 
  activity_level: string;
  card_number: any;
  cvv: any;
  expiration_date: any;

  constructor(
    userEmail: string,
    start_date: Date,
    end_date: Date,
    is_active: boolean,
    age: number,
    height: number,
    weight: number,
    gender: string,
    fitnessGoal: string,
    fitnessLevel: string,
    activityLevel: string
  ) {
    this.userEmail = userEmail;
    this.start_date = start_date;
    this.end_date = end_date;
    this.is_active = is_active;
    this.age = age;
    this.height = height;
    this.weight = weight;
    this.gender = gender;
    this.fitness_goal = fitnessGoal;
    this.fitness_level = fitnessLevel;
    this.activity_level = activityLevel;
  }
}
