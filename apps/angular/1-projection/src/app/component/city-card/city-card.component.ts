import { Component, OnInit, WritableSignal } from '@angular/core';
import { CityStore } from '../../data-access/city.store';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import { City } from '../../model/city.model';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemRefDirective } from '../../ui/list-item/list-item-ref.directive';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-city-card',
  template: `
    <app-card [list]="cities()" (add)="addCity()">
      <img src="assets/img/city.png" width="200px" />
      <ng-template listItemRef let-item>
        <app-list-item (delete)="deleteCity(item.id)">
          {{ item.name }}
        </app-list-item>
      </ng-template>
    </app-card>
  `,
  standalone: true,
  imports: [CardComponent, ListItemComponent, ListItemRefDirective],
  styles: [
    `
      app-card {
        background-color: rgba(0, 0, 250, 0.1);
      }
    `,
  ],
})
export class CityCardComponent implements OnInit {
  cities: WritableSignal<City[]> = this.store.cities;

  constructor(
    private http: FakeHttpService,
    private store: CityStore,
  ) {}

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((c) => this.store.addAll(c));
  }

  addCity() {
    this.store.addOne(randomCity());
  }

  deleteCity(id: number) {
    this.store.deleteOne(id);
  }
}
