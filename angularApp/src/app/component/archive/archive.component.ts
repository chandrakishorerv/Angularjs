import { Component, OnInit } from '@angular/core';
import { Note } from 'src/app/model/note.model';
import { TrashserviceService } from 'src/app/services/trashservice.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent implements OnInit {
  private mynotes: Note[];
  private note: Note;
  constructor(private trashService: TrashserviceService,
              private router: Router,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
   this.getNotes();
  }
  getNotes() {
    this.trashService.getArchiveNotes().subscribe(
      (data) => this.mynotes = data
    );
  }
  unarchiveNote(note: Note) {
    this.note = note;
    this.trashService.unarchiveNote(this.note).subscribe((response: any) => {

        this.snackBar.open(response.message, '', { duration: 2000, verticalPosition: 'top' });
        this.getNotes();
    }
  );
  }

}
