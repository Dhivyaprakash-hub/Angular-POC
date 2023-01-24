import { Component } from "@angular/core";
import { AuthService } from "./auth.service";
import {Router} from '@angular/router'

@Component({
  selector: 'app-header',
  templateUrl: './loginpage.component.html',
  styles:[`
  em {float:right; color:#E05C65; padding-left:10px;}
  `]
})

export class LoginComponent{
  userName: any
  password: any
  constructor(private authService:AuthService,private router:Router){

  }

  login(formValues: any){
    this.authService.loginUser(formValues.userName,formValues.password)
    this.router.navigate(['tasks'])
  }

  cancel(){
    this.router.navigate(['tasks'])
  }
}