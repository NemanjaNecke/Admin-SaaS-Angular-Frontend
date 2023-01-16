import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { CATEGORY, CURRENCY, PRIORITY, STATUS } from 'src/app/models/task.model';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.css']
})
export class TaskCreateComponent {

  status_choice!: string;
  description!: string;
  due_date!: Date;
  user_choice!: string;
  status = STATUS;
  priority = PRIORITY;
  value?: number;
  priority_choice!: string;
  notification: boolean= false;
  notification_date?: Date;
  category_choice!: string;
  category = CATEGORY;
  currency = CURRENCY;
  currency_choice!: string;
  
constructor(public dialogRef: MatDialogRef<TaskCreateComponent>,
  @Inject(MAT_DIALOG_DATA) public accounts:User[], ){}
  onCreate(){
    this.dialogRef.close({
      description: this.description, 
      due_date: this.due_date, 
      status_choice: this.status_choice,
      priority: this.priority_choice,
      status: this.status_choice,
      value: this.value,
      currency: this.currency_choice,
      notification: this.notification,
      notification_date: this.notification_date,
      category: this.category_choice,
      responsible_user: this.user_choice
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  toggleChanges($event: MatSlideToggleChange) {
    this.notification = $event.checked;
  }
}
