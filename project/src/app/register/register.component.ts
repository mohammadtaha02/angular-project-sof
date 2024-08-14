import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm!: FormGroup;

  constructor(private userService: UsersService, private formBuilder: FormBuilder, private router: Router) {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')]],
      password: ['', Validators.required],
      passwordValidation: ['', Validators.required],
      gender: ['', Validators.required],
      birthdate: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const mail = this.registerForm.value.email;
      const password = this.registerForm.value.password;
      const name = this.registerForm.value.name;
      const gender = this.registerForm.value.gender === 'male' ? true : false;
      const birthdate = this.registerForm.value.birthdate;
      this.userService.register(mail, password, name, gender, birthdate);
      this.router.navigateByUrl('profile/login');
    } else {
      alert('Please fill out all the required fields correctly.');
    }
  }
  
  
}
