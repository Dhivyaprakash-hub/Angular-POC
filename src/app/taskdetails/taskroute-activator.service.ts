import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router } from "@angular/router";
import { TaskService } from "src/app/shared/tasks.service";

@Injectable()
export class TaskRouteActivator implements CanActivate{
    constructor(private taskService:TaskService, private router:Router){
        
    }
    canActivate(route: ActivatedRouteSnapshot) {
        const taskExists= !!this.taskService.getTask(+route.params['taskNo'])

        if(!taskExists)
        this.router.navigate(['/404'])
        return taskExists
    }
}