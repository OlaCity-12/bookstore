import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BookdataService {
  private baseUrl = 'https://www.googleapis.com/books/v1/volumes?q=';

  private booklist: any = [];
  private blsbj$ = new Subject();
  booklist$ = this.blsbj$.asObservable();

  private wishlist: any = [];
  private wlsbj$ = new Subject();
  wishlist$ = this.wlsbj$.asObservable();

  constructor(private http: HttpClient) {}

  getBooks(searchInput: string) {
    this.http
      .get([this.baseUrl, searchInput].join(''))
      .pipe(
        map((bookdata: any) => {
          const arr = bookdata.items.map((data: any) => {
            return {
              bookname: data.volumeInfo.title,
              id: data.id,
              publisher: data.volumeInfo.publisher,
              publishdate: data.volumeInfo.publishedDate,
              description: data.volumeInfo.description,
              img: data.volumeInfo.imageLinks.smallThumbnail,
            };
          });
          return arr;
        }),
        tap((booklist) => {
          this.booklist = [...booklist];
          this.blsbj$.next(this.booklist);
        })
      )
      .subscribe();
  }

  addToWishList(id: string) {
    const book = this.booklist.find((book: { id: string; }) => book.id === id);
    const bookWishList = this.wishlist.find((book: { id: string; }) => book.id === id);

    if (!book || bookWishList) return;

    this.wishlist = [...this.wishlist, book];
    this.wlsbj$.next(this.wishlist);
  }
}
