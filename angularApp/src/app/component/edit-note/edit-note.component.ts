import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { NoteserviceService } from 'src/app/services/noteservice.service';
import { Note } from 'src/app/model/note.model';
import { NoteDTO } from 'src/app/model/NoteDto.model';

@Component({
  selector: 'app-edit-note',
  templateUrl: './edit-note.component.html',
  styleUrls: ['./edit-note.component.scss']
})
export class EditNoteComponent implements OnInit {
note: Note;
  constructor(public dialogRef: MatDialogRef<EditNoteComponent>,
              @Inject(MAT_DIALOG_DATA)private  data: Note,
              private noteService: NoteserviceService,
              private snackBar: MatSnackBar

) {
  this.dialogRef.addPanelClass('create-dialog');
  console.log(' edit note compnent' + this.data);
  this.note = data;
  console.log(this.note.description);
 }

  ngOnInit() {
  }
  onSubmit(): void {
    console.log(this.note.description + this.note.title);

    this.noteService.updateNote(this.note).subscribe((response: any) => {
        this.snackBar.open(response.message, '', {duration: 2000, verticalPosition: 'top'});
    });
    this.dialogRef.close();
  }
}
