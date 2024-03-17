import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm !: FormGroup
  constructor(private userService: UsersService, private formbuilder: FormBuilder, 
    private router: Router){
    this.registerForm = this.formbuilder.group({
      name : ['', Validators.required],
      email: ['', Validators.compose([Validators.email, Validators.required])],
      password: ['', Validators.required],
      passwordValidation: ['', Validators.required],
      gender: ['', Validators.required],
      birthdate: ['', Validators.required]
    })
  }
  register(){
    let mail = this.registerForm.value.email
    let name = this.registerForm.value.name
    let password = this.registerForm.value.password
    let gender = this.registerForm.value.gender
    let birthDate = this.registerForm.value.birthDate
    const day = birthDate.getDate()
    const month = birthDate.getMonth()
    const year = birthDate.getFullYear()
    birthDate = `${day}/${month}/${year}`
    let res = this.userService.addUser(mail,name,password,gender,birthDate)
    this.router.navigateByUrl('profile/login')
    if(!res) alert("EMAIL ADDRESS ALREADY EXISTS")
  }
}
