import { Component, OnInit , Injector} from '@angular/core';
import { Supplement } from '../model/supplements';
import { SupplementsService } from '../services/supplements.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  movie : Supplement [] = [] 
  constructor(private injector: Injector) {}

  ngOnInit(): void {
    const moviesService = this.injector.get(SupplementsService);
    this.movie = moviesService.getSupplements();
  }
}