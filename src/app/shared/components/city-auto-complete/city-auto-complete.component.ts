import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { City } from '@core/services/noAuth/no-auth.service';
import { Observable, debounceTime, map, startWith } from 'rxjs';

@Component({
  selector: 'app-city-auto-complete',
  templateUrl: './city-auto-complete.component.html',
  styleUrls: ['./city-auto-complete.component.scss'],
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatSelectModule,
    ReactiveFormsModule,
    CommonModule
  ]
})
export class CityAutoCompleteComponent implements OnChanges {
  @Output() handleSelectCity = new EventEmitter<string>();
  @Input() cities: City[] = [];
  @Input() cityFilter: string = '';
  @Input() title: string = '';
  cityControl = new FormControl('');
  cityOptions!: Observable<City[]>;

  ngOnChanges(changes: SimpleChanges): void {
    this.cityControl.patchValue(this.cityFilter);
    this.filterCities();
  }

  filterCities() {
    this.cityOptions = this.cityControl.valueChanges.pipe(
      debounceTime(300),
      startWith(''),
      map((value) => this._filter(value || ''))
    );
  }

  private _filter(value: string): City[] {
    const filterValue = value.toLowerCase();
    return this.cities.filter((option) =>
      option.city?.toLowerCase().includes(filterValue)
    );
  }

  selectCity(event: MatAutocompleteSelectedEvent) {
    this.handleSelectCity.emit(event.option.value);
  }
}
