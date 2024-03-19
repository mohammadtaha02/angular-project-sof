import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../services/users.service';
import { User } from '../model/user';

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
      const user = new User(
        this.registerForm.value.name,
        this.registerForm.value.email,
        this.registerForm.value.password,
        this.registerForm.value.gender === 'male',
        this.registerForm.value.birthdate
      )
      this.userService.register(user)
    } else {
      alert('Please fill out all the required fields correctly.')
    }
  }
  
}
