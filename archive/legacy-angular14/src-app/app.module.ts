import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { ConvertToSpacesPipe } from 'src/app/shared/convert-to-spaces.pipe';
import { CreateTaskComponent } from 'src/app/shared/create-task.component';
import { TaskListResolver } from 'src/app/shared/task-list-resolver.service';
import { TaskService } from 'src/app/shared/tasks.service';

import { AppComponent } from './app.component';
import { ErrorComponent } from './errors/error.component';
import { appRoutes } from './routes';
import { TableFilterPipe } from './task/task-filter.pipe';
import { TaskListComponent } from './task/task-list.component';
import { TaskDetailComponent } from './taskdetails/task-details.component';
import { TaskRouteActivator } from './taskdetails/taskroute-activator.service';
import { AuthService } from './user/auth.service';
import { UserModule } from "./user/user.module";


@NgModule({
    declarations: [
        AppComponent,
        TaskListComponent,
        TaskDetailComponent,
        ConvertToSpacesPipe,
        CreateTaskComponent,
        ErrorComponent,
        TableFilterPipe
    ],
    providers: [
        TaskService,
        TaskRouteActivator,
        TaskListResolver,
        AuthService,
        { provide: 'canDeactivateCreateTask', useValue: checkDirtyState }
    ],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        NgxPaginationModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forRoot(appRoutes),
        UserModule
    ]
})
export class AppModule { }

export function checkDirtyState(component:CreateTaskComponent) {
  if(component.isDirty)
  return window.confirm('You have not saved the task,Are you sure to exit the page?')
  return true
}