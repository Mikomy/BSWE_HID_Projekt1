import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { DataComponent } from './login/data/data.component';
import { AddDataComponent } from './login/add-data/add-data.component';
import { HeaderComponent } from './header/header.component';
import { ButtonComponent } from './login/button/button.component';
import { PaginationPipe } from './login/data/pagination.pipe';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {KindergartenListComponent} from './kindergarten-list/kindergarten-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FooterComponent } from './footer/footer.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    AddDataComponent,
    DataComponent,
    HeaderComponent,
    ButtonComponent,
    KindergartenListComponent,
    PaginationPipe,
    FooterComponent,
    LoadingSpinnerComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatPaginatorModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatSortModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }