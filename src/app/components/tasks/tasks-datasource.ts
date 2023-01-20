import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { catchError, finalize, map } from 'rxjs/operators';
import { Observable, of as observableOf, merge, BehaviorSubject, of } from 'rxjs';
import { Task } from 'src/app/models/task.model';
import { TaskService } from 'src/app/services/task.service';

/**
 * Data source for the Tasks view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class TasksDataSource extends DataSource<Task> {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private taskSubject = new BehaviorSubject<Task[]>([]);
  public loading$ = this.loadingSubject.asObservable();
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;
  totalLength: any;
  next: any;
  previous: any;

  constructor(private tasks: TaskService) {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(collectionViewer: CollectionViewer): Observable<Task[]> {
    return this.taskSubject.asObservable();
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {
    this.taskSubject.complete();
    this.loadingSubject.complete();
  }

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  loadFilteredTasks(filters: any) {
    this.tasks.filterData(filters).pipe(
      catchError(() => of([])),
      finalize(() => this.loadingSubject.next(false))
  )
  .subscribe(tasks => {
    this.taskSubject.next(tasks.results.data)
    this.totalLength = tasks.count;
    this.next = tasks.next;
    this.previous = tasks.previous;
  }
    );
  }

 
  loadTasks(filter = '') {

    this.tasks.getData(filter).pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
    )
    .subscribe(tasks => {
      this.taskSubject.next(tasks.results.data)
      this.totalLength = tasks.count;
      this.next = tasks.next;
      this.previous = tasks.previous;
    }
      );
}  
}

