import { Label } from "../label/label";
import { Checklists } from "../checklist/checklist";

export interface Note {
    title: string
    description: string
    color: string
    createdDate: Date
    modifiedDate: Date
    id:string
    imageUrl: string
    isArchived: boolean
    isDeleted: boolean
    isPined: boolean
    reminder: [Date]
    noteLabels: Array<Label>
    userId: string
    labelIdList: [Object]
    noteCheckLists: Array<Checklists>
    questionAndAnswerNotes: Array<Object>
    collaborators: Array<Object>
}