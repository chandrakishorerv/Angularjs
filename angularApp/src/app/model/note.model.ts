import { Label } from './label.model';

export class Note {
    noteId: any;
    title: any;
    description: any;
    colour: any;
    createdOn: any;
    updatedOn: any;
    inTrash: any;
    isArchive: any;
    isPinned: any;
    userId: any;
    remainder: any;
    listOfLabels: Label[];
}
