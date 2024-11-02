import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { CatalogComponent } from './catalog/catalog.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ProductsComponent } from './products/products.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { HttpClientModule } from '@angular/common/http';
import { SubscribeComponent } from './subscribe/subscribe.component';
import { AddTrainingComponent } from './add-training/add-training.component';
import { ViewTrainingsComponent } from './view-training/view-training.component';
import { AddProductComponent } from './add-product/add-product.component';
import { SupplementsComponent } from './supplements/supplements.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TrainingDetailsComponent } from './training-details/training-details.component';
import { WorkoutComponent } from './workout/workout.component';
import { WorkoutListComponent } from './workout-list/workout-list.component';
import { WorkoutDetailsComponent } from './workout-details/workout-details.component';
import { CartComponent } from './cart/cart.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { PurchaseModalComponent } from './purchase-modal/purchase-modal.component';



const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'catalog', component: CatalogComponent },
  { path: 'profile', component: ProfileComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login'
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'register',
        component: RegisterComponent
      },
      {
        path: 'user', 
        component: UserDetailsComponent,
      },
      {
        path: 'workout-plan',  // Add this route for Workout Plan & Schedule
        component: PlanComponent
      },
      {
        path: 'workouts',  // Future route for Actual Workouts
        component: WorkoutComponent  // Placeholder until implemented
      },
      {
        path: 'actual-workouts', 
        component: ActualWorkoutsComponent 
      }
    ]},
  { path: 'register', component: RegisterComponent},
  { path: 'subscribe', component: SubscribeComponent},
  { path: 'contact-us', component: ContactUsComponent},
  { path: 'add-training', component: AddTrainingComponent },
  { path: 'view-trainings', component: ViewTrainingsComponent },
  { path: 'add-product', component: AddProductComponent },
  { path: 'supplements', component: SupplementsComponent },
  { path: 'workouts', component: WorkoutComponent },
  { path: 'workouts/:id', component: WorkoutComponent },
  { path: 'training-details/:id', component: TrainingDetailsComponent },
  { path: 'cart', component: CartComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    AboutComponent,
    HomeComponent,
    CatalogComponent,
    SidebarComponent,
    ProductsComponent,
    NotFoundComponent,
    LoginComponent,
    UserDetailsComponent,
    RegisterComponent,
    ProfileComponent,
    SubscribeComponent,
    AddTrainingComponent,
    ViewTrainingsComponent,
    AddProductComponent,
    SupplementsComponent,
    TrainingDetailsComponent,
    WorkoutComponent,
    WorkoutListComponent,
    WorkoutDetailsComponent,
    CartComponent,
    PurchaseModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    NgbDropdownModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
