import { Routes } from "@angular/router";
import { CreateTaskComponent } from "src/app/shared/create-task.component";
import { TaskListResolver } from "src/app/shared/task-list-resolver.service";
import { AppComponent } from "./app.component";
import { ErrorComponent } from "./errors/error.component";
import { TaskListComponent } from "./task/task-list.component";
import { TaskDetailComponent } from "./taskdetails/task-details.component";
import { TaskRouteActivator } from "./taskdetails/taskroute-activator.service";

export const appRoutes:Routes= [
    {path: 'tasks/new', component: CreateTaskComponent, canDeactivate:['canDeactivateCreateTask']},
    {path: 'tasks', component: TaskListComponent, resolve:{tasks:TaskListResolver} },
    {path: 'tasks/:taskNo', component: TaskDetailComponent, canActivate: [TaskRouteActivator]},
    {path:'404', component:ErrorComponent},
    {path:'blank-page', component:AppComponent},
    {path:'blank-page1', component:AppComponent},
    {path: '', redirectTo: '/tasks', pathMatch:'full'},
    {
        path:'user', 
        loadChildren:() => import ( './user/user.module')
        .then(m => m.UserModule)
    }
]