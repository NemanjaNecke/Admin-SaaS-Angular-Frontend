import { DataSource } from '@angular/cdk/collections';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { IpaddressService } from 'src/app/services/ipaddress.service';
import { IpAddress } from '../../../models/user.model';
import { compare } from '../dashboard.component';
import { IpDataSource } from './datasource';
@Component({
  selector: 'app-ip',
  templateUrl: './ip.component.html',
  styleUrls: ['./ip.component.css']
})
export class IpComponent implements OnInit, AfterViewInit{
  @ViewChild(MatSort) sort!: MatSort;
  loading!: boolean;
  dataSource!: IpDataSource;
  constructor(private ips: IpaddressService,){}
  ngAfterViewInit() {
     this.dataSource.sort = this.sort;
  }
  ngOnInit(){
    this.dataSource = new IpDataSource(this.ips);
    this.dataSource.loadLessons('');
    this.dataSource.loading$.subscribe((res)=>{
      this.loading = res;
    })
  }
  onSortChange(sort: Sort) {
    if(sort.direction=='asc'){
      this.dataSource.loadLessons(sort.active);
      this.dataSource.loading$.subscribe((res)=>{
        this.loading = false;
      })
    }
    else{
      this.dataSource.loadLessons(`-${sort.active}`);
      this.dataSource.loading$.subscribe((res)=>{
        this.loading = false;
      })
    }
  }
}
