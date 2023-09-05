import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ExamComponent } from './exam/exam.component';
import { SubjectsComponent } from './subjects/subjects.component';
import { StudentExamComponent } from './student-exam/student-exam.component';
import { ResultsComponent } from './results/results.component';

const routes: Routes = [
  {path:'', redirectTo:'register',pathMatch:'full'},
  {path:'register',component:RegisterComponent},
  {path:'login',component:LoginComponent},
  {path:'exam/:id',component:StudentExamComponent},
  {path:'subjects',component:SubjectsComponent},
  {path:'new-exam',component:ExamComponent},
  {path:'results',component:ResultsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
