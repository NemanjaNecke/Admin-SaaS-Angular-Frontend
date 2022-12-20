import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  
    links = [
      { title: 'Dashboard', fragment: 'dashboard' },
      { title: 'Companies', fragment: 'companies' },
      { title: 'Invites', fragment: 'invites' },
      { title: 'IP address', fragment: 'ip-address'},
    ];
  
  constructor(
    private breakpointObserver: BreakpointObserver,
    private auth: LoginService
    ) {}
    
  logout(){
    this.auth.logout()
  }
}
