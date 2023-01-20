import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { LoginService } from 'src/app/services/login.service';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  notificationCount!: number;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  
    links = [
      { title: 'Dashboard', fragment: 'dashboard' },
      { title: 'Companies', fragment: 'companies' },
      { title: 'Invites', fragment: 'invites' },
      { title: 'Tasks', fragment: 'tasks' },
      { title: 'IP address', fragment: 'ip-address'},
    ];
  
  constructor(
    private breakpointObserver: BreakpointObserver,
    private auth: LoginService,
    private taskService: TaskService
    ) {}
  ngOnInit(): void {
    this.taskService.getNotificationCount().subscribe((res)=>{
      this.notificationCount = res.count;
    })
  }
    
  logout(){
    this.auth.logout()
  }
}
