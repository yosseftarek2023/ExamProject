import { Component,OnInit } from '@angular/core';
import { TeacherService } from '../teacher.service';
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss']
})
export class SubjectsComponent {
  subject:any[]=[];
  user:any = {};  
  constructor(private service:TeacherService, private auth:AuthService, private toast:ToastrService){
  }

  ngOnInit(){
    this.getSubjects();
    this.getUser();
  }

  getSubjects(){
    this.service.getAllSubjects().subscribe((res:any)=>{
      this.subject = res;
    })
  }
  getUser(){
    this.auth.getRole().subscribe((res)=>{
      this.user = res;
    })
  }

  deleteSubject(index:number){
    let id = this.subject[index].id;
    this.subject.splice(index,1);
    this.service.deleteSub(id).subscribe(()=>{
      this.toast.success("تم الحدف يبشا");
    })
  }

}
