import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BookInfo } from 'src/app/interfaces/book-info';
import { SharedService } from 'src/app/services/shared/shared.service';
import { BookDetailsComponent } from '../book-details/book-details.component';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

  wishlist: BookInfo[] = [];

  constructor(public sharedService: SharedService, private dialog: MatDialog ) {
    this.wishlist = this.sharedService.wishlist;
  }

  ngOnInit(): void {}

  handleWishlist(book: BookInfo) {
    this.sharedService.handleWishlist(book);
  }

  isOnWishlist(book: BookInfo) {
    return this.sharedService.isOnWishlist(book);
  }

  // setting date to dd/mm/yyyy string
  prettyDate(date: string) {
    if(!date) return 'Unknwon'
    return this.sharedService.prettyDate(new Date(date));
  }

  // open dialog
  openBookDetailsDialog(book: BookInfo) {
    this.dialog.open(BookDetailsComponent, {
      autoFocus: false,
      data: {
        book: book,
      },
    });
  }
}
