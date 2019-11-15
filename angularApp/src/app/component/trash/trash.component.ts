import { Component, OnInit } from '@angular/core';
import { Note } from 'src/app/model/note.model';
import { Router } from '@angular/router';
import { TrashserviceService } from 'src/app/services/trashservice.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.scss']
})
export class TrashComponent implements OnInit {
  private mynotes: Note[];
  private note: Note;
  constructor( private trashService: TrashserviceService,
               private router: Router,
               private snackBar: MatSnackBar) { }
  ngOnInit() {
    this.getNotes();
  }
  getNotes() {
    this.trashService.getNotes().subscribe(
      (data) => this.mynotes = data
    );
  }

  untrashNote(note: Note) {
    this.note = note;
    this.trashService.reStoreNote(this.note).subscribe((response: any) => {

        this.snackBar.open(response.message, '', { duration: 2000, verticalPosition: 'top' });
        this.getNotes();
    }
  );
  }

}
