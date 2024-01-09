import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  navigateTo(destination: string) {
    
    console.log('Navigate to:', destination);
    
  }
}
