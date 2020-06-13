import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Bookmark } from '../models/bookmark';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class BookmarkService {

  serverURL: string = "http://localhost:3000/";

  constructor(private http: HttpClient, private firestore: AngularFirestore) { }

  saveBookmark(bookmark: Bookmark): Observable<Bookmark> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post<Bookmark>(this.serverURL + 'bookmark', bookmark, httpOptions);
  }

  removeBookmark(id: number): Observable<Bookmark> {
    return this.http.delete<Bookmark>(this.serverURL + "bookmark/" + id);
  }

  getBookmark(): Observable<Bookmark> {
    return this.http.get<Bookmark>(this.serverURL + "bookmark");
  }

  getBookmarkID(id: string): Observable<Bookmark> {
    return this.http.get<Bookmark>(this.serverURL + "bookmark/" + id);
  }

  addBookmark(bookmark:Bookmark) {
    return this.firestore.collection('Bookmark').add(bookmark);
  }

  displayBookmark() {
    return this.firestore.collection('Bookmark').snapshotChanges();
  }

  delBookmark(id: string) {
    this.firestore.doc('Bookmark/' + id).delete();
  }

}
