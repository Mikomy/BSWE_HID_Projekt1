import { Component, OnInit } from '@angular/core';
import { RouteTitleService } from '../shared/routeTiteleService';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public title: string = 'Kindergarden-App';
  public imagePath: string = "./../assets/images/kindergarden.jpg";

  constructor(private routeTitleService: RouteTitleService) { }

  ngOnInit(): void {
    this.routeTitleService.setTitleForRoute();
  }

  toggleMenu(): void {
    var menu = document.getElementById("menuItems");

    if (menu) {
        menu.style.display = (menu.style.display === "flex" || menu.style.display === "") ? "none" : "flex";
    }
}
}