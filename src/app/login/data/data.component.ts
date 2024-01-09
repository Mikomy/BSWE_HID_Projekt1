import { Component, EventEmitter, Input, OnInit, Output, ViewChild, AfterViewInit } from '@angular/core';
import { BackendService } from 'src/app/shared/backend.service';
import { CHILDREN_PER_PAGE } from '../../shared/constants';
import { StoreService } from 'src/app/shared/store.service';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Child } from 'src/app/shared/interfaces/Child';



@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss']
})
export class DataComponent implements OnInit, AfterViewInit {
  public loading: boolean = false;

  constructor(
    public storeService: StoreService, 
    private backendService: BackendService,  
    private _liveAnnouncer: LiveAnnouncer
    ) {}

  @Input() currentPage!: number;
  @Output() selectPageEvent = new EventEmitter<number>();
  public page: number = 0;
  public CHILDREN_PER_PAGE: number = CHILDREN_PER_PAGE;
  public isAscending: boolean = true;
  public sortBy: string = '';
 

  dataSource = new MatTableDataSource<Child>([]);
  displayedColumns: string[] = ['nameColumn', 'kindergartenNameColumn', 'kindergartenAddressColumn', 'ageColumn', 'actionsColumn'];
  selectedKindergartenId: string | null = null;

  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  ngOnInit(): void {
    this.loadData();
  }
  loadData() {
    this.backendService.getChildren(this.currentPage).subscribe((data) => {
      this.dataSource.data = data;
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  getAge(birthDate: string) {
    var today = new Date();
    var birthDateTimestamp = new Date(birthDate);
    var age = today.getFullYear() - birthDateTimestamp.getFullYear();
    var m = today.getMonth() - birthDateTimestamp.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDateTimestamp.getDate())) {
        age--;
    }
    return age;
  }



  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  sortData(column: string) {
    this.sortBy = column;
    this.isAscending = !this.isAscending;
    this.backendService.sortChildren(this.currentPage, column, this.isAscending);
  }


  selectPage(pageIndex: number) {
    this.currentPage = pageIndex + 1;
    this.backendService.getChildren(this.currentPage).subscribe((data) => {
      this.dataSource.data = data;
    });
  }

  public returnAllPages() {
    return Math.ceil(this.storeService.childrenTotalCount / CHILDREN_PER_PAGE)
  }

  public cancelRegistration(childId: string) {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 2000);
    this.backendService.deleteChildData(childId, this.currentPage).subscribe(() => {
      this.loadData();
    });
  }

  navigateToPage(pageNumber: number) {
    if (pageNumber >= 0 && pageNumber < this.returnAllPages()) {
      this.selectPage(pageNumber);
    }
  }

  goToFirstPage() {
    this.navigateToPage(0);
  }

  goToLastPage() {
    this.navigateToPage(this.returnAllPages() - 1);
  }

  filterByName(event: any) {
    const filterValue = event.target.value.trim().toLowerCase();
    
    // Filtern nach Namen
    this.backendService.filterChildren(filterValue, this.currentPage).subscribe((data) => {
      this.dataSource.data = data;
    });
  }
  
  filterByKindergarten() {
    // Filtern nach Kindergarten
    if (this.selectedKindergartenId) {
      this.backendService.filterChildrenByKindergarten(this.selectedKindergartenId, this.currentPage).subscribe((data) => {
        this.dataSource.data = data;
      });
    } else {
      // Wenn kein Kindergarten ausgewählt ist, zeige alle Kinder
      this.backendService.getChildren(this.currentPage).subscribe((data) => {
        this.dataSource.data = data;
      });
    }
  }
}

