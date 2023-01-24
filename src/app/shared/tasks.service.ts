import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable()
    export class TaskService{
        getTasks(){
            let subject=new Subject()
            setTimeout(()=> {subject.next(TASKS); subject.complete();},100)
            return subject
        }

        getTask(taskNo:number){
            return TASKS.find(task => task.taskNo === taskNo)
        }
        saveTask(task:any){
            task.taskNo=10
            task.session=[]
            TASKS.push(task)
        }
    }

const TASKS =[
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