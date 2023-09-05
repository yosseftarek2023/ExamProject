import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {HttpClient} from '@angular/common/http'
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  form!:FormGroup;
  users:any[] = [];
  type:string = 'students'

  constructor(private _form:FormBuilder, private _service:AuthService, private _router:Router, private toaster:ToastrService){

  }
  
  ngOnInit(){

    this.form = this._form.group({
      email: ['',[Validators.required,Validators.email]],
      password: ['',[Validators.required]],
      selectedType:[this.type,[Validators.required]],
    })
    this.showUsers();

  }

  showUsers(){
      this._service.getUsers(this.type).subscribe((res:any)=>{
        this.users = res;
      })
    }

    getRole(event:any){
      this.type = event.target.value; 
      this.showUsers();
    }
  

  loginAccount(){

    let index = this.users.findIndex(item => item.email ==  this.form.value.email && item.password ==  this.form.value.password);
    if(index == -1){
      this.toaster.error("Wrong email of password !","",{
        disableTimeOut:false,
        titleClass:"toastr_title",
        messageClass:"toastr_message",
        timeOut:5000,
        closeButton:true
      })
    } else{
      const value = {
        username:this.users[index].name,
        userId:this.users[index].id,
        role:this.type,
      }
      this._service.loginForm(value).subscribe((res)=>{
        this._service.user.next(res);
        this.toaster.success("registered!!","",{
          disableTimeOut:false,
          titleClass:"toastr_title",
          messageClass:"toastr_message",
          timeOut:5000,
          closeButton:true
        })
        this._router.navigate(['/subjects']);
      })
    }
  }

}
