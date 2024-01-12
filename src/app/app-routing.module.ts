import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutPageComponent } from './about-page/about-page.component';
import { LoginComponent } from './login/login.component';
import {KindergartenListComponent} from './kindergarten-list/kindergarten-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'login', component: LoginComponent, data: { title: 'ANMELDUNG' } },
  { path: 'kindergarten-list', component: KindergartenListComponent, data: { title: 'KINDERGÄRTEN ENTDECKEN' } },
  { path: 'dashboard', component: DashboardComponent, data: { title: 'STARTSEITE' } },
  { path: 'about', component: AboutPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
