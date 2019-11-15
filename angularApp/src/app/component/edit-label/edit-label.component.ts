import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { LabelserviceService } from 'src/app/services/labelservice.service';
import { Label } from 'src/app/model/label.model';
import { LabelDTO } from 'src/app/model/labelDTO.model';

@Component({
  selector: 'app-edit-label',
  templateUrl: './edit-label.component.html',
  styleUrls: ['./edit-label.component.scss']
})
export class EditLabelComponent implements OnInit {
  private labels: Label[];
  private labelName: string;
  private labelobject = new LabelDTO();
  private label: Label;
  constructor(public dialogRef: MatDialogRef<EditLabelComponent>,
              @Inject(MAT_DIALOG_DATA)private  data: Label[],
              private labelService: LabelserviceService,
              private snackBar: MatSnackBar

) {
this.dialogRef.addPanelClass('create-dialog');
console.log(this.data);
this.labels = data;
}
  ngOnInit() {
  }
  onSubmit(label: Label): void {
    this.labelService.updateLabel(label).subscribe((response: any) => {
        this.snackBar.open(response.message, '', {duration: 2000, verticalPosition: 'top'});
    });
    this.dialogRef.close();
  }

  createLabel(labelName: string) {
    this.labelobject.labelName = labelName;
    console.log(this.labelobject);
    this.labelService.createLabel(this.labelobject).subscribe((response: any) => {
      this.snackBar.open(response.message, '', {duration: 2000, verticalPosition: 'top'});
  });
  }
  updateLabel(label: Label) {
    this.label = label;
    console.log(label.labelName + ' just for checking lab');
    this.labelService.updateLabel(label).subscribe((response: any) => {
      this.snackBar.open(response.message, '', {duration: 2000, verticalPosition: 'top'});
  });
  }
  deleteLabel(label: Label, index: any) {
    this.labels.splice(index, 1);
    this.label = label;
    console.log(label.labelName + ' just for checking delete label');
    this.labelService.deleteLabel(label).subscribe((response: any) => {
      this.snackBar.open(response.message, '', {duration: 2000, verticalPosition: 'top'});
  });
  }
}
