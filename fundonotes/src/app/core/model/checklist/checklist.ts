import { Note } from '../notes/note';

export interface Checklists{
    createdDate: Date
    id: string
    isDeleted: boolean
    itemName: string
    modifiedDate: Date
    notesId: string
    status: string
}

// export class Checklist implements Checklists {
//     private id:String;
//     private createdDate:Date;
//     private isDeleted:Boolean;
//     private itemName: String;
//     private modifiedDate: Date;
//     private notesId: String;
//     private status: Boolean;

//     constructor(private note: Note){
//         this.notesId = note.id;
//     }

//     getList(){

//     }

//     addList(){

//     }

//     removeList(){
        
//     }

//     updateList(){
        
//     }

//     sortList(){
        
//     }
// } 