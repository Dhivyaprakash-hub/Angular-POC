import { Injectable } from "@angular/core";
import {IUser} from './user.model'

@Injectable()
export class AuthService{
    currentUser!: IUser
    loginUser(userName: string, _password:string){
        if (!userName?.trim()) throw new Error('A username is required');
        this.currentUser={
            taskNo:1,
            userName: userName.trim(),
            firstName: 'firstName',
            lastName: 'N'
        }
    }

    isAuthenticated(){
        return !!this.currentUser;
    }

    updateCurrentUser(firstName:string,lastName:string){
        this.currentUser.firstName=firstName
        this.currentUser.lastName=lastName
    }
}
