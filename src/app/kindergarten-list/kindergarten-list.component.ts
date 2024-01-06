import { Component, OnInit } from '@angular/core';
import { KindergartenService } from '../shared/kindergarten.service';

@Component({
  selector: 'app-kindergarten-list',
  templateUrl: './kindergarten-list.component.html',
  styleUrls: ['./kindergarten-list.component.scss']
})
export class KindergartenListComponent implements OnInit {
  kindergartens: any[] = [];

  constructor(private kindergartenService: KindergartenService) {}

  ngOnInit(): void {
    this.loadKindergartens();
  }

  loadKindergartens() {
    this.kindergartenService.getKindergartens().subscribe((kindergartens) => {
      this.kindergartens = kindergartens;
    });
  }
}