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
        if (!this.loginService?.createLogin) return;
        this.loginService.createLogin(this.login)
          .subscribe({ next: () => this.gotoList(), error: (error: any) => console.error('Unable to save login', error) });
      }
    gotoList() {
        this.submitted = false;
    }
    onSubmit() {
        this.submitted = true;
        this.save();

      }


}
