import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  students:any[] = [];

  form!:FormGroup;

    constructor(private _form:FormBuilder, private _service:AuthService, private _router:Router, private toaster:ToastrService){

    }

    ngOnInit(){
      this.createForm();
      this.getStudents();
    }

    createForm(){
      this.form = this._form.group({
        name: ['',[Validators.required]],
        email: ['',[Validators.required,Validators.email]],
        password: ['',[Validators.required]],
        confirmPass: ['',[Validators.required]],
      })
    }

    getStudents(){
      this._service.getUsers('students').subscribe((res:any)=>{
        this.students = res;
      })
    }

    makeAccount(){
      const value = {
        name:this.form.value.name,
        email:this.form.value.email,
        password:this.form.value.password,
      }

      let index = this.students.findIndex(item => item.email ==  this.form.value.email);
      if(index !== -1){
        this.toaster.error("email registerd before !","",{
          disableTimeOut:false,
          titleClass:"toastr_title",
          messageClass:"toastr_message",
          timeOut:5000,
          closeButton:true
        })
      } else{
        this._service.sendForm(value).subscribe(()=>{
          this.toaster.success("registered!!","",{
            disableTimeOut:false,
            titleClass:"toastr_title",
            messageClass:"toastr_message",
            timeOut:5000,
            closeButton:true
          })
          this._router.navigate(['/login']);
        })
      }

    }

}
