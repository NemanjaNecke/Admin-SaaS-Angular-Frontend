import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatButtonToggle } from '@angular/material/button-toggle';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Task } from 'src/app/models/task.model';
import { User } from 'src/app/models/user.model';
import { ProfileService } from 'src/app/services/profile.service';
import { TaskService } from 'src/app/services/task.service';
import { TDetailsComponent } from './t-details/t-details.component';
import { TaskCreateComponent } from './task-create/task-create.component';
import { TasksDataSource } from './tasks-datasource';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Task>;
  @ViewChild('group', { static: true }) group!: MatButtonToggle;
  dataSource: TasksDataSource;
  accounts: User[] = []
  selectedFilters: { [key: string]: string | undefined } = {};

  filterStatus?: string;
  filterCurrency?: string;
  filterResponsible?: string;
  filterCreated?: string;

  //'status', 'currency', 'responsible_user', 'created_by'
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = [
    'id','created_by','responsible_user','description','due_date','status','value','currency',
    'priority',
    'notification','notification_date','category', 'company'];
  loading!: boolean;
  next: any;
  previous: any;
  constructor(private task:TaskService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private accs: ProfileService) {
    this.dataSource = new TasksDataSource(task);
  }
  ngOnInit(): void {
    this.dataSource.loadTasks('')
    this.accs.getListAccounts().subscribe((res)=>{
      this.accounts = res;
    })
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
    this.next = this.dataSource.next;
    this.previous = this.dataSource.previous;
  }
  onSortChange(sort: Sort) {
    if(sort.direction=='asc'){
      this.dataSource.loadTasks(sort.active);
      this.dataSource.loading$.subscribe((res)=>{
        this.loading = false;
      })
    }
    else{
      this.dataSource.loadTasks(`-${sort.active}`);
      this.dataSource.loading$.subscribe((res)=>{
        this.loading = false;
      })
    }
  }

  createTask(){
    const dialogRef = this.dialog.open(TaskCreateComponent, {
      data: this.accounts
    });
    
    dialogRef.afterClosed().subscribe(

 
     (result) => {
       if(result){
         this.task.create(result).subscribe({
              next: (res)=>{
           this.dataSource.loadTasks('')
           this.openSnackBar('Task Created', 'X')
         },
           error: (err) => {

         this.openSnackBar(err, 'X')
       }
         })}
       },
   )
  }
  onChange(groupValues: string[]){
    for (const value of groupValues) {
      switch (value) {
        case 'status':
          this.selectedFilters['status'] = this.filterStatus;
          break;
        case 'currency':
          this.selectedFilters['currency'] = this.filterCurrency;
          break;
        case 'responsible_user':
          this.selectedFilters['responsible_user'] = this.filterResponsible;
          break;
        case 'created_by':
          this.selectedFilters['created_by'] = this.filterCreated;
          break;
      }
    }
  }
  filterTask(filters:{}){
    this.selectedFilters = filters;
    this.dataSource.loadFilteredTasks(filters);
  }
  clearFilters(){
    this.filterStatus = ''
    this.filterCurrency = ''
    this.filterResponsible = ''
    this.filterCreated = ''
    this.group.value = ''
    this.selectedFilters = {}
    this.dataSource.loadTasks('')
  }
  openTask(task:any){
    const dialogRef = this.dialog.open(TDetailsComponent, {
      data: task,
    });
    dialogRef.afterClosed().subscribe(
    (result) => {
      // if(result.status_choice !== undefined && 
      //   result.currency !== undefined && result.description !== undefined &&
      //   result.due_date && result.status !== undefined && result.category !== undefined
      //   && result.notification_date !== undefined && result.status !== undefined && 
      //   result.priority !== undefined)
      if(result){
        this.task.updateTask(task.id, result).subscribe({
          next: (res)=>{
          this.dataSource.loadTasks('')
          this.openSnackBar('Task Updated', 'X')
        },
      error: (err) => {
        this.openSnackBar(err, 'X')
      }
        }     
        )
    }
      
    } 
   )
  }
}
