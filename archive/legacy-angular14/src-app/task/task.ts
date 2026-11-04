export interface ITask{
    taskNo:number;
    workType:string;
    titleName:string;
    createdDate:string | Date;
    updatedDate:string | Date;
    currentStatus:string;
}
