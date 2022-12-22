import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profile!: User;
  loading!:boolean;
  constructor(private prof: ProfileService){

  }

  ngOnInit(): void {
    this.loading = true;
 this.getAccount();
  }

getAccount(){
     
    this.prof.getData().subscribe((res)=>{
      this.profile = res;
      this.loading = false
    })
}
}
