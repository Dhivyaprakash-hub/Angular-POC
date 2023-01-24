import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class LoginService{
    loginService: any;
    submitted: boolean | undefined;
    login: any;
    newLogin(): void {
        this.submitted = false;
      }
    
      save() {
        this.loginService.createLogin(this.login)
          .subscribe((data: any) => console.log(data), (error: any) => console.log(error));
        this.gotoList();
      }
    gotoList() {
        throw new Error("Method not implemented.");
    }
    onSubmit() {
        this.submitted = true;
        this.save();
        
      }
    
    
}