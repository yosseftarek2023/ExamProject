import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private  _http:HttpClient) { }
  user = new Subject();

  sendForm(value:any){
    return this._http.post(`http://localhost:3000/students`,value);
  }
  loginForm(value:any){
    return this._http.put(`http://localhost:3000/logins/1`,value);
  }
  getUsers(type:any){
    return this._http.get(`http://localhost:3000/` + type);
  }
  getStudent(id:number){
    return this._http.get("http://localhost:3000/students/"+id);
  }
  updateStudent(id:number,model:any){
    return this._http.put("http://localhost:3000/students/"+id,model);
  }
  getRole(){
    return this._http.get(`http://localhost:3000/logins/1`);
  }
}
