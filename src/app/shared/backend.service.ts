import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Kindergarden } from './interfaces/Kindergarden';
import { StoreService } from './store.service';
import { Child, ChildResponse } from './interfaces/Child';
import { CHILDREN_PER_PAGE } from './constants';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'; 


@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private http: HttpClient, private storeService: StoreService) { }

  public getKindergardens() {
    this.http.get<Kindergarden[]>('http://localhost:5000/kindergardens').subscribe(data => {
      this.storeService.kindergardens = data;
    });
  }

  public getChildren(page: number, sortBy?: string, sortOrder?: string): Observable<Child[]> {
    this.storeService.isLoading = true; 
    const sortParams = sortBy && sortOrder ? `&_sort=${sortBy}&_order=${sortOrder}` : '';
    return this.http.get<ChildResponse[]>(`http://localhost:5000/childs?_expand=kindergarden&_page=${page}&_limit=${CHILDREN_PER_PAGE}${sortParams}`, { observe: 'response' })
      .pipe(
        map(data => {
          this.storeService.children = data.body!;
          this.storeService.childrenTotalCount = Number(data.headers.get('X-Total-Count'));
          this.storeService.isLoading = false;
          return data.body!; // Return the array of Child
        })
      );
  }

  public addChildData(child: Child, page: number): Observable<any> {
    this.storeService.isLoading = true; // Set loading to true before adding child
    return this.http.post('http://localhost:5000/childs', child).pipe(
      map(_ => {
        this.getChildren(page).subscribe(() => {
          this.storeService.isLoading = false; // Set loading to false after adding child
        });
      })
    );
  }


  

  public deleteChildData(childId: string, page: number): Observable<void> {
    this.storeService.isLoading = true; // Set loading to true before deleting child
    return this.http.delete(`http://localhost:5000/childs/${childId}`, { observe: 'response' })
      .pipe(
        map(response => {
          this.storeService.isLoading = false; // Set loading to false after deleting child
        })
      );
  }

    public sortChildren(page: number, column: string, isAscending: boolean) {
      const url = 'http://localhost:5000/childs';
      
      const params = new HttpParams()
        .set('_expand', 'kindergarden')
        .set('_page', page.toString())
        .set('_limit', CHILDREN_PER_PAGE.toString())
        .set('_sort', column)
        .set('_order', isAscending ? 'asc' : 'desc');
  
    
      this.http.get<ChildResponse[]>(url, { params, observe: 'response' }).subscribe(data => {
        this.storeService.children = data.body!;
        this.storeService.childrenTotalCount = Number(data.headers.get('X-Total-Count'));
      });
    }
    public filterChildren(filterValue: string, page: number): Observable<Child[]> {
      const params = new HttpParams()
        .set('_expand', 'kindergarden')
        .set('_page', page.toString())
        .set('_limit', CHILDREN_PER_PAGE.toString())
        .set('q', filterValue); // Add a query parameter for filtering
    
      return this.http.get<ChildResponse[]>('http://localhost:5000/childs', { params, observe: 'response' })
        .pipe(
          map(data => {
            this.storeService.children = data.body!;
            this.storeService.childrenTotalCount = Number(data.headers.get('X-Total-Count'));
            return data.body!; // Return the array of Child
          })
        );
    }
    public filterChildrenByKindergarten(kindergartenId: string, page: number): Observable<Child[]> {
      const params = new HttpParams()
        .set('_expand', 'kindergarden')
        .set('_page', page.toString())
        .set('_limit', CHILDREN_PER_PAGE.toString())
        .set('kindergardenId', kindergartenId);
    
      return this.http.get<ChildResponse[]>('http://localhost:5000/childs', { params, observe: 'response' })
        .pipe(
          map(data => {
            this.storeService.children = data.body!;
            this.storeService.childrenTotalCount = Number(data.headers.get('X-Total-Count'));
            return data.body!; // Return the array of Child
          })
        );
    }
  }