import { Component } from "@angular/core";
import { TaskService } from "src/app/shared/tasks.service";
import { ActivatedRoute } from "@angular/router";
import { AuthService } from "../user/auth.service";

@Component({
   selector:'task-details',
   templateUrl: './task-details.component.html',
   styles:[`
   .container{padding-left:20px; padding-right:200px;}
   .center-aligned {
    text-align: center;}
   `]
})

export class TaskDetailComponent{
   task:any
   products: any;
auth: any;
   
   constructor(private taskService:TaskService, private route:ActivatedRoute){
   }
   ngOnInit(){
      this.task=this.taskService.getTask(
         +this.route.snapshot.params['taskNo'])
   }
}