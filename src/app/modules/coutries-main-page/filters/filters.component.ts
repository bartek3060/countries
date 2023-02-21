import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
})
export class FiltersComponent {
  @Output() searched = new EventEmitter<string>();
  @Output() filtered = new EventEmitter<string>()

  constructor(private fb: FormBuilder) {}

  public searchForm = this.fb.group({ searchValue: [''] });
  public filterForm = this.fb.group({ filteredValue: ['Filter by region'] });

  onSearch(): void {
    this.searched.emit(this.searchForm.value.searchValue!);
  }

  onFilter(): void {
    this.filtered.emit(this.filterForm.value.filteredValue!)
  }
}
