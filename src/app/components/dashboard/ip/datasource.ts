import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import { MatSort } from "@angular/material/sort";
import { BehaviorSubject, catchError, finalize, Observable, of } from "rxjs";
import { IpAddress } from "src/app/models/user.model";
import { IpaddressService } from "src/app/services/ipaddress.service";

export class IpDataSource implements DataSource<IpAddress> {

    private ipSubject = new BehaviorSubject<IpAddress[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);
    sort!: MatSort;
    public loading$ = this.loadingSubject.asObservable();

    constructor(private ips: IpaddressService) {}

    connect(collectionViewer: CollectionViewer): Observable<IpAddress[]> {
        return this.ipSubject.asObservable();
        
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.ipSubject.complete();
        this.loadingSubject.complete();
    }

    loadLessons(filter = '') {

        this.loadingSubject.next(true);

        this.ips.getData(filter ).pipe(
            catchError(() => of([])),
            finalize(() => this.loadingSubject.next(false))
        )
        .subscribe(data => this.ipSubject.next(data));
    }    
}
  //dodaj sorting u service jer to se radi server side
  