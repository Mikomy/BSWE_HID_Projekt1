import { Injectable } from '@angular/core';
import { Kindergarden } from './interfaces/Kindergarden';
import { Child, ChildResponse } from './interfaces/Child';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  public isLoading$ = this.isLoadingSubject.asObservable();

  constructor() { }

  public kindergardens: Kindergarden[] = [];
  public children: ChildResponse[] = []
  public childrenTotalCount: number = 0;
  public isLoading = false;
  

  public setLoading(value: boolean): void {
    this.isLoadingSubject.next(value);
  }
}
