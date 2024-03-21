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
        if (sessionStorage.getItem('currentUser')) {
          const userEmail = sessionStorage.getItem('currentUser');
          if (userEmail) {
            this.user = this.userService.exists(userEmail);
            if(this.user!=null){
              this.loggedIn = true;
            }
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
      sessionStorage.removeItem('currentUser')
      this.router.navigateByUrl('profile/login')
    }
}
