import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
    templateUrl: './task-list.component.html',
    styleUrls: ['./task-list.component.css']
})

export class TaskListComponent implements OnInit{
    tasks: any
    titleName!: string;

    tasks1: any[]=[
        {taskNo:1,workType:'Task',titleName:'Scroll Bar Creation',createdDate:'12-Nov-2022',updatedDate:'14-Nov-2022',currentStatus:'ToDo'},
        {taskNo:2,workType:'Task',titleName:'Material Table Implementation',createdDate:'12-Nov-2022',updatedDate:'12-Nov-2022',currentStatus:'Completed'},
        {taskNo:3,workType:'Bug',titleName:'Color is not Matching',createdDate:'12-Nov-2022',updatedDate:'13-Nov-2022',currentStatus:'Completed'},
        {taskNo:4,workType:'Task',titleName:'Hover Action Implementation',createdDate:'11-Nov-2022',updatedDate:'12-Nov-2022',currentStatus:'ToDo'}
    ];
    constructor( private route:ActivatedRoute){
    }
    showForm: boolean=false;

    toggleForm(): void{
        this.showForm=!this.showForm;
    }
    deleteRow(product: any){
        const index = this.tasks.indexOf(product);
        this.tasks.splice(index, 1);
    }

    ngOnInit(){
        this.tasks = this.route.snapshot.data['tasks']
    }
}