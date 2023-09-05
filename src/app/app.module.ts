import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SharedModule } from './shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { ExamComponent } from './exam/exam.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SubjectsComponent } from './subjects/subjects.component';
import {MatStepperModule} from '@angular/material/stepper';
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatRadioModule } from '@angular/material/radio';
import { StudentExamComponent } from './student-exam/student-exam.component';
import { ResultsComponent } from './results/results.component';
import { MatTableModule } from '@angular/material/table'  


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ExamComponent,
    StudentExamComponent,
    SubjectsComponent,
    ResultsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    MatStepperModule,
    MatInputModule,
    MatButtonModule,
    MatRadioModule,
    MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
