import { Injectable } from '@angular/core';
import { HousingLocation } from './housing-location';

@Injectable({
  providedIn: 'root'
})
export class HousingService {
  readonly URL = 'http://localhost:3000/locations';

  constructor() { }

 async getHousingLocations(): Promise<HousingLocation[]> {
    return await (await fetch(this.URL)).json() ?? [];
  }

  async getHousingLocationById(id: number): Promise<HousingLocation | undefined> {
    return await (await fetch(`${this.URL}/${id}`)).json() ?? undefined;
  }

  submitApplication(app: any): void {
    console.log(`Application for ${app.firstName} submitted!`)
  }
}
