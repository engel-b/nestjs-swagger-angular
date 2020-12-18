import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { TasksService } from '../../../../build/openapi';

@Component({
  selector: 'app-delete.dialog',
  templateUrl: './delete.dialog.html',
  styleUrls: ['./delete.dialog.css']
})
export class DeleteDialogComponent {

  constructor(public dialogRef: MatDialogRef<DeleteDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, public taslService: TasksService) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmDelete(): void {
//    this.dataService.deleteIssue(this.data.id);
  }
}
