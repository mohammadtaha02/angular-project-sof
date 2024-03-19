import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../services/users.service';
import { User } from '../model/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  loggedIn : boolean = false
  user !: any;
  constructor(private router: Router, private userService : UsersService){}
  ngOnInit(): void {
    this.router.events.subscribe((val:any)=>{
      if(val.url){
        if (sessionStorage.getItem('user')) {
          const userEmail = sessionStorage.getItem('user');
          if (userEmail) {
            this.userService.getUsers().subscribe(
              (data:User[])=>{
                if(this.userService.exists(userEmail)){
                  this.user = data
                }
              })
            this.loggedIn = true;
          }
        }
      }
    })
   }

  openHome() {
    this.router.navigate(['/home']);
    }
    logout(){
      this.loggedIn = false
      sessionStorage.removeItem('user')
      this.router.navigateByUrl('profile/login')
    }
}
