import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BookInfo } from 'src/app/interfaces/book-info';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  wishlist: BookInfo[] = [];
  username: string;

  constructor(private dialog: MatDialog) {
    this.wishlist = JSON.parse(sessionStorage.getItem('wishlist')) ?? [];
    this.username = sessionStorage.getItem('username') ?? '';
    console.log('whishlist',this.wishlist);

  }

  // wishlist add/remove
  handleWishlist(book:BookInfo){
    let bookIndex = this.wishlist.findIndex( wishlistBook => wishlistBook.id == book.id );
    bookIndex == -1 ? this.wishlist.push(book) : this.wishlist.splice(bookIndex,1);
    console.log("wishlist", this.wishlist);
    sessionStorage.setItem('wishlist',JSON.stringify(this.wishlist))
  }

  // check if book is on wishlist
  isOnWishlist(book: BookInfo) {
    return (
      this.wishlist.findIndex(
        (wishlistBook) => wishlistBook.id == book.id
      ) !== -1
    );
  }

  // setting date to dd/mm/yyyy string
  prettyDate(date:Date) {
    let day = date.getDate();
    let month = date.getMonth()+1;
    let year = date.getFullYear()
    return `${( day > 9 ? '' : '0') + date.getDate()}/${( month > 9 ? '' : '0') + month}/${year}`;
  }

}
