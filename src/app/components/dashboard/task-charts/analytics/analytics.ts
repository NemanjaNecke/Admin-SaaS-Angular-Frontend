import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import { BehaviorSubject, catchError, finalize, Observable, of } from "rxjs";
import { Task } from "src/app/models/task.model";
import { TaskService } from "src/app/services/task.service";

export class Analytics implements DataSource<Task>{

    private loadingSubject = new BehaviorSubject<boolean>(false);
    private taskSubject = new BehaviorSubject<Task[]>([]);
    public loading$ = this.loadingSubject.asObservable();

    connect(collectionViewer: CollectionViewer): Observable<Task[]> {
        return this.taskSubject.asObservable();
    }
    disconnect(collectionViewer: CollectionViewer): void {
        this.taskSubject.complete();
        this.loadingSubject.complete();
    }

    constructor(private tasks: TaskService) {}

    loadTasks(filter = '', filterValue='') {

        this.tasks.getData(filter, filterValue ).pipe(
            catchError(() => of([])),
            finalize(() => this.loadingSubject.next(false))
        )
        .subscribe(tasks => this.taskSubject.next(tasks));
    }  
}
