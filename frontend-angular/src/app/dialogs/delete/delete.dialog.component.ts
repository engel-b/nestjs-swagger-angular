import { TaskDto } from './../../../../build/openapi/model/taskDto';
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
              @Inject(MAT_DIALOG_DATA) public data: TaskDto, public taskService: TasksService) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmDelete(): void {
    this.taskService.deleteOneBaseTasksControllerTask(this.data.id).subscribe(
      (data) => {
        console.log(data);
      },
      (error) => {
        console.log(error);
      });
  }
}
