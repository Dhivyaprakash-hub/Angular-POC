import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { LoginComponent } from "./loginpage.component";
import { ProfileComponent } from "./profile.component";
import { userRoutes } from "./user.routes";

@NgModule({
    imports:[
        CommonModule,
        RouterModule.forChild(userRoutes),
        FormsModule,
        ReactiveFormsModule
    ],
    declarations:[
        ProfileComponent,
        LoginComponent
    ],
    providers:[]
})
export class UserModule{

}