import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  loginForm !: FormGroup
  constructor(private userService: UsersService, private formbuilder: FormBuilder){
    this.loginForm = this.formbuilder.group({
      email: [''],
      password: ['']
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
        
        return
      }
    }
    
  }
}
