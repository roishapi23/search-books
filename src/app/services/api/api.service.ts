import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BooksResponse } from 'src/app/interfaces/books-response';
import { BookInfo } from 'src/app/interfaces/book-info';

@Injectable({
  providedIn: 'root'
})


export class ApiService {

  wishlist: BookInfo[] = [];

  constructor(private http: HttpClient) { }

  // get request from google books api
  getBooksByName(search: string) : Observable<BookInfo[]>{
    return this.http.get<BooksResponse>(`https://www.googleapis.com/books/v1/volumes?q=${search}&maxResults=20`).pipe(
      map(
        (books) => {
          if (books.items) {
            return books.items.map(singleBook => {
              singleBook.volumeInfo['id'] = singleBook.id; /* insert id to book object */
              return singleBook.volumeInfo; /* get main info object */
            })
          }
          else{
            return [];
          }
        }
      )
    );
  }

}
