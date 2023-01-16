import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { CATEGORY, PRIORITY, STATUS } from 'src/app/models/task.model';

@Component({
  selector: 'app-t-details',
  templateUrl: './t-details.component.html',
  styleUrls: ['./t-details.component.css']
})
export class TDetailsComponent {
  status_choice!: string;
  description!: string;
  due_date!: Date;
  status = STATUS;
  priority = PRIORITY;
  value?: number;
  currency!: number;
  priority_choice!: string;
  notification: boolean= this.task.notification
  notification_date?: Date;
  category_choice!: string;
  category = CATEGORY;
  
constructor(public dialogRef: MatDialogRef<TDetailsComponent>,
  @Inject(MAT_DIALOG_DATA) public task:any,){}
  onCreate(){
    this.dialogRef.close({
      description: this.description, 
      due_date: this.due_date, 
      status_choice: this.status_choice, 
      value: this.value, 
      notification: this.notification,
      notification_date: this.notification_date,
      category: this.category_choice
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  toggleChanges($event: MatSlideToggleChange) {
    this.notification = $event.checked;
  }
}
