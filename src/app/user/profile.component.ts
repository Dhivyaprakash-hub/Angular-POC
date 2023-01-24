import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "./auth.service";

@Component({
    templateUrl: './profile.component.html',
    styles:[`
    .error input {background-color: #E3C3C5}
    .error ::-moz-placeholder {color:#999}
    `]
})
export class ProfileComponent implements OnInit{
    profileForm!: FormGroup
    private firstName!:FormControl
    private lastName!:FormControl

    constructor(private router:Router,private authService:AuthService){

    }

    ngOnInit(){
         this.firstName=new FormControl
           (this.authService.currentUser.firstName, Validators.required)
         this.lastName=new FormControl
           (this.authService.currentUser.lastName, Validators.required)
        
        this.profileForm= new FormGroup({
            firstName: this.firstName,
            lastName: this.lastName
        })
    }

    saveProfile(formValues:any){
        if(this.profileForm.valid){
        this.authService.updateCurrentUser(formValues.firstName,
            formValues.lastName)
            this.router.navigate(['tasks'])
    }
}

validateFirstName(){
    return this.firstName.valid || this.firstName.touched
 }

validateLastName(){
   return this.lastName.valid || this.lastName.touched
}
    cancel(){
        this.router.navigate(['tasks'])
    }
}