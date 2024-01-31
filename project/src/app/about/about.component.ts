import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  darkMode: boolean = false;

  Name1: string = 'Mhmd Hsn';
  ID1: string = '213679558';
  img1: string = "assets/pic1.jpg";

  Name2: string = 'Mhmd Taha';
  ID2: string = '213013378';
  img2: string = "assets/pic2.jpg";
  constructor() { }

  ngOnInit(): void {
  }

  DarkWhite() {
    this.darkMode = !this.darkMode;
    
  }
}