import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormGroup, FormBuilder, FormControl, NgForm, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { LabelserviceService } from 'src/app/services/labelservice.service';
import { Label } from 'src/app/model/label.model';
import { MatSnackBar, MatDialog, MatDialogRef } from '@angular/material';
import { EditLabelComponent } from '../edit-label/edit-label.component';
import { NoteserviceService } from 'src/app/services/noteservice.service';
import { Note } from 'src/app/model/note.model';
import { Search } from 'src/app/model/search.model';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  private labels: Label[];
  private notes: Note[];
  private search = new Search();

  // localStorage.getItem("token");
  constructor(private labelService: LabelserviceService,
              private noteService: NoteserviceService,
              private router: Router,
              private snackBar: MatSnackBar,
              private dialog: MatDialog
              ) {
  }
  ngOnInit() {
    this.getLabels();
  }
  getLabels() {
    this.labelService.getLabels().subscribe(
      (data) => this.labels = data
    );
  }
  logout() {
    localStorage.clear();
    this.router.navigateByUrl('login');
  }
  openLabelDialog(lables: Label[]) {
    console.log('dialog box for label edit,create  ' );
    const dialogRef = this.dialog.open(EditLabelComponent, {
      height: '40%',
      width: '25%',
      data: lables
    });
    dialogRef.afterClosed().subscribe(result => {
      this.labelService.getLabels().subscribe(
        (data) => this.labels = data
      );
    });
  }
  onClickSubmit(titleordescription) {
    this.search.titleordescription = titleordescription;
    console.log(this.search.titleordescription);
    this.noteService.serachNote(this.search).subscribe((data) => this.notes = data
      );

 }
}
