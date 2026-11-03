import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { ITask } from "../task/task";

@Injectable()
    export class TaskService{
        getTasks(){
            let subject=new Subject<ITask[]>()
            setTimeout(()=> {subject.next(TASKS); subject.complete();},100)
            return subject
        }

        getTask(taskNo:number){
            return TASKS.find(task => task.taskNo === taskNo)
        }
        saveTask(task: Omit<ITask, 'taskNo'> & { taskNo?: number }){
            const nextId = Math.max(0, ...TASKS.map(existing => existing.taskNo)) + 1;
            TASKS.push({ ...task, taskNo: nextId } as ITask)
        }
    }

const TASKS: ITask[] =[
    {
        "taskNo":1,
        "workType":"Task",
        "titleName":"Scroll Bar Creation",
        "createdDate":"12-Nov-2022",
        "updatedDate":"14-Nov-2022",
        "currentStatus":"ToDo"
    },
    {
        "taskNo":2,
        "workType":"Task",
        "titleName":"Material Table Implementation",
        "createdDate":"12-Nov-2022",
        "updatedDate":"12-Nov-2022",
        "currentStatus":"Completed"
    },
    {
        "taskNo":3,
        "workType":"Bug",
        "titleName":"Color is not Matching",
        "createdDate":"12-Nov-2022",
        "updatedDate":"13-Nov-2022",
        "currentStatus":"Completed"
    },
    {
        "taskNo":4,
        "workType":"Task",
        "titleName":"Hover Action Implementation",
        "createdDate":"11-Nov-2022",
        "updatedDate":"12-Nov-2022",
        "currentStatus":"ToDo"
    }
]
