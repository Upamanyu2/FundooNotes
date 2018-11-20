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
    noteLabels: Array<Object>
    userId: string
    labelIdList: [Object]
    noteCheckLists: Array<Object>
    questionAndAnswerNotes: Array<Object>
    collaborators: Array<Object>
}