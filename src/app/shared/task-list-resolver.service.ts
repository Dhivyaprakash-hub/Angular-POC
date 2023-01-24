import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";
import { map } from "rxjs";
import { TaskService } from "./tasks.service";

@Injectable()
export class TaskListResolver implements Resolve<any>{
    constructor(private taskService:TaskService){

    }   
    resolve() {
        return this.taskService.getTasks().pipe(map(tasks => tasks))
    }
}