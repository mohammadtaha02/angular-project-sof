import { Component } from '@angular/core';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent {
  contact = {
    name: '',
    email: '',
    phone: '',
    message: ''
  };

  onSubmit() {
    // לוגיקה לטיפול בהודעה או שליחה לשרת
    console.log('Contact Form Submitted:', this.contact);
  }
}
