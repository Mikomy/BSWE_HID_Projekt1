import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public title: string = 'Kindergarden-App';
  public imagePath: string = "./../assets/images/kindergarden.jpg";

  constructor() { }

  ngOnInit(): void {
  }

  toggleMenu(): void {
    var menu = document.getElementById("menuItems");

    if (menu) {
        menu.style.display = (menu.style.display === "flex" || menu.style.display === "") ? "none" : "flex";
    }
}
}