import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { fromEvent } from 'rxjs';
import { filter, debounceTime, tap } from 'rxjs/operators';
import { BookdataService } from './services/bookdata.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'bookStore';

  @ViewChild('searchBox', { static: true }) searchBox!: ElementRef;

  constructor(private bookdataservice: BookdataService) {}

  ngOnInit(): void {
    fromEvent(this.searchBox.nativeElement, 'keyup')
      .pipe(
        debounceTime(200),
        filter((_) => {
          const searchInput = this.searchBox.nativeElement.value;
          return searchInput.trim();
        }),
        tap((_) => {
          const searchInput = this.searchBox.nativeElement.value.trim();
          this.bookdataservice.getBooks(searchInput);
        })
      )
      .subscribe();
  }
}
