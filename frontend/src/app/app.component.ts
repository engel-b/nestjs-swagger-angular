import { TasksDataSource } from './task.datasource';
import { TaskDto } from './../../build/openapi/model/taskDto';
import { TasksService } from './../../build/openapi/api/tasks.service';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AddDialogComponent } from './dialogs/add/add.dialog.component';
import { EditDialogComponent } from './dialogs/edit/edit.dialog.component';
import { DeleteDialogComponent } from './dialogs/delete/delete.dialog.component';
import { merge, fromEvent } from "rxjs";
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, AfterViewInit {
  displayedColumns = ['id', 'title', 'description', 'status', 'actions'];
  dataSource: TasksDataSource; // GetTasksDto; // = <GetTasksDto>{};
  task: TaskDto;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;

  constructor(public dialog: MatDialog,
    public taskService: TasksService) {
  }

  ngOnInit(): void {
    //  this.task = this.route.snapshot.data["course"];
    this.dataSource = new TasksDataSource(this.taskService);
    this.dataSource.loadTasks();
  }

  ngAfterViewInit() {

    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    fromEvent(this.filter.nativeElement, 'keyup')
      .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
          this.loadTasksPage();
        })
      )
      .subscribe();

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => this.loadTasksPage())
      )
      .subscribe();
  }

  loadTasksPage() {
    this.dataSource.loadTasks(
      this.filter.nativeElement.value,
      this.sort.active,
      this.sort.direction,
      this.paginator.pageIndex + 1,
      this.paginator.pageSize);
  }

  refresh(): void {
    this.loadTasksPage();
  }

  add() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = { data:  {} };

    const dialogRef = this.dialog.open(AddDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      val => this.refresh()
    );
  }

  edit(task: TaskDto) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = task;

    const dialogRef = this.dialog.open(EditDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      val => this.refresh()
    );
  }

  remove(task: TaskDto) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = task;

    const dialogRef = this.dialog.open(DeleteDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      val => this.refresh()
    );
  }

  onRowClick(row: any): void {
    console.log(row);
  }
}
