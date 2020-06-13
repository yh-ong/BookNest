import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private url = 'https://www.googleapis.com/books/v1/volumes?q=angular';
  private baseURL = 'https://www.googleapis.com/books/v1/volumes/';
  private searchURL = 'https://www.googleapis.com/books/v1/volumes?q=';
  private authorURL = 'https://www.googleapis.com/books/v1/volumes?q=inauthor:';
  private publisherURL = 'https://www.googleapis.com/books/v1/volumes?q=inpublisher:';
  private isbnURL = 'https://www.googleapis.com/books/v1/volumes?q=isbn:'
  private titleURL = 'https://www.googleapis.com/books/v1/volumes?q=intitle:'
  
  constructor(private http: HttpClient) { }

  public getBook(): Observable<any> {
    return this.http.get(this.url);
  }

  getBookID(id: string): Observable<any> {
    return this.http.get(this.baseURL + id);
  }

  getBookTitle(title: string) {
    return this.http.get(this.titleURL + title);
  }

  getBookAuthor(author: string) {
    return this.http.get(this.authorURL + author);
  }

  getBookPublisher(publisher: string) {
    return this.http.get(this.publisherURL + publisher);
  }

  getBookISBN(isbn: string) {
    return this.http.get(this.isbnURL + isbn);
  }

  getBookSearch(author:string, title: string, isbn: string) {
    if (author != null) {
      return this.http.get(this.authorURL + author);
    } else if (title != null) {
      return this.http.get(this.titleURL + title);
    } else if (isbn != null) {
      return this.http.get(this.isbnURL + isbn);
    } else {
      return this.http.get(this.searchURL + 'inauthor:' + author + '+intitle:' + title + '+isbn:' + isbn);
    }
  }
}
