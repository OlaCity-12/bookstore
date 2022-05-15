import { Component, OnInit } from '@angular/core';
import { BookdataService } from '../services/bookdata.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss'],
})
export class WishlistComponent implements OnInit {
  wishlist: any = [];

  constructor(private wishlistdata: BookdataService) {}

  ngOnInit() {
    this.wishlistdata.wishlist$.subscribe((wishlist: any) => {
      this.wishlist = [...wishlist];
    });
  }
}
