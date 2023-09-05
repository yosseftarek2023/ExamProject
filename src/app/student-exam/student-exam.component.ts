import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TeacherService } from '../teacher.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-student-exam',
  templateUrl: './student-exam.component.html',
  styleUrls: ['./student-exam.component.scss']
})
export class StudentExamComponent {
  id:any;
  subject:any;
  user:any;
  result:number = 0;
  showRes:boolean = false;
  studentInfo:any;
  userSubject:any[]=[];
  allowed:boolean = true;
constructor(private route:ActivatedRoute, private service:TeacherService, private toast:ToastrService, private auth:AuthService){
  this.id = this.route.snapshot.paramMap.get("id");
  this.getSubject();
  this.getUser();
}
ngOnInit():void{
}

getSubject(){
return this.service.getSubjectById(this.id).subscribe((res)=>{
this.subject = res;
})
}
delete(index:number){
  this.subject.questions.splice(index,1);
  const model = {
    name:this.subject.name,
    questions:this.subject.questions,
  }
  this.service.updateSubject(model,this.id).subscribe((res)=>{
    this.toast.success("تم الحذف يبشا");
  });
}

getUser(){
  this.auth.getRole().subscribe((res)=>{
    this.user = res;
    this.getUserData();
  })
}

getUserData(){
  this.auth.getStudent(this.user.userId).subscribe((res:any)=>{
    this.studentInfo = res;
    this.userSubject = res?.subject? res?.subject: [];
    this.checkExam();
  })
}

getAnswer(event:any){
let value = event.value,
questionIndex = event.source.name;
this.subject.questions[questionIndex].studentAns = value;
}

checkExam(){
  for(let x in this.userSubject){
    if(this.userSubject[x].id == this.id){
      this.result = this.userSubject[x].degree;
      this.allowed = false;
    }
  }
  console.log(this.allowed);
}

showResult(){
  for(const question of this.subject.questions){
    if(question.studentAns == question.correctAns){
      this.result +=1;
    }
  }
  this.showRes = true;
  this.userSubject.push({
    name:this.subject.name,
    id:this.id,
    degree:this.result
  })
  const model = {
    name: this.studentInfo.name,
    email: this.studentInfo.email,
    password:this.studentInfo.password,
    subject:this.userSubject,
  }
  this.auth.updateStudent(this.user.userId,model).subscribe((res)=>{
    this.toast.success("تم التسجيل يبشااا")
  })

}



}
