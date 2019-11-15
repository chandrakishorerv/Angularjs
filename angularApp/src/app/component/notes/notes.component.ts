import { Component, OnInit } from '@angular/core';
import { Note } from 'src/app/model/note.model';
import { Router } from '@angular/router';
import { MatSnackBar, MatDialog, MatDialogRef } from '@angular/material';
import { NoteserviceService } from 'src/app/services/noteservice.service';
import { NoteDTO } from 'src/app/model/NoteDto.model';
import { ScrollDispatcher } from '@angular/cdk/scrolling';
import { EditNoteComponent } from '../edit-note/edit-note.component';
import { LabelserviceService } from 'src/app/services/labelservice.service';
import { Label } from 'src/app/model/label.model';
@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {
  private mynotes: Note[];
  private labels: Label[];
  private expand: any = false;
  private note: Note;
  private colour: string;
  private noteObject = new NoteDTO();
  labelid: number;
  noteId: number;
  private changeView: boolean;
  dialogRef: MatDialogRef <any> ;
  private colorsPallete: string[][] =
  [['white', 'lightblue', 'lightcoral', 'lightgray'],
  ['lightgreen', 'lightpink', 'lightsalmon', 'lightyellow'],
  ['lightcyan', 'lightskyblue', 'lightseagreen', 'tan']];
  constructor(private noteService: NoteserviceService,
              private labelService: LabelserviceService,
              private router: Router,
              private snackBar: MatSnackBar,
              private scrollDispatcher: ScrollDispatcher,
              private dialog: MatDialog) {
                this.getNotes();
                this.getLabels();
                this.changeView = false;
               }

  ngOnInit() {
    console.log('hello to note');
  }
  getNotes() {
    this.noteService.getNotes().subscribe(
      (data) => this.mynotes = data
    );
  }
  getLabels() {
    this.labelService.getLabels().subscribe(
      (data) => this.labels = data
    );
  }
  expandIt() {
    this.expand = true;

  }
  closeCreateBar(title: string, desc: string) {
    this.expand = false;
    this.noteObject.title = title;
    this.noteObject.description = desc;
    console.log(title);
    console.log(desc);
    if (this.noteObject.title !== '' || this.noteObject.description !== '') {
      this.noteService.createNote(this.noteObject)
        .subscribe((response: any) => {
          if (response.statusCode === 201) {
            // this.noteService.changeUpdate(false, false);
            this.snackBar.open(response.message, '', { duration: 2000, verticalPosition: 'top' });
            this.getNotes();
          } else {
            // this.noteService.changeUpdate(false, false);
            this.snackBar.open(response.message, '', { duration: 2000, verticalPosition: 'top' });
          }
        });
    } else {
      console.log('error is here');
    }

  }
  openDialog(note: Note) {
    console.log('dialog box is  ' + note.noteId);
    const dialogRef = this.dialog.open(EditNoteComponent, {
      height: '40%',
      width: '40%',
      data: note
    });
    dialogRef.afterClosed().subscribe(result => {
      this.noteService.getNotes().subscribe(
        (data) => this.mynotes = data
      );
    });
  }


  deleteNote(note: Note) {
    this.note = note;
    console.log(this.note.noteId);
    this.noteService.deleteNote(this.note).subscribe((response: any) => {
      if (response.statusCode === 200) {
        this.snackBar.open(response.message, '', { duration: 2000, verticalPosition: 'top' });
        this.getNotes();
      }
    }
  );
  }
  archiveNote(note: Note) {
    this.note = note;
    this.noteService.archiveNote(this.note).subscribe((response: any) => {
      if (response.statusCode === 200) {
        this.snackBar.open(response.message, '', { duration: 2000, verticalPosition: 'top' });
        this.getNotes();
      }
    }
  );
  }
  addlabelnote(labelid , noteId) {
console.log(labelid, noteId);
this.labelid = labelid;
this.noteId = noteId;
this.noteService.addlabelnote(this.labelid, this.noteId).subscribe((response: any) => {
  if (response.statusCode === 200) {
    this.snackBar.open(response.message, '', { duration: 2000, verticalPosition: 'top' });
    this.getNotes();
  }
}
);
  }

  addColour(colour, note) {
    this.colour = colour;
    this.note = note;
    console.log(this.colour);
    this.noteService.addcolour(this.colour, this.note).subscribe((response: any) => {
      if (response.statusCode === 200) {
        this.snackBar.open(response.message, '', { duration: 2000, verticalPosition: 'top' });
      }
      this.getNotes();
    }
    );
  }


}
