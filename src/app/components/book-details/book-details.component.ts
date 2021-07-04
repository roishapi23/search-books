import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BookInfo } from 'src/app/interfaces/book-info';
import { SharedService } from 'src/app/services/shared/shared.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css'],
})
export class BookDetailsComponent implements OnInit {

  book: BookInfo;

  constructor(
    public dialogRef: MatDialogRef<BookDetailsComponent>,
    private sharedService: SharedService,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      book: BookInfo;
    }
  ) {
    this.book = data.book;
  }

  ngOnInit(): void {}

  // wishlist add/remove action
  handleWishlist(book: BookInfo) {
    this.sharedService.handleWishlist(book);
  }

  // check if book is on wishlist
  isOnWishlist(book: BookInfo) {
    return this.sharedService.isOnWishlist(book);
  }
}
