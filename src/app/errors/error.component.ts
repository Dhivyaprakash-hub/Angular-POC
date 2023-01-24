import { Component } from "@angular/core";

@Component({
    template:`
    <h1 class="errorMessage">404'd</h1>
    `,
    styles:[`
    .errorMessage{
        margin-top:100px;
        font-size: 150px;
        text-align: center
    }
    `]
})
export class ErrorComponent{
    constructor(){
        
    }
}