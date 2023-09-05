import { Component,OnInit } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
   constructor(private _auth:AuthService){
   }
   ngOnInit(){
    this.getUserData();
   }
  title = 'ExamProject';
  getUserData(){
    this._auth.getRole().subscribe((res)=>{
      this._auth.user.next(res);
    })
  }
}
