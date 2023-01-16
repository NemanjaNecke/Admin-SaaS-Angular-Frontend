import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  private errors = new Subject<boolean>();

  setError(error: boolean) {
    this.errors.next(error);
  }

  getError() {
    return this.errors.asObservable();
  }
}
