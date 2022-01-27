import { GetTasksDto } from './../../build/openapi/model/getTasksDto';
import { TasksService } from './../../build/openapi/api/tasks.service';
import { TaskDto } from './../../build/openapi/model/taskDto';
import { DataSource } from "@angular/cdk/table";
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, finalize } from "rxjs/operators";
import { CollectionViewer } from '@angular/cdk/collections';

export class TasksDataSource implements DataSource<TaskDto> {

  tasksSubject = new BehaviorSubject<TaskDto[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public count: number;
  public total: number;
  public page: number;
  public pageCount: number;

  public loading$ = this.loadingSubject.asObservable();

  constructor(private tasksService: TasksService) { }

  connect(collectionViewer: CollectionViewer): Observable<TaskDto[]> {
    return this.tasksSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.tasksSubject.complete();
    this.loadingSubject.complete();
  }

  loadTasks(filter = '', sortColumn = 'id', sortDirection = 'asc', pageIndex = 1, pageSize = 10) {

    this.loadingSubject.next(true);

    this.tasksService.getManyBaseTasksControllerTask(
      undefined, // 1 - fields Selects resource fields. &lt;a href&#x3D;\&quot;https://github.com/nestjsx/crud/wiki/Requests#select\&quot; target&#x3D;\&quot;_blank\&quot;&gt;Docs&lt;/a&gt;
      undefined, // 2 - s Adds search condition. &lt;a href&#x3D;\&quot;https://github.com/nestjsx/crud/wiki/Requests#search\&quot; target&#x3D;\&quot;_blank\&quot;&gt;Docs&lt;/a&gt;
      undefined, // 3 - filter Adds filter condition. &lt;a href&#x3D;\&quot;https://github.com/nestjsx/crud/wiki/Requests#filter\&quot; target&#x3D;\&quot;_blank\&quot;&gt;Docs&lt;/a&gt;
      undefined, // 4 - or Adds OR condition. &lt;a href&#x3D;\&quot;https://github.com/nestjsx/crud/wiki/Requests#or\&quot; target&#x3D;\&quot;_blank\&quot;&gt;Docs&lt;/a&gt;
      [sortColumn && sortDirection ? sortColumn + "," + sortDirection.toUpperCase() : "id,ASC"], // 5 - sort Adds sort by field. &lt;a href&#x3D;\&quot;https://github.com/nestjsx/crud/wiki/Requests#sort\&quot; target&#x3D;\&quot;_blank\&quot;&gt;Docs&lt;/a&gt;
      undefined, // 6 - join Adds relational resources. &lt;a href&#x3D;\&quot;https://github.com/nestjsx/crud/wiki/Requests#join\&quot; target&#x3D;\&quot;_blank\&quot;&gt;Docs&lt;/a&gt;
      pageSize, // 7 - limit Limit amount of resources. &lt;a href&#x3D;\&quot;https://github.com/nestjsx/crud/wiki/Requests#limit\&quot; target&#x3D;\&quot;_blank\&quot;&gt;Docs&lt;/a&gt;
      undefined, // 8 - offset Offset amount of resources. &lt;a href&#x3D;\&quot;https://github.com/nestjsx/crud/wiki/Requests#offset\&quot; target&#x3D;\&quot;_blank\&quot;&gt;Docs&lt;/a&gt;
      pageIndex, // 9 - page Page portion of resources. &lt;a href&#x3D;\&quot;https://github.com/nestjsx/crud/wiki/Requests#page\&quot; target&#x3D;\&quot;_blank\&quot;&gt;Docs&lt;/a&gt;
      undefined, // 10 - cache Reset cache (if was enabled). &lt;a href&#x3D;\&quot;https://github.com/nestjsx/crud/wiki/Requests#cache\&quot; target&#x3D;\&quot;_blank\&quot;&gt;Docs&lt;/a&gt;
      undefined, // 11 - observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
      undefined) // 12 - reportProgress flag to report request and response progress.
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false)))
      .subscribe((getManyTasksDto) => {
        this.count = (<GetTasksDto>getManyTasksDto).count;
        this.total = (<GetTasksDto>getManyTasksDto).total;
        this.page = (<GetTasksDto>getManyTasksDto).page;
        this.pageCount = (<GetTasksDto>getManyTasksDto).pageCount;
        this.tasksSubject.next((<GetTasksDto>getManyTasksDto).data);
      });
    /*
    this.tasksService.findLessons(courseId, filter, sortDirection,
      pageIndex, pageSize).pipe(
      catchError(() => of([])),
      finalize(() => this.loadingSubject.next(false))
  )
  .subscribe(lessons => this.lessonsSubject.next(lessons)); */
  }
}
