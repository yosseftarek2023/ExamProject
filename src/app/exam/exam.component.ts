import { Component,OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {MatStepper} from '@angular/material/stepper';
import { ToastrService } from 'ngx-toastr';
import { TeacherService } from '../teacher.service';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.scss']
})
export class ExamComponent {
name = new FormControl("");
questionForm! : FormGroup
questions:any[] = [];
correctNum:any;
starting:boolean = false;
subjectName = "";
stepperIndex = 0;
preview:boolean = false;
id:any;
constructor( private _form:FormBuilder, private _toast:ToastrService, private teacher:TeacherService){
}
ngOnInit():void{
  this.createForm();
}
createForm(){
  this.questionForm = this._form.group({
    question:['',Validators.required],
    answer1:['',Validators.required],
    answer2:['',Validators.required],
    answer3:['',Validators.required],
    answer4:['',Validators.required],
    correctAns:[''],
  })
}


createQuestion(){
  if(this.correctNum){
    const model = {
      question: this.questionForm.value.question,
      answer1: this.questionForm.value.answer1,
      answer2: this.questionForm.value.answer2,
      answer3: this.questionForm.value.answer3,
      answer4: this.questionForm.value.answer4,
      correctAns: this.questionForm.value[this.correctNum],
    }
    this.questions.push(model);
    this.questionForm.reset();
  }else{
    this._toast.error("  يرجى اختيار الاجابة الصحيحة")
  }
  console.log(this.questions);  
}

getCorrect(event:any){
  this.correctNum = event.value; 
  console.log(event.value);
}

start(){
  if(this.name.value == ""){
    this._toast.error("يرجى كتابة اسم المادة");
  }else{
    this.subjectName = this.name.value as string;
    this.starting =true;
}
if(this.starting){
  this.stepperIndex = 1;
}
}

removeForm(){
  this.questionForm.reset();
}
cancelForm(){
  this.questionForm.reset();
  this.questions =[];
  this.subjectName = "";
  this.name.reset();
  this.starting = false;
  this.stepperIndex = 0;
}


submit(){
  const model = {
    name:this.subjectName,
    questions:this.questions,
  }

  if(this.preview){
    this.stepperIndex = 2;
  }else{
    this.teacher.createSubject(model).subscribe((res:any)=>{
      this.preview = true;
      this.id = res.id;
    })
  }
}

delete(index:number){
  this.questions.splice(index,1);
  const model = {
    name:this.subjectName,
    questions:this.questions,
  }
  this.teacher.updateSubject(model,this.id).subscribe((res)=>{
    this._toast.success("تم الحذف يبشا");
  });
}
}
