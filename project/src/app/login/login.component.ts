import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  loginForm !: FormGroup
  constructor(private userService: UsersService, private formbuilder: FormBuilder, 
    private router: Router){
    this.loginForm = this.formbuilder.group({
      email: new FormControl('',[Validators.email,Validators.required,Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')]),
      password: new FormControl('',[Validators.required])
    })
  }
  ngOnInit(): void {
  }
  onSubmit() {
    if (this.loginForm.valid) {
      const mail = this.loginForm.value.email;
      const password = this.loginForm.value.password;
      this.userService.exists(mail).subscribe(user => {
        if (user != null && user.password == password) {
          this.userService.login(mail, password);
          this.router.navigateByUrl('profile/user');
        } else {
          alert('Invalid Email Address Or Password');
        }
      });
    }
  }
}
