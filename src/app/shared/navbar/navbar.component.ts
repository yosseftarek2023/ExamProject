import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor(private _auth:AuthService ,private router:Router){
  }
user:any = null;
ngOnInit(){
  this._auth.user.subscribe((res:any)=>{
    if(res.role){
      this.user = res;
      console.log(this.user);
    }
  })
}
logOut(){
  const model = {};
  this._auth.loginForm(model).subscribe((res)=>{
    this.user = null;
    this._auth.user.next(res);
    this.router.navigate(['/login']);

  })
}
}
