import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { HousingLocation } from '../housing-location';
import { HousingService } from '../housing.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HousingLocationComponent],
  template: `
    <section>
      <form>
        <input type="text" placeholder="Filter by city" #filter />
        <button class="primary" type="button" (click)="filterResults(filter.value)">Search</button>
      </form>
    </section>
    <section class="results">
      @for (item of filteredLocationList; track item.id) {
        <app-housing-location [housingLocation]="item"></app-housing-location>
      }
    </section>
  `,
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  housingLocationList: HousingLocation[] = [];
  housingService: HousingService = inject(HousingService);
  filteredLocationList: HousingLocation[] = [];

  constructor() {
    this.housingService.getHousingLocations().then((locations) => {
      this.housingLocationList = locations;
      this.filteredLocationList = locations;
    }).catch(e => {
      console.log(e);
    });
  }

  filterResults(filter: string) {
    if (!filter) {
      this.filteredLocationList = this.housingLocationList;
    } else {
      this.filteredLocationList = this.housingLocationList.filter((item) =>
        item.city.toLowerCase().includes(filter.toLowerCase())
      );
    }
  }
}
