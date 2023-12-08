import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BackendService } from 'src/app/shared/backend.service';
import { StoreService } from 'src/app/shared/store.service';

@Component({
  selector: 'app-add-data',
  templateUrl: './add-data.component.html',
  styleUrls: ['./add-data.component.scss']
})
export class AddDataComponent implements OnInit {
  public successMessage: string = '';

  constructor(private formbuilder: FormBuilder, public storeService: StoreService, public backendService: BackendService) {}

  openModel(message: string) {
   const modelDiv = document.getElementById('myModal');
   if(modelDiv!=null) {
    modelDiv.style.display = 'block';
    document.getElementById('modalMessage')!.innerText = message;
   }
  
  }
closeModel() {
  const modelDiv = document.getElementById('myModal');
   if(modelDiv!=null) {
    modelDiv.style.display = 'none';
   }
}

  public addChildForm: any;
  @Input() currentPage!: number;
  

  ngOnInit(): void {
    this.addChildForm = this.formbuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      kindergardenId: ['', Validators.required],
      birthDate: [null, [Validators.required, this.futureDateValidator]]
    })
  }
  futureDateValidator(control: any) {
    const selectedDate = new Date(control.value);
    const currentDate = new Date();

    return selectedDate > currentDate ? { futureDate: true } : null;
  }

  onSubmit() {
    if (this.addChildForm.valid) {
      const birthDate = this.addChildForm.get('birthDate')!.value;
      if (this.futureDateValidator({ value: birthDate }) !== null) {
        // Wenn das Datum in der Zukunft liegt, eine Benachrichtigung ausgeben
        this.openModel('Geburtsdatum liegt in der Zukunft!');
      } else {
        // Andernfalls, Daten hinzufügen und Erfolgsnachricht ausgeben
        this.backendService.addChildData(this.addChildForm.value, this.currentPage);
        this.openModel('Kind ist angemeldet!');
        this.addChildForm.reset();
        setTimeout(() => {
          this.successMessage = '';
        }, 5000);
    }
  }
  }
}
