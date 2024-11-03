import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent {
  constructor(private http: HttpClient) {}
  contact = {
    name: '',
    email: '',
    phone: '',
    message: ''
  };
  

  onSubmit() {
    const url = 'http://localhost/backend/php/contact-us.php';
    this.http.post(url, this.contact).subscribe(
      (response: any) => {
        console.log('Contact Form Submitted:', response);
        if (response.status === 'success') {
          alert('Your message has been sent successfully!');
        } else {
          alert('There was an error sending your message. Please try again.');
        }
      },
      (error: any) => {
        console.error('Error sending message:', error);
        alert('There was an error sending your message. Please try again.');
      }
    );
  }
}
