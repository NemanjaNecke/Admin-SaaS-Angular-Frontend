import { DataSource } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { IpaddressService } from 'src/app/services/ipaddress.service';
import { IpAddress } from '../../../models/user.model';
import { IpDataSource } from './datasource';
@Component({
  selector: 'app-ip',
  templateUrl: './ip.component.html',
  styleUrls: ['./ip.component.css']
})
export class IpComponent implements OnInit{
  dataSource!: IpDataSource;
  constructor(private ips: IpaddressService,){}
  ngOnInit(){
    this.dataSource = new IpDataSource(this.ips);
        this.dataSource.loadLessons();
    
  }
}
