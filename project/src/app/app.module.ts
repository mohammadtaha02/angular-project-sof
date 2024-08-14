import { NgModule } from '@angular/core';
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
import { UpdateTrainingComponent } from './update-training/update-training.component';
import { ViewTrainingsComponent } from './view-training/view-training.component';
import { SearchTrainingComponent } from './search-training/search-training.component';
import { FilterTrainingComponent } from './filter-training/filter-training.component';
import { AddProductComponent } from './add-product/add-product.component';
import { UpdateProductComponent } from './update-product/update-product.component';
import { ViewProductsComponent } from './view-products/view-products.component';
import { SearchProductComponent } from './search-product/search-product.component';
import { FilterProductComponent } from './filter-product/filter-product.component';
import { SupplementsComponent } from './supplements/supplements.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TrainingDetailsComponent } from './training-details/training-details.component';
import { WorkoutComponent } from './workout/workout.component';
import { WorkoutListComponent } from './workout-list/workout-list.component';
import { WorkoutDetailsComponent } from './workout-details/workout-details.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'catalog', component: CatalogComponent },
  { path: 'profile', component: ProfileComponent,
  children:[
    {
      path:'',
      pathMatch:'full',
      redirectTo:'login'
    },
    {
      path:'login',
      component: LoginComponent
    },
    {
      path:'register',
      component: RegisterComponent
    },
    {
      path: 'user', 
      component: UserDetailsComponent
    },

  ]},
  { path: 'register', component: RegisterComponent},
  { path: 'subscribe', component: SubscribeComponent},
  { path: 'add-training', component: AddTrainingComponent },
  { path: 'update-training', component: UpdateTrainingComponent },
  { path: 'view-trainings', component: ViewTrainingsComponent },
  { path: 'search-training', component: SearchTrainingComponent },
  { path: 'filter-training', component: FilterTrainingComponent },
  { path: 'add-product', component: AddProductComponent },
  { path: 'update-product', component: UpdateProductComponent },
  { path: 'view-products', component: ViewProductsComponent },
  { path: 'search-product', component: SearchProductComponent },
  { path: 'filter-product', component: FilterProductComponent },
  { path: 'supplements', component: SupplementsComponent },
  { path: 'workouts', component: WorkoutComponent },
  { path: 'workouts/:id', component: WorkoutComponent },
  { path: 'training-details/:id', component: TrainingDetailsComponent },
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
    UpdateTrainingComponent,
    ViewTrainingsComponent,
    SearchTrainingComponent,
    FilterTrainingComponent,
    AddProductComponent,
    UpdateProductComponent,
    ViewProductsComponent,
    SearchProductComponent,
    FilterProductComponent,
    SupplementsComponent,
    TrainingDetailsComponent,
    WorkoutComponent,
    WorkoutListComponent,
    WorkoutDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
