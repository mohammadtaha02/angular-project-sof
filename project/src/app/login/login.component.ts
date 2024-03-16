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
  constructor(private userService: UsersService, private formbuilder: FormBuilder, private router: Router){
    this.loginForm = this.formbuilder.group({
      email: new FormControl('',[Validators.email,Validators.required]),
      password: new FormControl('',[Validators.required])
    })
  }
  ngOnInit(): void {
  }
  login(){
    let users = this.userService.getUsers()
    let mail = this.loginForm.value.email
    let password = this.loginForm.value.password
    for(let user of users){
      if(user.getEmail()==mail && user.getPassword()==password){
          this.router.navigate(['profile', mail])
        return
      }
    }
    
  }
}
