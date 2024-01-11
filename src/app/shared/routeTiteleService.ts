import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RouteTitleService {
  private pageTitle: string = 'Standard-Titel'; 

  constructor(private router: Router) {}

  public setTitleForRoute(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        const currentRoute = this.router.routerState.snapshot.root;
        const title = this.getTitleForRoute(currentRoute);
      });
  }

  private getTitleForRoute(route: any): string {
    if (route.url === '/dashboard') this.pageTitle = 'DASHBOARD'; 
    if (route.url === '/kindergarten-list') this.pageTitle = 'KINDERGÄRTEN ENTDECKEN'; 
    if (route.url === '/login') this.pageTitle = 'ANMELDUNG'; 
    return this.pageTitle;
  }
}