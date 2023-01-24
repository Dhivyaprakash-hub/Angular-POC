import { Component } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { TaskService } from "./tasks.service";

@Component({
    templateUrl: './create-task.component.html',
    styleUrls:['./create-task.component.css']
})

export class CreateTaskComponent{
    newTask: any
    isDirty: boolean=true
    constructor(private router: Router,private taskService:TaskService){

    }

    saveTask(formValues: any){
        this.taskService.saveTask(formValues)
        this.isDirty= false
        this.router.navigate(['/tasks'])
    }


    cancel(){
        this.router.navigate(['/tasks'])
    }

}