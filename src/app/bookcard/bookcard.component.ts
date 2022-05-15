import { Component, OnInit } from '@angular/core';
import { BookdataService } from '../services/bookdata.service';

@Component({
  selector: 'app-bookcard',
  templateUrl: './bookcard.component.html',
  styleUrls: ['./bookcard.component.scss']
})
export class BookcardComponent implements OnInit {
  booklist$: any

  constructor(private bookCard: BookdataService) { }

  ngOnInit() {
    this.booklist$ = this.bookCard.booklist$
  }

  addToWishList(id: string) {
    this.bookCard.addToWishList(id)
  }

}
