import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { BookInfo } from 'src/app/interfaces/book-info';
import { ApiService } from 'src/app/services/api/api.service';
import { SharedService } from 'src/app/services/shared/shared.service';
import { BookDetailsComponent } from '../book-details/book-details.component';

@Component({
  selector: 'app-search-books',
  templateUrl: './search-books.component.html',
  styleUrls: ['./search-books.component.css'],
})
export class SearchBooksComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: MatTableDataSource<BookInfo> = new MatTableDataSource<BookInfo>(
    []
  );

  books: Observable<BookInfo[]>;

  searchInput = new FormControl();

  isDataExist: boolean;

  displayedMessage: string = 'Please type book name';

  constructor(
    private api: ApiService,
    private spinner: NgxSpinnerService,
    public sharedService: SharedService,
    private changeDetectorRef: ChangeDetectorRef,
    private dialog: MatDialog
  ) {
    // load last search - for better user experience if if user switching routes in the app
    let lastSearch = sessionStorage.getItem('lastSearch');
    if (lastSearch) {
      this.searchBooks(lastSearch);
      this.searchInput.setValue(lastSearch);
    }
  }

  ngOnInit(): void {
    // on user search - get books matching results
    this.searchInput.valueChanges
      .pipe(
        debounceTime(500) /* small delay to minimize api calls */,
        distinctUntilChanged() /* dont execute if value didn't change from the last search */
      )
      .subscribe((text) => {
        this.searchBooks(text); /* api call */
        sessionStorage.setItem('lastSearch', text); /* saving last search for better user experience */
      });
    // connect data to pagination
    this.changeDetectorRef.detectChanges();
    this.dataSource.paginator = this.paginator;
    this.books = this.dataSource.connect();
  }

  // api search
  searchBooks(searchText: string) {
    // validation
    if (searchText == '') {
      // init data & ui
      this.dataSource.data = [];
      this.isDataExist = false;
      this.displayedMessage = 'Please type book name';
      return;
    }
    this.spinner.show();
    // get data
    this.api.getBooksByName(searchText).subscribe((books) => {
      console.log(books);
      this.isDataExist = books.length > 0; /* check if we got any data */
      this.displayedMessage = this.isDataExist
        ? ''
        : `We are so sorry, \n We didn't found any results to - "${this.searchInput.value}"`;
      this.dataSource.data = books; /* update ui */
      this.spinner.hide();
    }, error => {
      console.log(error);
      this.displayedMessage = 'Please check your internet connection';
      this.spinner.hide();
    });
  }

  // setting date to dd/mm/yyyy string
  prettyDate(date: string) {
    if (!date) return 'Unknown'
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
